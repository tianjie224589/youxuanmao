// pages/my/shop/cheack.js
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:'',

    viewWidth: 0,
    viewHeight: 0,

    orderInfo:{},
  },

  onSubmit(){
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var num = that.data.num;
    console.log('核销码',num)

    wx.request({
      url: config.setHexiaoma_url,
      data:{"source":"wx","token":loginUserinfo.token,"num":num},
      method: "post",
      success: function (res) {
        console.log('res',res)
        if(res.data.status == 200){
          //wx.navigateBack()

          //带参数返回上一页
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[ pages.length - 2 ];
          //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            checktype : 1,
          })

          wx.navigateBack({ changed: true });//返回上一页
        }else{
          Toast.fail(res.data.msg);
        }
      }
    });
    
  },

  onGoback(){
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var num = options.num;
    console.log('num',num);
    this.setData({
      num: num
    });

    var viewWidth=wx.getSystemInfoSync().windowWidth;           //设置图片显示宽度为当前屏幕宽度，
    console.log('viewHeight',viewWidth);
    that.setData({
      viewWidth:viewWidth,
      viewHeight:viewWidth/(750/850)
    })

    //根据核销码 查询订单信息
    wx.request({
      url: config.getOrderInfo_url,
      data:{"source":"wx","token":loginUserinfo.token,"num":num},
      method: "post",
      success: function (res) {
        console.log('查询订单信息res',res.data)
        if(res.data.status == 200){
          console.log(res)
          wx.stopPullDownRefresh();
          that.setData({
            orderInfo: res.data.result,
          });
          wx.hideLoading();
        }else{
          Toast.fail(res.data.msg);
        }
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