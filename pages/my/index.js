const app = getApp()
var config = (wx.getStorageSync('config'));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shenfen:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var config = (wx.getStorageSync('config'));
    var that = this;
    console.log(config);

    var identity = wx.getStorageSync('identity');
    console.log('身份 identity',identity)
    if(identity!=""){
      this.setData({
        shenfen: identity
      })
    }

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('登录信息 loginUserinfo',loginUserinfo)
    if(loginUserinfo.avatarUrl!=""){
      this.setData({
        userInfo: loginUserinfo,
        hasUserInfo: true
      })
    }

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

  },

  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })

    //把头像昵称保存到数据库表
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    wx.request({
      url: config.setUserEdit_url,
      data:{"source":"wx","token":loginUserinfo.token,"nickname":e.detail.userInfo.nickName,"imageUrl":e.detail.userInfo.avatarUrl},
      method:"POST",
      success:function(rs){
        console.log('头像昵称保存-成功返回',rs);
      },
    })

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