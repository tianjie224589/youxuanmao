// pages/index/search.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    option1: [
      { text: '全部商品', value: 0 },
      { text: '医美商品', value: 1 },
      { text: '生美商品', value: 2 },
      { text: '普通商品', value: 2 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '价格由低到高', value: 'b' },
      { text: '价格由高到低', value: 'c' },
      { text: '销量排序', value: 'd' },
      { text: '最新排序', value: 'e' },
    ],
    value1: 0,
    value2: 'a',
    getGoodsList: {},
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },

  onSearch(event) {
    console.log('键盘搜索', event.detail)
    var that = this;
    if(this.data.value != ''){
      wx.request({
        url: config.getGoodsList_url,
        data:{"source":"wx","searchname":event.detail,"page":"1","num":"5"},
        method: "post",
        success: function (res) {
          wx.stopPullDownRefresh();
          that.setData({
            getGoodsList: res.data.result,
          })
          wx.hideLoading();
        }
      });
    }
  },

  onCancel(event) {
    console.log('取消')
    
  },

  onClick() {
    console.log('按钮搜索', this.data.value);
    var that = this;
    if(this.data.value != ''){
      wx.request({
        url: config.getGoodsList_url,
        data:{"source":"wx","searchname":this.data.value,"page":"1","num":"5"},
        method: "post",
        success: function (res) {
          wx.stopPullDownRefresh();
          that.setData({
            getGoodsList: res.data.result,
          })
          wx.hideLoading();
        }
      });
    }
  },

  onTabChange(event) {
    console.log(event.detail.name)
  },

  onGetInfo(e){
    console.log('产品详情',e.currentTarget.dataset.val)
    wx.navigateTo({
      url: '../product/info?id='+e.currentTarget.dataset.val
    })
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