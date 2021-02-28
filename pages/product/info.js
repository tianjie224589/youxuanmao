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
    getUserInfo: {},
    phone: '12345678',

    show: false,
    fwjg:0,
    
    showPopup: false,
    getGoodsCheck: {},
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

  onShare(){
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('分享',loginUserinfo)

    var getGoodsInfo = that.data.getGoodsInfo
    console.log('商品类型',getGoodsInfo.type)

    if(getGoodsInfo.type==1){
      //医院:选择匹配医院-直接分享
      //获取核销机构
      wx.request({
        url: config.getGoodsCheck_url,
        data:{"source":"wx","token":loginUserinfo.token,"id":that.data.id},
        method: "post",
        success: function (res) {
          console.log('分享-res',res.data.status)
          if(res.data.status==200){
            that.setData({
              getGoodsCheck: res.data.result,
            })
          }
        }
      });

      this.setData({ show: true });
    }else if(getGoodsInfo.type==2){
      //美容:加入分享库-跳转到省赚页面

      //创建分享
      wx.request({
        url: config.setShareAdd_url,
        data:{"source":"wx","token":loginUserinfo.token,"id":that.data.id},
        method: "post",
        success: function (res) {
          console.log('分享-res',res.data.status)
          if(res.data.status==200){
            wx.switchTab({
              url: '../share/index'
            })
          }
        }
      });

    }else{
      console.log('商品类型错误')
    }
  },
  onShowClose() {
    this.setData({ show: false });
  },

  onFwjg(e){
    console.log('服务机构',e.currentTarget.id)

    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    //创建分享
    wx.request({
      url: config.setShareAdd_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":that.data.id,"sid":e.currentTarget.id},
      method: "post",
      success: function (res) {
        console.log('分享-res',res.data.status)
      }
    });

    this.setData({ fwjg: e.currentTarget.id });
  },

  onShareAppMessage: function () {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    let url = encodeURIComponent('/pages/product/info?id=' + that.data.id);
 
    return {
      title: that.data.getGoodsInfo.name,
      path:"/pages/index/index?url="+url,
      imageUrl: that.data.getGoodsInfo.thumburl,
      desc: that.data.getGoodsInfo.specs,
      success: (res) => {
        console.log("转发成功", res);
        console.log("成功了")
      },
      fail: (res) => {
        console.log("转发失败", res);
      }
    }
 
  },

  showPopup() {
    this.setData({ showPopup: true });
  },
  onClosePopup() {
    this.setData({ showPopup: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    var viewWidth=wx.getSystemInfoSync().windowWidth;           //设置图片显示宽度为当前屏幕宽度，
    console.log('viewHeight',viewWidth);
    this.setData({
      viewHeight:viewWidth
    })

    //获取商品id
    var id = options.id;
    console.log('id',id);
    this.setData({
      id: id
    });

    //客服电话
    this.setData({
      phone: config.telephone
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