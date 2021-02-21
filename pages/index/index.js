// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    searchvalue:'',
    background: [
      '../../images/banner.jpg',
      '../../images/banner1.jpg',
      '../../images/banner2.jpg'
    ],

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onSearch(){
    console.log('搜索')
    wx.navigateTo({
      url: 'search'
    })
  },
  onGetInfo(e){
    console.log('产品详情',e.currentTarget.dataset.val)
    wx.navigateTo({
      url: '../product/info?id='+e.currentTarget.dataset.val
    })
  },

  onLoad() {
    if (app.globalData.userInfo) {console.log('1')
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {console.log('2')
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {console.log('3')
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
    console.log('授权',e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
