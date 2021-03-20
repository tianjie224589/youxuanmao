// pages/yiyuan/list.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: {},
    page: 1,
    num: 20,
    show: false,

    bigimg:'',
    infoshop:{},
  },

  onClickShow(event) {
    console.log('图片放大')
    console.log(event.currentTarget.id)

    var that = this;
    var id = event.currentTarget.id;

    wx.request({
      url: config.getShopInfo_url,
      data:{"source":"wx","id":id},
      method: "post",
      success: function (res) {
        console.log('医美(医院)信息',res.data)
        wx.stopPullDownRefresh();
        that.setData({
          show: true,
          infoshop: res.data.result,
        })
        wx.hideLoading();
      }
    });
    
  },

  onClickHide() {
    console.log('取消放大')
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    
    wx.request({
      url: config.getShopList_url,
      data:{"source":"wx","page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          shopList: res.data.result,
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