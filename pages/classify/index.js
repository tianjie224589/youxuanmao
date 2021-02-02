const app = getApp()
Page({
  data: {
    currentTab: '',
  },
  clickTab: function (e) {
    let that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.id,
      id: e.currentTarget.dataset.id
    })
  },
  onLoad: function (options) {
    var that = this
    if (options.share_id) {
      wx.setStorageSync('share_id', options.share_id);
      this.setData({
        share_id: options.share_id
      });
    } else {
      this.setData({
        share_id: wx.getStorageSync('share_id')
      });
    }
    wx.showLoading({ title: "加载中", mask: true });
    wx.request({
      url: 'https://qingyuan.6art.cn/goods/lists',
      method: "post",
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        console.log(res)
        that.setData({
          share:res.data.share,
          title: res.data.categories,
          currentTab:res.data.categories[0].tid
        })
      }
    })
    wx.request({
      url: 'https://qingyuan.6art.cn/index/category',
      method: "post",
      header: {
        'Content-Type': 'application/json',
      },
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          index_data: res.data.data
        })
        wx.hideLoading();
      }
    })
  },
  onShow:function(){
   
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let userInfo = wx.getStorageSync('userInfo');
    return {
      title: this.data.share.desc,
      imageUrl: this.data.share.shareImg,
      path: '/pages/sort/sort?share_id=' + userInfo.uid,
    }
  }
})