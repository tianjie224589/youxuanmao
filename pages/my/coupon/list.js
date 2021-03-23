// pages/my/coupon/list.js
import Dialog from '../../../dist/dialog/dialog';
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    submit_id:0,
    money:0,
  },

  isuse(e){
    console.log('使用',e)

    var that = this
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var id = e.currentTarget.id;
    var type = e.currentTarget.dataset.val;

    if(type==1){
      wx.switchTab({
        url: '../../classify/index'
      })
    }else{
      console.log('使用 优惠券id:',id)

      wx.request({
        url: config.setMyCouponUse_url,
        data:{"source":"wx","token":loginUserinfo.token,"id":id},
        method: "post",
        success: function (res) {
          console.log('使用 res',res)

        }
      });

    }

  },

  goToback(e){
    console.log(e.currentTarget.id)
    var that = this;

    if(that.data.submit_id !=0){
      if(that.data.money < e.currentTarget.dataset.full){
        Toast.fail('金额不满足此优惠券的使用条件');
        return false;
      }

      //带参数返回上一页
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[ pages.length - 2 ];
      //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        couponid : e.currentTarget.id,
        face_value : e.currentTarget.dataset.val
      })

      wx.navigateBack({ changed: true });//返回上一页
      
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    //获取我的优惠券-列表
    wx.request({
      url: config.getMyCouponList_url,
      data:{"source":"wx","token":loginUserinfo.token},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          list: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //来源确认订单
    if(options.oid){
      this.setData({
        submit_id: options.oid,
        money: options.money
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