// pages/identity/index.js
var config = (wx.getStorageSync('config'));
var replace = require('../../utils/replace.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    infoArticle:{},
    nodes:'',

    showpopup: false,
  },

  showPopup() {
    this.setData({ showpopup: true });
  },
  onClosePopup() {
    this.setData({ showpopup: false });
  },

  //获取用户协议
  getShopRegInfo(){
    var that = this
    wx.request({
      url: config.getArticleInfo_url,
      data:{"source":"wx","id":13},
      method: "post",
      success: function (res) {
        console.log('用户协议 返回：',res)
        if(res.data.status == 200){
          that.setData({
            infoArticle: res.data.result,
            nodes: replace.convertHtmlToText(res.data.result.content)
          });
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

    that.getShopRegInfo();
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

  },

  myIdentity:function(event){
    console.log(event)
    var identity = event.currentTarget.dataset.hi;

    console.log(identity)
    wx.setStorageSync('identity', identity);

    //带参数返回上一页
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
    let prevPage = pages[ pages.length - 2 ];
    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        istype : 'identity-my',
    })

    wx.navigateBack({ changed: true });//返回上一页
  },

})