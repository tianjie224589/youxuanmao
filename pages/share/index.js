// pages/share/index.js
import Toast from '../../dist/toast/toast';
var config = (wx.getStorageSync('config'));

Page({

  /**
   * 页面的初始数据
   */
  data: {
    getUserInfo: {},
    
    value: '',
    show: {
      primary: true,
      success: true,
    },
    fybanner: '',

    getGoodsList: {},
    page: 1,
    num: 20,
    notype: 3,

    getShareList: {},
    selectNum:0,
    selectOverNum:2,
    
    getGoodsCheck: {},
    showsheet: false,
    fwjg_gid:0,
    radio: 0,
    
    viewHeight:240,
  },

  onChange(e) {
    this.setData({
      value: e.detail,
    });
  },
  onSearch(event) {
    console.log('键盘搜索', event.detail)
    var that = this;
    if(that.value != ''){
      that.getGoodsList();
    }
  },
  onCancel(event) {
    console.log('搜索-取消')
    var that = this;
    that.setData({
      value: '',
    });
    that.getGoodsList();
  },

  onClickLabel(e){
    var that = this;
    console.log('点击标签',e.currentTarget)
    var id = e.currentTarget.id;
    var value = e.currentTarget.dataset.val;

    that.setData({
      value: value,
    });

    that.getGoodsList();

  },

  onGetInfo(e){
    console.log('产品详情',e.currentTarget.dataset.val)
    wx.navigateTo({
      url: '../product/info?id='+e.currentTarget.dataset.val
    })
  },

  onShareAdd(e){
    console.log('加入分享',e.currentTarget.id)
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    //创建分享
    wx.request({
      url: config.setShareAdd_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":e.currentTarget.id},
      method: "post",
      success: function (res) {
        console.log('分享-res',res.data)
        if(res.data.status==200){
          //获取已选择分享商品列表
          wx.request({
            url: config.getShareList_url,
            data:{"source":"wx","token":loginUserinfo.token},
            method: "post",
            success: function (res) {
              console.log('获取分享列表',res.data)
              wx.stopPullDownRefresh();
              that.setData({
                getShareList: res.data.result.list,
                selectNum: res.data.result.count,
              })
              wx.hideLoading();
            }
          });

          Toast.success('加入成功');
        }
      }
    });
  },

  onSheet(e){
    console.log('选择服务机构-打开,商品id:',e.currentTarget.id)
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    //获取此商品的核销机构 列表
    wx.request({
      url: config.getGoodsCheck_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":e.currentTarget.id},
      method: "post",
      success: function (res) {
        console.log('分享-res',res.data.status)
        if(res.data.status==200){
          that.setData({
            getGoodsCheck: res.data.result,
            fwjg_gid: e.currentTarget.id,
          })
        }
      }
    });

    this.setData({ showsheet: true });
  },
  onShowClose() {
    console.log('选择服务机构-关闭')
    this.setData({ showsheet: false });
  },

  onSelectChange(event) {
    console.log('选择服务机构-sid',event.detail)
    this.setData({
      radio: event.detail,
    });
  },
  onClick(event) {
    const { name } = event.currentTarget.dataset;
    console.log('选择服务机构-sid',name)
    this.setData({
      radio: name,
    });
  },
  onFwjg(e){
    console.log('服务机构',e.currentTarget.id)

    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    var id = that.data.fwjg_gid;
    var sid = e.currentTarget.id;
    console.log('创建分享-id',id)
    console.log('创建分享-sid',sid)

    //创建分享
    wx.request({
      url: config.setShareAdd_url,
      data:{"source":"wx","token":loginUserinfo.token,"id":that.data.fwjg_gid,"sid":e.currentTarget.id},
      method: "post",
      success: function (res) {
        console.log('分享-res',res.data)

        //获取已选择分享商品列表
        wx.request({
          url: config.getShareList_url,
          data:{"source":"wx","token":loginUserinfo.token},
          method: "post",
          success: function (res) {
            console.log('获取分享列表',res.data)
            wx.stopPullDownRefresh();
            that.setData({
              getShareList: res.data.result.list,
              selectNum: res.data.result.count,
            })
            wx.hideLoading();
          }
        });

        Toast.success('加入成功');
      }
    });

    this.setData({ showsheet: false });
  },

  //跳转分享商品管理
  onToshare(){
    console.log('跳转分享商品管理')
    var that = this;
    if(that.data.selectNum < that.data.selectOverNum){
      console.log('选择产品数量不足')
      Toast.fail('选择产品数量不足');
      return false;
    }
    wx.navigateTo({
      url: 'myshare'
    })
  },

  getGoodsList(){
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","notype":that.data.notype,"page":that.data.page,"num":that.data.num,"searchname":that.data.value},
      method: "post",
      success: function (res) {
        console.log('获取商品',res.data)
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsList: res.data.result,
        })
        wx.hideLoading();
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('userinfo',loginUserinfo)

    var viewWidth = wx.getSystemInfoSync().windowWidth;   //设置图片显示宽度为当前屏幕宽度，banner
    //计算的高度值 banner
    that.setData({
      viewHeight: viewWidth/(750/274),
    })

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

    //获取banner
    wx.request({
      url: config.getAdvert_url,
      data:{"source":"wx","pid":"5"},
      method: "post",
      success: function (res) {
        wx.stopPullDownRefresh();
        that.setData({
          fybanner: res.data.result[0].imgUrl,
        })
        wx.hideLoading();
      }
    });

    //获取热门标签
    wx.request({
      url: config.getLableHot_url,
      data:{"source":"wx","limit":"2"},
      method: "post",
      success: function (res) {
        console.log('标签 res',res)
        wx.stopPullDownRefresh();
        that.setData({
          lablelist: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //获取商品 notype=3 排除普通商品
    wx.request({
      url: config.getGoodsList_url,
      data:{"source":"wx","type":1,"page":that.data.page,"num":that.data.num,"searchname":that.data.value},
      method: "post",
      success: function (res) {
        console.log('获取商品',res.data)
        wx.stopPullDownRefresh();
        that.setData({
          getGoodsList: res.data.result,
        })
        wx.hideLoading();
      }
    });

    //获取已选择分享商品列表
    wx.request({
      url: config.getShareList_url,
      data:{"source":"wx","token":loginUserinfo.token},
      method: "post",
      success: function (res) {
        console.log('获取分享列表',res.data)
        wx.stopPullDownRefresh();
        that.setData({
          getShareList: res.data.result.list,
          selectNum: res.data.result.count,
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
    this.onLoad()
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