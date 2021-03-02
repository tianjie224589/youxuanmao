// pages/pay/index.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    money:0,
    getOrderInfo: {},
    getUserInfo: {},
  },

  onPayto(){
    wx.navigateTo({
      url: '../index/success?money='+ this.data.getOrderInfo.money
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('loginUserinfo',loginUserinfo)

    var id = options.id;
    var money = options.money;
    console.log('id',id);
    this.setData({
      id: id,
      money: money
    });

    //获取详情
    wx.request({
      url: config.getOrderInfo_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":id,"num":0},
      method: "post",
      success: function (res) {
        console.log(res)
        wx.stopPullDownRefresh();
        that.setData({
          getOrderInfo: res.data.result,
        });
        wx.hideLoading();
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