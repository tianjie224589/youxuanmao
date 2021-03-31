// pages/my/yuyue/yuyue.js
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    getUserInfo: {},
    getOrderInfo: {},

    yy_name: '',
    yy_mobile: '',
    yy_time: '',
    yy_type: 1,
    checked: true,

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
    this.setData({ picktime: timeValue,yy_time: timeValue, show: false });
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

  onChange({ detail }) {
    console.log('默认',detail)
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },

  submit(){
    console.log('保存')
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var yy_name = that.data.yy_name;
    var yy_mobile = that.data.yy_mobile;
    var yy_time = that.data.yy_time;
    var yy_type = 2;
    if(that.data.checked){
      yy_type = 1;
    }

    wx.request({
      url: config.setYuyue_url,
      data:{"source":"wx","token":loginUserinfo.token,'id':that.data.id,"yy_name":yy_name,"yy_mobile":yy_mobile,"yy_time":yy_time,"yy_type":yy_type},
      method: "post",
      success: function (res) {
        console.log('预约返回：',res)
        if(res.data.status==200){
          //带参数返回上一页
          let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
          let prevPage = pages[ pages.length - 2 ];
          //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
          prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
            yystatus: 1,
          })
          wx.navigateBack({ changed: true });//返回上一页
        }else{
          Toast.fail(res.data.msg);
        }
      }
    });
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('info页面 options',options);
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('info页面 token',loginUserinfo.token)

    //获取订单id
    var id = options.id;
    console.log('预约页面 id',id);
    that.setData({
      id: id
    });

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

    //获取订单信息
    wx.request({
      url: config.getOrderInfo_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":id},
      method: "post",
      success: function (res) {
        console.log('获取订单信息',res.data)
        wx.stopPullDownRefresh();
        that.setData({
          getOrderInfo: res.data.result,
          yy_name: res.data.result.yy_name,
          yy_mobile:  res.data.result.yy_mobile,
          yy_time:  res.data.result.yy_time,
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