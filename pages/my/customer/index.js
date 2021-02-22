// pages/my/customer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,

    currentDate: new Date().getTime(),
    minDate: new Date().getTime(),
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },

    picktime:'',

  },

  showPopup() {
    console.log('筛选')
    this.setData({ show: true });
  },
  onClose() {
    this.setData({ show: false });
  },

  onInput(event) {
    console.log('确定',event)
    var timeValue = this.timeFormat(new Date(event.detail), "yyyy-MM-dd hh:mm");
    console.log('确定',timeValue)
    this.setData({ picktime: timeValue, show: false });
  },
  timeFormat(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1,                 //月份   
      "d+": date.getDate(),                    //日
      "h+": date.getHours(),                   //小时   
      "m+": date.getMinutes(),                 //分   
      "s+": date.getSeconds(),                 //秒   
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度   
      "S": date.getMilliseconds()             //毫秒   
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})