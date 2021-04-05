// pages/my/address/add.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    name: '',
    phone: '',
    collect: '',
    checked: true,
  },

  submit(){
    console.log('保存')
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var name = that.data.name;
    var phone = that.data.phone;
    var collect = that.data.collect;
    var def = 2;
    if(that.data.checked){
      def = 1;
    }

    if(that.data.id==0){
      wx.request({
        url: config.setCollectEdit_url,
        data:{"source":"wx","token":loginUserinfo.token,"name":name,"phone":phone,"collect":collect,"default":def},
        method: "post",
        success: function (res) {
          console.log(res)
          wx.navigateBack()
        }
      });
    }else{
      wx.request({
        url: config.setCollectEdit_url,
        data:{"source":"wx","token":loginUserinfo.token,"name":name,"phone":phone,"collect":collect,"default":def,"id":that.data.id},
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

    var id = options.id;
    console.log('id',id);
    this.setData({
      id: id
    });

    if(id){
      console.log('编辑')
      //获取详情
      wx.request({
        url: config.getCollectInfo_url,
        data:{"source":"wx","token":loginUserinfo.token,"id":id},
        method: "post",
        success: function (res) {
          console.log(res)
          var checked = true;
          if(res.data.result.default==2){
            checked = false;
          }
          wx.stopPullDownRefresh();
          that.setData({
            name: res.data.result.name,
            phone: res.data.result.phone,
            collect: res.data.result.collect,
            checked: checked,
          });
          wx.hideLoading();
        }
      });

    }

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