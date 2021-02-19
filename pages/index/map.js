// pages/index/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    indexList: ['北京', '上海', '天津', '重庆'],
  },

  onSearch(event) {
    console.log('搜索',event.detail)
    
  },

  onCancel(event) {
    console.log('取消')
    
  },

  jump:function(event){
    console.log('快捷',event)
    var valname = event.currentTarget.dataset.val
    console.log(valname)
    wx.setStorageSync('location', valname);
    wx.navigateBack({ changed: true });//返回上一页
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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