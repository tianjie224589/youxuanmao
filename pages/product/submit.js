// pages/product/submit.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    num:1,
    money:0,
    false:false,
    getGoodsInfo: {},
  },

  onSubmit(e){
    console.log('提交订单',e);
    var id = this.data.id;
    var money = this.data.money;
    var num = this.data.num;

    wx.navigateTo({
      url: '../index/success'
    });
  },

  onChange(event) {
    console.log(this.data.getGoodsInfo.price,event.detail);
    var price = this.data.getGoodsInfo.price;
    this.setData({
      num: event.detail,
      money: price * event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var id = options.id;
    console.log('id',id);
    this.setData({
      id: id
    });
    
    //获取详情
    wx.request({
      url: config.getGoodsInfo_url,
      data:{"source":"wx","id":id},
      method: "post",
      success: function (res) {
        console.log(res)
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsInfo: res.data.result,
          money: res.data.result.price,
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