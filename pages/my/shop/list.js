// pages/my/shop/list.js
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
  },

  onSubmit(){
    var that = this;

    var value = that.data.value;
    console.log('核销码',value)

    if(value==''){
      Toast.fail('请输入核销码或扫码');
    }else{
      //跳转页面-订单核销详情页
      wx.navigateTo({
        url: 'cheack?num='+ that.data.value
      })
    }
    
  },

  getScancode: function() {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var result = res.result;
        console.log('result',result)
        
        //跳转页面-订单核销详情页
        wx.navigateTo({
          url: 'cheack?num='+ that.data.value
        })

      }
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