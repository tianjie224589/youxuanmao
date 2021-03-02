// pages/product/submit.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    num:1,
    money:0,
    false:false,
    getGoodsInfo: {},
    getUserInfo: {},
    getCollectInfo: {},
  },

  onSubmit(e){
    console.log('提交订单',e);
    var that = this;
    var id = that.data.id;
    var money = that.data.money;
    var num = that.data.num;

    var loginUserinfo = (wx.getStorageSync('userinfo'));

    console.log(id);
    console.log(money);
    console.log(num);

    //创建订单
    wx.request({
      url: config.setOrderAdd_url,
      data:{"source":"wx","token":loginUserinfo.token,"gid":id,"num":num},
      method: "post",
      success: function (res) {
        console.log(res)
        console.log('立即支付')
        wx.navigateTo({
          url: '../pay/index?id=' + res.data.result
        })
      }
    });

  },

  onChange(event) {
    console.log(this.data.getGoodsInfo.price,event.detail);
    var price = this.data.getGoodsInfo.price;
    this.setData({
      num: event.detail,
      money: price * event.detail,
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('loginUserinfo',loginUserinfo)

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
          money: res.data.result.price,
        });
        wx.hideLoading();
      }
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

        //获取默认收货地址
        wx.request({
          url: config.getCollectInfo_url,
          data:{"source":"wx","token":loginUserinfo.token,'id':res.data.result.collectid},
          method: "post",
          success: function (resObj) {
            console.log('CollectInfo-res',resObj)
            that.setData({
              getCollectInfo: resObj.data.result,
            })
          }
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