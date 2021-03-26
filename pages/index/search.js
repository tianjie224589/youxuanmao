// pages/index/search.js
import Toast from '../../dist/toast/toast';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    option1: [
      { text: '全部商品', value: 0 },
      { text: '医美商品', value: 1 },
      { text: '生美商品', value: 2 },
      { text: '普通商品', value: 3 },
    ],
    option2: [
      { text: '默认排序', value: 'a' },
      { text: '价格由低到高', value: 'b' },
      { text: '价格由高到低', value: 'c' },
      { text: '销量排序', value: 'd' },
      { text: '最新排序', value: 'e' },
    ],
    value1: 0,
    value2: 'a',

    getGoodsList: [],
    page: 1,
    num: 10,
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },

  onSearch(event) {
    console.log('键盘搜索', event.detail)
    var that = this;
    if(that.data.value != ''){
      that.getSeachGoods();
    }
  },

  onCancel(event) {
    console.log('取消')
    
  },

  onClick() {
    console.log('按钮搜索', this.data.value);
    var that = this;
    if(that.data.value != ''){
      that.getSeachGoods();
    }
  },
  getSeachGoods(){
    var that = this;
    var searchname = that.data.value;
    var page = that.data.page;
    var num = that.data.num;
    var type = that.data.value1;
    var orderby = that.data.value2;
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","searchname":searchname,"page":page,"num":num,'type':type,'orderby':orderby},
      method: "post",
      success: function (res) {
        console.log('res',res)
        
        if(res.data.status==200){
          wx.stopPullDownRefresh();
          that.setData({
            getGoodsList: that.data.getGoodsList.concat(res.data.result),
          })
          wx.hideLoading();
        }else{
          Toast.fail(res.data.msg);
        }
        
      }
    });
  },
  onChangeSelect(event) {
    console.log('商品分类 value1',event.detail)
    var that = this;
    that.setData({
      value1: event.detail,
      getGoodsList: []
    });
    if(that.data.value != ''){
      that.getSeachGoods();
    }
  },
  onChangeOrderby(event) {
    console.log('排序 value2',event.detail)
    var that = this;
    that.setData({
      value2: event.detail,
      getGoodsList: []
    });
    if(that.data.value != ''){
      that.getSeachGoods();
    }
  },

  onGetInfo(e){
    console.log('产品详情',e.currentTarget.dataset.val)
    wx.navigateTo({
      url: '../product/info?id='+e.currentTarget.dataset.val
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var that = this;

    that.setData({
      page: that.data.page + 1,
    })

    this.getSeachGoods();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})