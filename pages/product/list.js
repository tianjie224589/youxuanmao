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

    type_goods:'',
  },

  onGetInfo(e){
    console.log('产品详情',e.currentTarget.dataset.val)
    wx.navigateTo({
      url: '../product/info?id='+e.currentTarget.dataset.val
    })
  },

  getGoodsList(){
    var that = this;
    var data = {"source":"wx","page":that.data.page,"num":that.data.num};

    if(that.data.type_goods == 'preferential'){
      data = {"source":"wx","preferential":"1","page":that.data.page,"num":that.data.num};
    }
    if(that.data.type_goods == 'referral'){
      data = {"source":"wx","referral":"1","page":that.data.page,"num":that.data.num};
    }
    if(that.data.type_goods == 'hot'){
      data = {"source":"wx","hot":"1","page":that.data.page,"num":that.data.num,'orderby':'d'};
    }
    if(that.data.type_goods == 'effect'){
      data = {"source":"wx","effect":"1","page":that.data.page,"num":that.data.num};
    }
    if(that.data.type_goods == 'superior'){
      data = {"source":"wx","superior":"1","page":that.data.page,"num":that.data.num};
    }

    wx.request({
      url: config.getGoodsList_url,
      data: data,
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

    if(options.type){
      console.log('指定类型(type)商品',options.type);
      that.setData({
        type_goods: options.type
      });
    }

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