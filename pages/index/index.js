// index.js
// 获取应用实例
const app = getApp()
var config = (wx.getStorageSync('config'));

Page({
  data: {
    location:'重庆',
    searchvalue:'',
    background: {},
    notice:'',
    qualityList: {},
    shopList: {},           //医院返佣榜单
    shopDxList: {},         //店销榜单
    getGoodsHotList: {},    //热销榜单
    getGoodsThList: {},     //特惠
    getGoodsZzList: {},     //转诊
    getGoodsXgList: {},     //效果
    getGoodsHhList: {},     //好货
    getUserInfo: {},

    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),

    orderPopup: false,
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
  onTofl(){
    wx.switchTab({
      url: '../classify/index'
    })
  },
  onGetInfo(e){
    console.log('产品详情',e.currentTarget.dataset.val)
    wx.navigateTo({
      url: '../product/info?id='+e.currentTarget.dataset.val
    })
  },

  onClickHide() {
    console.log('取消订单弹窗')
    wx.removeStorageSync('oid')
    this.setData({ orderPopup: false });
  },
  onToOrderList(){
    console.log('查看订单')
    var oid = wx.getStorageSync('oid');

    wx.removeStorageSync('oid')
    this.setData({ orderPopup: false });

    wx.navigateTo({
      url: '../my/orders/list'
    })
  },

  onLoad(options) {
    var that = this;
    console.log('首页 options',options)

    if (app.globalData.userInfo) {console.log('1')
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {console.log('2')
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log('2-res',res.userInfo)
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

    //店销榜单
    wx.request({
      url: config.getShopList_url,
      data:{"source":"wx","shop_sales":"1","page":"1","num":"3"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          shopDxList: res.data.result,
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

    //特惠 商品
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","preferential":"1","page":"1","num":"3"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsThList: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //转诊 商品
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","referral":"1","page":"1","num":"3"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsZzList: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //效果 商品
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","effect":"1","page":"1","num":"3"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsXgList: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //好货 商品
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","superior":"1","page":"1","num":"3"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsHhList: res.data.result,
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

    that.getServerUser()

  },
  getUserInfo(e) {
    console.log('授权',e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  getServerUser(){
    //获取服务器端用户信息
    console.log('获取服务器端用户信息')
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('获取服务器端用户信息 loginUserinfo:',loginUserinfo)

    if(loginUserinfo){
      wx.request({
        url: config.getUserInfo_url,
        data:{"source":"wx","token":loginUserinfo.token},
        method: "post",
        success: function (res) {
          console.log('服务器端用户信息-res',res)
          wx.stopPullDownRefresh();
          that.setData({
            getUserInfo: res.data.result,
          })
          wx.hideLoading();
        }
      });
    }else{
      console.log('获取服务器端用户信息 loginUserinfo 不存在！')
      app.onLaunch()
      this.getServerUser()
    }
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('页面返回-渲染');
    var that = this;
    console.log(that.data);

    //选择城市返回
    var location = wx.getStorageSync('location');
    console.log('城市 location',location)
    if(location!=""){
      that.setData({
        location: location
      })
    }

    //订单支付成功后返回
    var oid = wx.getStorageSync('oid');
    if(oid!=""){
      console.log('订单支持成功 id',oid);
      this.setData({
        orderPopup: true,
      });
    }

  },

})
