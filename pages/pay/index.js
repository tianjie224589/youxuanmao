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

  //拉取支付
  onPayto(){
    console.log('拉取支付')
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    /*
    console.log('拉取支付-假支付')
    wx.request({
      url: config.setPay_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":that.data.id},
      method: "post",
      success: function (res) {
        console.log('支付返回',res)
        wx.navigateTo({
          url: '../index/success?money='+ that.data.getOrderInfo.money +'&id='+ that.data.id
        })
      }
    });
    */
    
    console.log('拉取支付-统一下单')
    wx.request({
      url: config.setOrderPay_url,
      data:{"source":"wx","token":loginUserinfo.token,"orderid":that.data.id},
      method: "post",
      success: function (res) {
        console.log('统一下单 - 返回',res)
        if(res.data.status==200){
          console.log(res.data.result.data)
          var obj = JSON.parse(res.data.result.data)
          
            console.log('调用微信支付控件')
            wx.requestPayment({
              'timeStamp':obj.timeStamp,
              'nonceStr': obj.nonceStr,
              'package': obj.package,
              'signType': 'MD5',
              'paySign': obj.paySign,
              'success':function(res){
                console.log(res);
                wx.navigateTo({
                  url: '../index/success?money='+ that.data.getOrderInfo.money +'&id='+ that.data.id
                })
              },
              'fail':function(res){
                console.log('fail:'+JSON.stringify(res));
              }
            })
            
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