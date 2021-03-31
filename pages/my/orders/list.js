// pages/my/orders/list.js
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));
var QRCode = require('../../../utils/weapp-qrcode.js')

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

    show: false,
    cheack_no:0,
  },

  onToOrderInfo(e){
    console.log('查看详细订单',e)

    wx.navigateTo({
      url: 'info?id='+ e.currentTarget.id
    })
  },

  yuyue(e){
    console.log('预约',e)
    wx.navigateTo({
      url: '../yuyue/yuyue?id='+ e.currentTarget.id
    })
  },

  confirm(e){
    var that = this
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    console.log('确认收货',e)

    wx.request({
      url: config.setConfirm_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":e.currentTarget.id},
      method: "post",
      success: function (res) {
        console.log('确认收货-res',res.data)
        if(res.data.status==200){
          that.onPullDownRefresh();   //刷新
        }else{
          Toast.fail(res.data.msg);
        }
      }
    });
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

    
    var type = event.detail.index
    var payment = that.data.payment
    var order_state = that.data.order_state
    
    if(type==1){
      payment = '1'
      order_state = '1'
    }
    if(type==2){
      payment = '2'
      order_state = '3'
    }
    if(type==3){
      payment = '2'
      order_state = '5'
    }
    console.log('点击标签-type',type)
    console.log('点击标签-payment',payment)
    console.log('点击标签-order_state',order_state)

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

  onClickShow(event) {
    console.log('邀请注册',event)
    this.setData({ 
      show: true,
      cheack_no: event.currentTarget.id
    });

    //传入wxml中二维码canvas的canvas-id
    //单位为px
    var qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: event.currentTarget.id,
      width: 150,
      height: 150,
      padding: 12,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H,
      callback: (res) => {
          // 生成二维码的临时文件
          console.log(res.path)
      }
    });
  },
  onClickHide() {
    var that = this
    console.log('取消放大')
    
    that.setData({ 
      show: false,
      order_type: 'all',
      order_state: 'all',
    });
    that.onPullDownRefresh();   //刷新
  },


  onSubmit(e){
    console.log('立即支付')
    wx.navigateTo({
      url: '../../pay/index?id=' + e.currentTarget.id
    })
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
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    if(that.data.yystatus == 1){
      console.log('预约成功返回 刷新')
      that.onPullDownRefresh()
    }

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
    this.onLoad(); //重新加载onLoad()
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