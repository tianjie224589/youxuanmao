// app.js
var config = require("./config.js");
App({
  onLaunch() {
    console.log('初始化 app.onLaunch 异步')
    // 展示本地存储能力
    wx.setStorageSync('config', config);

    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录-获取code',res.code);
        if(res.code){
          wx.request({
            url: config.getCode_url,
            data:{"source":"wx","code":res.code},
            method:"POST",
            success:function(e){
              console.log('登录-成功返回',e);
              wx.setStorageSync('userinfo', e.data.result);

              //选择身份
              wx.navigateTo({
                url: '/pages/identity/index'
              })

            },
          })
        }
      }
    });

    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log('获取用户信息',res);
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})
