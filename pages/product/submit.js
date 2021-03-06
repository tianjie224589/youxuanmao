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
    sharebuyid:0,
    collectid:0,
    getCollectInfo: {},
  },

  onSubmit(e){
    console.log('提交订单',e);
    var that = this;
    var id = that.data.id;
    var num = that.data.num;
    var sharebuyid = that.data.sharebuyid;    //是否是分享商品 0不是 其他数字为分享者的会员id
    var collectid = that.data.collectid;      //收货地址id

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    var token = loginUserinfo.token;

    if(collectid==''||collectid==undefined){
      collectid = 0;
    }

    if(that.data.getGoodsInfo.type==3 && collectid == 0){
      console.log('请添加收货地址');
      return false;
    }

    console.log('gid',id)
    console.log('num',num)
    console.log('sharebuyid',sharebuyid)
    console.log('collectid',collectid)
    

    //创建订单
    wx.request({
      url: config.setOrderAdd_url,
      data:{"source":"wx","token":token,"gid":id,"num":num,"sharebuyid":sharebuyid,"collectid":collectid},
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
    var that = this;
    console.log(that.data.getGoodsInfo.price,event.detail);
    var price = that.data.getGoodsInfo.price;

    if(that.data.getGoodsInfo.type==1){
      price = that.data.getGoodsInfo.advance;
    }

    that.setData({
      num: event.detail,
      money: price * event.detail,
    });
  },

  onSelectAds(){
    console.log('选择收货地址')
    wx.navigateTo({
      url: '../my/address/list?oid='+this.data.id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('确认订单页面 options',options);
    var that = this;

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('loginUserinfo',loginUserinfo)

    var id = options.id;
    console.log('确认订单 id',id);
    that.setData({
      id: id
    });

    if(options.sharebuyid){
      console.log('确认订单 sharebuyid',options.sharebuyid);
      that.setData({
        sharebuyid: options.sharebuyid
      });
    }
    
    //获取详情
    wx.request({
      url: config.getGoodsInfo_url,
      data:{"source":"wx","id":id},
      method: "post",
      success: function (res) {
        console.log(res)
        
        var money = res.data.result.price;
        if(res.data.result.type==1){
          money = res.data.result.advance;
        }

        wx.stopPullDownRefresh();
        that.setData({
          getGoodsInfo: res.data.result,
          money: money,
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
              collectid: resObj.data.result.id,
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
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    if(that.data.adsid != 0){
      //获取默认收货地址
      wx.request({
        url: config.getCollectInfo_url,
        data:{"source":"wx","token":loginUserinfo.token,'id':that.data.adsid},
        method: "post",
        success: function (resObj) {
          console.log('CollectInfo-res',resObj)
          wx.stopPullDownRefresh();
          that.setData({
            getCollectInfo: resObj.data.result,
            collectid: resObj.data.result.id,
          })
          wx.hideLoading();
        }
      });
    }
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