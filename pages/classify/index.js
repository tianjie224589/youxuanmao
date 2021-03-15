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
      url: config.getNavGoodsList_url,
      data:{"source":"wx","cid":that.data.id},
      method: "post",
      success: function (res) {
        that.setData({
          goodslist:res.data.result,
        })
      }
    })
  },

  onLoad: function (options) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('info页面 token',loginUserinfo)

    //获取用户信息
    wx.request({
      url: config.getUserInfo_url,
      data:{"source":"wx","token":loginUserinfo.token},
      method: "post",
      success: function (res) {
        console.log('getUserInfo-res',res)
        wx.stopPullDownRefresh();
        that.setData({
          getUserInfo: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //获取分类栏目
    wx.request({
      url: config.getClassify_url,
      data:{"source":"wx","notype":loginUserinfo.identity},
      method: "post",
      success: function (res) {
        console.log('res',res);
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
      url: config.getNavGoodsList_url,
      data:{"source":"wx","cid":32},
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
  
  
})