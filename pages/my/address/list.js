// pages/my/address/list.js
import Dialog from '../../../dist/dialog/dialog';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:{},
    submit_id:0,
  },

  onAdd(){
    console.log('添加收货地址')
    wx.navigateTo({
      url: 'add'
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
          url: config.setCollectDef_url,
          data:{"source":"wx","token":loginUserinfo.token,"id":id},
          method: "post",
          success: function (res) {
            
            wx.request({
              url: config.getCollectList_url,
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
            url: config.getCollectDel_url,
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
      url: config.getCollectList_url,
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
        submit_id: options.oid
      });
    }
    

  },

  goToback(e){
    console.log(e.currentTarget.id)
    if(this.data.submit_id !=0){
      
      //带参数返回上一页
      let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。
      let prevPage = pages[ pages.length - 2 ];
      //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
        adsid : e.currentTarget.id,
      })

      wx.navigateBack({ changed: true });//返回上一页
      
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
    console.log('返回刷新')
    var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    //获取收货地址-列表
    wx.request({
      url: config.getCollectList_url,
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