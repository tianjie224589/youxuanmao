const app = getApp();
var config = (wx.getStorageSync('config'));

Page({
  data: {
    id:0,
    currentTab: '',
    classify:{},
    images:{},

    page:1,
    num:10,
  },
  imageLoad: function(e) {console.log(e)
    var $width=e.detail.width,    //获取图片真实宽度
        $height=e.detail.height,
        ratio=$width/$height;    //图片的真实宽高比例
    var viewWidth=718,           //设置图片显示宽度，左右留有16rpx边距
        viewHeight=718/ratio;    //计算的高度值
     var image=this.data.images; 
     //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
     image[e.target.dataset.index]={
        width:viewWidth,
        height:viewHeight/2-94
     }
     this.setData({
          images:image
     })
  },
  clickTab: function (e) {
    let that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.id,
      id: e.currentTarget.dataset.id
    })

    console.log('nav-id',that.data.id)
    console.log('page',that.data.page)
    console.log('num',that.data.num)
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","cid":that.data.id,"page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        that.setData({
          goodslist:res.data.result,
        })
      }
    })
  },

  onLoad: function (options) {
    var that = this
    
    if (options.share_id) {
      wx.setStorageSync('share_id', options.share_id);
      this.setData({
        share_id: options.share_id
      });
    } else {
      this.setData({
        share_id: wx.getStorageSync('share_id')
      });
    }
    wx.showLoading({ title: "加载中", mask: true });

    //获取分类栏目
    wx.request({
      url: config.getClassify_url,
      data:{"source":"wx"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          classify: res.data.result,
          currentTab:res.data.result[0].id
        })
        wx.hideLoading();
      }
    })

     //获取产品
     wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","cid":32,"page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        that.setData({
          goodslist:res.data.result,
        })
      }
    })

  },
  onShow:function(){
   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userInfo = wx.getStorageSync('userInfo');
    return {
      title: this.data.share.desc,
      imageUrl: this.data.share.shareImg,
      path: '/pages/sort/sort?share_id=' + userInfo.uid,
    }
  }
})