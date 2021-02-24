// pages/my/orders/list.js
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:'',
    payment: 'all',
    order_type: 'all',
    order_state: 'all',
    list: {},
    page: 1,
    num: 20,
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch() {
    console.log('搜索' + this.data.value)
    Toast('搜索' + this.data.value);
  },
  onCancel() {
    Toast('取消');
  },

  onClick(event) {
    var that = this

    console.log('点击标签',event.detail.index)
    var type = event.detail.index
    var payment = that.data.payment
    var order_state = that.data.order_state
    
    if(type==1){
      payment = '2'
      order_state = 'all'
    }
    if(type==2){
      payment = '2'
      order_state = '3'
    }
    if(type==3){
      payment = '2'
      order_state = '5'
    }

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    wx.request({
      url: config.getOrderList_url,
      data:{"source":"wx","token":loginUserinfo.token,"payment":payment,"order_state":order_state,"page":that.data.page,"num":that.data.num},
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

    var payment = that.data.payment
    var order_state = that.data.order_state
    wx.request({
      url: config.getOrderList_url,
      data:{"source":"wx","token":loginUserinfo.token,"payment":payment,"order_state":order_state,"page":that.data.page,"num":that.data.num},
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