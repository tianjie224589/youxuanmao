// pages/share/listshare.js
import Toast from '../../dist/toast/toast';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    uid:0,
    share_id:0,
    getShareList: {},
    fybanner: '',

    couponList: {},
    show: false,

  },

  toGoodsInfo(e){
    console.log('产品详情',e)
    wx.navigateTo({
      url: '../product/info?id='+e.currentTarget.id +'&shareid='+ e.currentTarget.dataset.val
    })
  },

  imageLoad: function(e) {
    var $width=e.detail.width,    //获取图片真实宽度
        $height=e.detail.height,
        ratio=$width/$height;    //图片的真实宽高比例
    var viewWidth=wx.getSystemInfoSync().windowWidth,           //设置图片显示宽度为当前屏幕宽度，
        viewHeight=viewWidth/ratio;    //计算的高度值
        
    var image=this.data.images; 
     //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image={
        width:viewWidth,
        height:viewHeight
     }
    this.setData({
        images:image
    })
  },

  showPopup(){
    console.log('领取新人礼包')

    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('loginUserinfo:',loginUserinfo)

    //领取新人礼包
    wx.request({
      url: config.setCouponAdd_url,
      data:{"source":"wx","token":loginUserinfo.token},
      method: "post",
      success: function (res) {
        console.log('领取新人礼包 返回-res',res)
        if(res.data.status == 200){
          that.setData({
            show: true
          })
        }else{
          Toast.fail(res.data.msg);
        }
      }
    });
  },
  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    //获取分享会员uid
    if(options.uid){
      var uid = options.uid;
      var share_id = options.sid;
      console.log('分享会员uid',uid);
      console.log('分享share_id',share_id);

      //绑定分享裂变id
      wx.request({
        url: config.getBindInitial_url,
        data:{"source":"wx","token":loginUserinfo.token,'initial':uid},
        method: "post",
        success: function (res) {
          console.log('绑定返回-res',res)
        }
      });

      this.setData({
        uid: uid
      });
    }
    

    //获取已选择分享商品列表
    wx.request({
      url: config.getShareList_url,
      data:{"source":"wx","token":loginUserinfo.token,'uid':uid,'share_id':share_id},
      method: "post",
      success: function (res) {
        console.log('获取分享列表',res.data)
        wx.stopPullDownRefresh();
        that.setData({
          getShareList: res.data.result.list,
        })
        wx.hideLoading();
      }
    });

    //获取banner
    wx.request({
      url: config.getAdvert_url,
      data:{"source":"wx","pid":"6"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          fybanner: res.data.result[0].imgUrl,
        })
        wx.hideLoading();
      }
    });

    //获取礼包列表
    wx.request({
      url: config.getCouponList_url,
      data:{"source":"wx","token":loginUserinfo.token},
      method: "post",
      success: function (res) {
        console.log('获取礼包列表 返回-res',res)
        that.setData({
          couponList: res.data.result.list,
        })
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    console.log('下拉')
    var that = this

    //获取已选择分享商品列表
    wx.request({
      url: config.getShareList_url,
      data:{"source":"wx","token":loginUserinfo.token,'uid':that.data.uid},
      method: "post",
      success: function (res) {
        console.log('获取分享列表',res.data)
        wx.stopPullDownRefresh();
        that.setData({
          getShareList: res.data.result.list,
        })
        wx.hideLoading();
      }
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})