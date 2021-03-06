// pages/product/info.js
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    identity:'',
    id:0,
    sharebuyid:0,
    share_id:0,
    uid:0,
    viewWidth:0,
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
    var that = this;
    that.setShareBuyAdd();
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
    console.log('分享赚')

    var getGoodsInfo = that.data.getGoodsInfo;

    if(getGoodsInfo.type==1){
      //医院:选择匹配医院-直接分享
      //获取核销机构
      wx.request({
        url: config.getGoodsCheck_url,
        data:{"source":"wx","token":loginUserinfo.token,"id":that.data.id},
        method: "post",
        success: function (res) {
          console.log('分享赚-res',res.data)
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
          console.log('分享赚-res',res.data.status)
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
    console.log('服务机构-加入核销商家',e.currentTarget.id)

    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    //创建分享
    wx.request({
      url: config.setShareAdd_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":that.data.id,"sid":e.currentTarget.id},
      method: "post",
      success: function (res) {
        console.log('服务机构-加入核销商家-res',res.data)
        that.setData({
          share_id: res.data.result
        })
      }
    });

    this.setData({ fwjg: e.currentTarget.id });
  },

  onShareAppMessage: function () {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var url = '/pages/product/info?id=' + that.data.id +'&shareid='+ that.data.share_id;

    console.log('分享url',url);
    return {
      title: that.data.getGoodsInfo.name,
      path:url,
      imageUrl: that.data.getGoodsInfo.thumburl,
      desc: that.data.getGoodsInfo.specs,
      success: (res) => {
        if (res.errMsg == 'shareAppMessage:ok') {
          console.log("转发成功", res);
          console.log("成功了")
        }
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
    console.log('info页面 options',options);
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('info页面 token',loginUserinfo.token)

    var viewWidth=wx.getSystemInfoSync().windowWidth;           //设置图片显示宽度为当前屏幕宽度，
    console.log('viewHeight',viewWidth);
    that.setData({
      viewWidth:viewWidth,
      viewHeight:viewWidth
    })

    //身份
    var identity = wx.getStorageSync('identity');
    console.log('info页面 身份 identity',identity)
    if(identity!=""){
      that.setData({
        identity: identity
      })
    }

    //获取商品id
    var id = options.id;
    console.log('info页面 id',id);
    that.setData({
      id: id
    });

    if(options.shareid){
      console.log('来源分享 shareid',options.shareid);
      that.setData({
        share_id: options.shareid
      });
    }

    //客服电话
    that.setData({
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

  //添加点击分享商品-会员购买记录
  setShareBuyAdd(){
    var that = this;
    var loginUserinfo = wx.getStorageSync('userinfo');
    var token = loginUserinfo.token;

    var share_id = that.data.share_id;
    var goods_id = that.data.id;
    var buy_uid = loginUserinfo.id;

    console.log('info页面 share_id',share_id);
    console.log('info页面 goods_id',goods_id);
    console.log('info页面 buy_uid',buy_uid);

    wx.request({
      url: config.setShareBuyAdd_url,
      data:{"source":"wx","token":token,"share_id":share_id,"goods_id":goods_id,"buy_uid":buy_uid},
      method: "post",
      success: function (res) {
        console.log('添加分享商品会员点击购买记录-res',res.data)
        
        that.setData({
          sharebuyid: res.data.result
        });
        wx.navigateTo({
          url: 'submit?id='+ that.data.id +'&sharebuyid='+ res.data.result
        })
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

  
})