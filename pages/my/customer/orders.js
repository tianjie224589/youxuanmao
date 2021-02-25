// pages/my/customer/orders.js
var config = (wx.getStorageSync('config'));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    page: 1,
    num: 20,
  },

  onClick(event) {
    var that = this

    var type = event.detail.index
    type = type + 1;
    console.log('点击标签',type)

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    wx.request({
      url: config.getOrderList_url,
      data:{"source":"wx","token":loginUserinfo.token,"cheack_status":type,"page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        console.log('onClick-res',res)
        wx.stopPullDownRefresh();
        that.setData({
          list: res.data.result,
        })
        wx.hideLoading();
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    wx.request({
      url: config.getOrderList_url,
      data:{"source":"wx","token":loginUserinfo.token,"cheack_status":1,"page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        console.log('onLoad-res',res)
        wx.stopPullDownRefresh();
        that.setData({
          list: res.data.result,
        })
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