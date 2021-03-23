const app = getApp()
var config = (wx.getStorageSync('config'));
var QRCode = require('../../utils/weapp-qrcode.js')

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
    show: false,
  },

  getScancode: function() {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        var result = res.result;
        console.log('二维码内容：result',result)
        
        var paramArr = result.split('ewm/');
        //跳转页面-订单核销详情页
        if (paramArr.length == 2){
          console.log('绑定销售id',paramArr[1]);
  
          wx.navigateTo({
            url: 'info/index?id='+ paramArr[1]
          })
        }

      }
    })
  },

  onBalance(){
    console.log('余额');
    wx.navigateTo({
      url: 'balance/list'
    })
  },

  onCoupon(){
    console.log('优惠券');
    wx.navigateTo({
      url: 'coupon/list'
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
    this.setData({ show: true });
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
    console.log('授权获取手机号',e)
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var that = this;
    if (e.detail.errMsg == "getPhoneNumber:ok") {
      wx.request({
        url: config.getUserInfoWx_url,
        data: {
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: loginUserinfo.session_key,
          token: loginUserinfo.token,
          "source":"wx",
        },
        method: "post",
        success: function (rest) {
          console.log('授权获取手机号-rest',rest);
          
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId
              console.log('重新登录-获取code',res.code);
              if(res.code){
                wx.request({
                  url: config.getCode_url,
                  data:{"source":"wx","code":res.code},
                  method:"POST",
                  success:function(e){
                    console.log('登录-成功返回',e);
                    wx.setStorageSync('userinfo', e.data.result);
      
                    //刷新
                    that.onPullDownRefresh();

                  },
                })
              }
            }
          })

        }
      })
    }

  },

  onIdentity(){
    //选择身份
    wx.navigateTo({
      url: '/pages/identity/index'
    })
  },

  onshanglist(){
    //测试跳转分享
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    wx.navigateTo({
      url: '/pages/share/listshare?uid=' + loginUserinfo.id
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.stopPullDownRefresh() //刷新完成后停止下拉刷新动效

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
    var that = this;
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

        //刷新
        that.onPullDownRefresh();
      },
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   * 小程序扫普通链接二维码打开小程序
   * 配置：二维码规则 https://api.yiyoucha.com/ewm/
   * 配置：小程序路径 pages/my/info/index
   * 配置：测试范围   开发版
   * 配置：测试链接   https://api.yiyoucha.com/ewm/1
   * 配置：全网发布   已发布
   */
  onReady: function () {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    console.log('2222',loginUserinfo.id)
    //传入wxml中二维码canvas的canvas-id  样式单位为px
    //扫码二维码跳转到 /pages/my/info/index
    var qrcode = new QRCode('canvas', {
      // usingIn: this,
      text: "https://api.yiyoucha.com/ewm/"+loginUserinfo.id,
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('页面返回-渲染');
    var that = this;
    console.log(that.data);

    if(that.data.istype=='identity-my'){
      that.onPullDownRefresh();
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
    console.log('下拉')
    var that = this
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('下拉 loginUserinfo',loginUserinfo)

    if(loginUserinfo){
      that.onLoad(); //重新加载onLoad()
    }else{
      app.onLaunch()
      wx.switchTab({
        url: '../index/index'
      })
    }
    

    

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