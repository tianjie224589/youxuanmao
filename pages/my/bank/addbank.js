// pages/my/bank/addbank.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    name: '',
    card: '',
    bank_name: '',
    bank_num: '',
    checked: true,
  },

  submit(){
    console.log('保存')
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var name = that.data.name;
    var card = that.data.card;
    var bank_name = that.data.bank_name;
    var bank_num = that.data.bank_num;
    var def = 2;
    if(that.data.checked){
      def = 1;
    }

    if(that.data.id==0){
      wx.request({
        url: config.setBankAdd_url,
        data:{"source":"wx","token":loginUserinfo.token,"name":name,"card":card,"bank_name":bank_name,"bank_num":bank_num,"default":def},
        method: "post",
        success: function (res) {
          console.log(res)
          wx.navigateBack()
        }
      });
    }
    
  },

  onChange({ detail }) {
    console.log('默认',detail)
    // 需要手动对 checked 状态进行更新
    this.setData({ checked: detail });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)
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