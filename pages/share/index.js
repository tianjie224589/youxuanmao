// pages/share/index.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    getGoodsList: {},
    page: 1,
    num: 20,
    fybanner: '',
    show: {
      primary: true,
      success: true,
    },
    images:{}
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch(event) {
    console.log('键盘搜索', event.detail)
    var that = this;
    if(that.value != ''){
      wx.request({
        url: config.getGoodsList_url,
        data:{"source":"wx","notype":"1","searchname":event.detail,"page":that.data.page,"num":that.data.num},
        method: "post",
        success: function (res) {
          wx.stopPullDownRefresh();
          that.setData({
            getGoodsList: res.data.result,
          })
          wx.hideLoading();
        }
      });
    }
  },
  onCancel(event) {
    console.log('取消')
    var that = this;
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","notype":"1","page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsList: res.data.result,
        })
        wx.hideLoading();
      }
    });
  },

  imageLoad: function(e) {
    var $width=e.detail.width,    //获取图片真实宽度
        $height=e.detail.height,
        ratio=$width/$height;    //图片的真实宽高比例
    var viewWidth=wx.getSystemInfoSync().windowWidth,           //设置图片显示宽度为当前屏幕宽度，
        viewHeight=viewWidth/ratio;    //计算的高度值
        
    var image=this.data.images; 
     //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image={
        width:viewWidth,
        height:viewHeight
     }
    this.setData({
        images:image
    })
  },

  onClose(event) {
    this.setData({
      [`show.${event.target.id}`]: false,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    //获取banner
    wx.request({
      url: config.getAdvert_url,
      data:{"source":"wx","pid":"5"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          fybanner: res.data.result[0].imgUrl,
        })
        wx.hideLoading();
      }
    });

    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","notype":"1","page":that.data.page,"num":that.data.num},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsList: res.data.result,
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