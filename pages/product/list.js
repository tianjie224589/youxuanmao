// pages/product/list.js
import Toast from '../../dist/toast/toast';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUserInfo: {},
    getGoodsList: [],
    page: 1,
    num: 10,
  },

  onGetInfo(e){
    console.log('产品详情',e.currentTarget.dataset.val)
    wx.navigateTo({
      url: '../product/info?id='+e.currentTarget.dataset.val
    })
  },

  getGoodsList(){
    var that = this;
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        console.log('res',res)
        
        if(res.data.status==200){
          wx.stopPullDownRefresh();
          that.setData({
            getGoodsList: that.data.getGoodsList.concat(res.data.result),
          })
          wx.hideLoading();
        }else{
          Toast.fail(res.data.msg);
        }
        
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

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

    this.getGoodsList();

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
    this.onLoad();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;

    that.setData({
      page: that.data.page + 1,
    })

    this.getGoodsList();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})