// pages/my/bank/list.js
import Dialog from '../../../dist/dialog/dialog';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
  },

  onAdd(){
    console.log('添加银行卡')
    wx.navigateTo({
      url: 'addbank'
    })
  },

  onClose(event) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log(event)

    var id = event.currentTarget.id;
    var k = event.currentTarget.dataset.k;

    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
        console.log('默认')

        //设置默认
        var loginUserinfo = (wx.getStorageSync('userinfo'));
        wx.request({
          url: config.setBankDef_url,
          data:{"source":"wx","token":loginUserinfo.token,"id":id},
          method: "post",
          success: function (res) {
            
            wx.request({
              url: config.getBankList_url,
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

          }
        })

      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？',
        }).then(() => {
          instance.close();
          console.log('确认')

          //收货地址-删除
          wx.request({
            url: config.getBankDel_url,
            data:{"source":"wx","token":loginUserinfo.token,"id":id},
            method: "post",
            success: function (res) {
              console.log('删除res',res)
              wx.stopPullDownRefresh();
              var arr= that.data.list;
              arr.splice(k,1)
              console.log('arr',arr)
              that.setData({
                list: arr,
              })
              wx.hideLoading();
            }
          })

        });
        break;
    }
  },
  
  onAdsEdit(e){
    console.log('编辑',e)
    var id = e.currentTarget.id;
    wx.navigateTo({
      url: 'add?id='+id
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    //获取收货地址-列表
    wx.request({
      url: config.getBankList_url,
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
    console.log('返回刷新')
    var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    //获取收货地址-列表
    wx.request({
      url: config.getBankList_url,
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