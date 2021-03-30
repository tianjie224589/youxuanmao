// pages/my/balance/list.js
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pay_type: 'all',
    getUserInfo: {},
    list: {},
    page: 1,
    num: 20,
  },

  cashout(){
    console.log('提现')
    if(this.data.getUserInfo.bankid==0){
      Toast.fail('请设置默认银行卡');
    }else{
      wx.navigateTo({
        url: 'cashout'
      })
    }
  },

  onClick(event) {
    var that = this

    console.log('点击标签',event.detail.index)
    var type = event.detail.index
    var pay_type = 'all'
    if(type==1){
      pay_type = '2'
    }
    if(type==2){
      pay_type = '1'
    }
    that.setData({
      pay_type: pay_type,
    })

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    wx.request({
      url: config.getWaterList_url,
      data:{"source":"wx","token":loginUserinfo.token,"pay_type":pay_type,"page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
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

    //获取流水列表
    wx.request({
      url: config.getWaterList_url,
      data:{"source":"wx","token":loginUserinfo.token,"pay_type":that.data.pay_type,"page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
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
    var that = this

    //获取用户信息
    that.onLoad()
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
    console.log('下拉')
    var that = this

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

    //获取流水列表
    wx.request({
      url: config.getWaterList_url,
      data:{"source":"wx","token":loginUserinfo.token,"pay_type":that.data.pay_type,"page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          list: res.data.result,
        })
        wx.hideLoading();
      }
    });
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('上拉')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})