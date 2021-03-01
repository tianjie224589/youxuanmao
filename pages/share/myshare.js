// pages/share/myshare.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getShareList: {},
    selectNum:0,
    getUserInfo: {},
  },

  onClose(event) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    const { position, instance } = event.detail;
    console.log(event)
    
    var id = event.currentTarget.id;
    console.log(id)

    //删除分享
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    wx.request({
      url: config.setShareDel_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":id},
      method: "post",
      success: function (res) {
        
        wx.request({
          url: config.getShareList_url,
          data:{"source":"wx","token":loginUserinfo.token},
          method: "post",
          success: function (res) {
            console.log('获取分享列表',res.data)
            wx.stopPullDownRefresh();
            that.setData({
              getShareList: res.data.result.list,
              selectNum: res.data.result.count,
            })
            wx.hideLoading();
          }
        });

      }
    })

    instance.close();
  },

  onShareAppMessage: function () {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    let url = encodeURIComponent('/pages/share/listshare?uid=' + that.data.getUserInfo.id);
 
    return {
      title: that.data.getShareList[0].name,
      path:"/pages/index/index?url="+url,
      imageUrl: that.data.getShareList[0].thumb_img,
      success: (res) => {
        console.log("转发成功", res);
        console.log("成功了")
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
 
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('userinfo',loginUserinfo)

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

    //获取已选择分享商品列表
    wx.request({
      url: config.getShareList_url,
      data:{"source":"wx","token":loginUserinfo.token},
      method: "post",
      success: function (res) {
        console.log('获取分享列表',res.data)
        wx.stopPullDownRefresh();
        that.setData({
          getShareList: res.data.result.list,
          selectNum: res.data.result.count,
        })
        wx.hideLoading();
      }
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