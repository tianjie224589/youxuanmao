// pages/my/balance/cashout.js
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUserInfo: {},
    value: '',
    show: false,
  },

  cashout(){
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var value = that.data.value;
    console.log('提现',value)

    if(that.data.getUserInfo.bankid==0){
      Toast.fail('请添加默认银行卡');
      return false;
    }

    wx.request({
      url: config.getCashOut_url,
      data:{"source":"wx","token":loginUserinfo.token,"apply_money":value,"bankid":that.data.getUserInfo.bankid},
      method: "post",
      success: function (res) {
        console.log('res',res)
        if(res.data.status != 200){
          Toast.fail(res.data.msg);
        }else{
          wx.navigateBack()
        }
      }
    });
  },

  showPopup() {
    console.log('提现规则')
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    //获取用户信息
    wx.request({
      url: config.getUserInfo_url,
      data:{"source":"wx","token":loginUserinfo.token},
      method: "post",
      success: function (res) {
        console.log('userinfo-res',res)
        wx.stopPullDownRefresh();
        that.setData({
          getUserInfo: res.data.result,
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