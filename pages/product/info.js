// pages/product/info.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    viewHeight:0,
    nodes:'',
    getGoodsInfo: {},
    phone: '1234567'
  },

  onSubmit(e){
    console.log('自购')
    wx.navigateTo({
      url: 'submit?id='+this.data.id
    })
  },

  onTel(){
    console.log('打电话')
    wx.makePhoneCall({
      phoneNumber: this.data.phone
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var viewWidth=wx.getSystemInfoSync().windowWidth;           //设置图片显示宽度为当前屏幕宽度，
    console.log('viewHeight',viewWidth);
    this.setData({
      viewHeight:viewWidth
    })

    var id = options.id;
    console.log('id',id);
    this.setData({
      id: id
    });

    //获取详情
    wx.request({
      url: config.getGoodsInfo_url,
      data:{"source":"wx","id":id},
      method: "post",
      success: function (res) {
        console.log(res)
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsInfo: res.data.result,
        });
        that.setData({
          nodes: res.data.result.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto"')
        });
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