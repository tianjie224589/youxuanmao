const app = getApp()
var config = (wx.getStorageSync('config'));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    getUserInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    shenfen:'',
  },

  onBalance(){
    console.log('余额');
    wx.navigateTo({
      url: 'balance/list'
    })
  },

  orderList(){
    console.log('订单列表');
    wx.navigateTo({
      url: 'orders/list'
    })
  },

  onClickShow(event) {
    console.log('邀请注册')
    console.log(event.currentTarget.dataset.src)
    var img = event.currentTarget.dataset.src;
    this.setData({ show: true });
    this.setData({ bigimg: img });
  },
  onClickHide() {
    console.log('取消放大')
    this.setData({ show: false });
  },

  customer(){
    console.log('客户管理')
    wx.navigateTo({
      url: 'customer/index'
    })
  },

  customerOrder(){
    console.log('客户订单')
    wx.navigateTo({
      url: 'customer/orders'
    })
  },

  shopList(){
    console.log('商家核销')
    wx.navigateTo({
      url: 'shop/list'
    })
  },

  hospitalList(){
    console.log('医院核销')
    wx.navigateTo({
      url: 'yiyuan/list'
    })
  },

  onBank(){
    console.log('银行卡')
    wx.navigateTo({
      url: 'bank/list'
    })
  },

  onAddress(){
    console.log('收货地址')
    wx.navigateTo({
      url: 'address/list'
    })
  },

  onActivity(){
    console.log('活动中心')
    wx.navigateTo({
      url: 'activity/list'
    })
  },

  getPhoneNumber (e) {
    console.log(e.detail.errMsg)
    console.log(e.detail.iv)
    console.log(e.detail.encryptedData)

    console.log(e.detail.encryptedData)
    console.log(e.detail.encryptedData)

    var that = this;
    console.log(e.detail.errMsg == "getPhoneNumber:ok");
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: config.getUserInfoWx_url,
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: that.data.userInfo.session_key,
          token: that.data.userInfo.token,
          "source":"wx",
        },
        method: "post",
        success: function (res) {
          console.log(res);
        }
      })
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('userinfo',loginUserinfo)
    console.log('token',loginUserinfo.token)

    //身份
    var identity = wx.getStorageSync('identity');
    console.log('身份 identity',identity)
    if(identity!=""){
      that.setData({
        shenfen: identity
      })
    }

    //保存登录信息
    if(loginUserinfo.avatarUrl!=""){
      that.setData({
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

  getUserInfo(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });

    //把头像昵称保存到数据库表
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    wx.request({
      url: config.setUserEdit_url,
      data:{"source":"wx","token":loginUserinfo.token,"nickname":e.detail.userInfo.nickName,"imageUrl":e.detail.userInfo.avatarUrl},
      method:"POST",
      success:function(rs){
        console.log('头像昵称保存-成功返回',rs);
      },
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
    console.log('下拉')
    var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    //身份
    var identity = wx.getStorageSync('identity');
    console.log('身份 identity',identity)
    if(identity!=""){
      that.setData({
        shenfen: identity
      })
    }

    if(loginUserinfo.avatarUrl!=""){
      that.setData({
        userInfo: loginUserinfo,
        hasUserInfo: true
      })
    }

    //保存登录信息
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