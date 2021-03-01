// index.js
// 获取应用实例
const app = getApp()
var config = (wx.getStorageSync('config'));

Page({
  data: {
    searchvalue:'',
    background: {},
    notice:'',
    qualityList: {},
    shopList: {},
    getGoodsHotList: {},

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

  onLoad(options) {
    var that = this;

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

    //获取banner
    wx.request({
      url: config.getAdvert_url,
      data:{"source":"wx","pid":"4"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          background: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //获取系统配置
    wx.request({
      url: config.getConfig_url,
      data:{"source":"wx","pid":"4"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          notice: res.data.result.notice,
        })
        wx.hideLoading();
      }
    });

    //为你优选 商品 精选
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","quality":"1","page":"1","num":"3"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          qualityList: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //医院返佣榜单
    wx.request({
      url: config.getShopList_url,
      data:{"source":"wx","hot":"1","page":"1","num":"3"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          shopList: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //热销榜单 商品 推荐
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","hot":"1","page":"1","num":"3"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsHotList: res.data.result,
        })
        wx.hideLoading();
      }
    });



    //要想分享后的页面打开先进入首页再跳转到分享的页面
    if(options.url){
      let url = decodeURIComponent(options.url);
      console.log('外部点击分享',url);
      wx.navigateTo({
        url
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
