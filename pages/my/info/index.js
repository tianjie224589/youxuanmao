// pages/my/info/index.js
import Toast from '../../../dist/toast/toast';
var config = (wx.getStorageSync('config'));
var replace = require('../../../utils/replace.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    license: [],
    sfz_z: [],
    sfz_f: [],

    id:0,
    license_id:0,
    sfz_z_id:0,
    sfz_f_id:0,
    name:'',
    address:'',
    tell:'',

    infoArticle:{},
    nodes:'',

    showpopup: false,
  },

  showPopup() {
    this.setData({ showpopup: true });
  },
  onClosePopup() {
    this.setData({ showpopup: false });
  },

  afterRead(event) {
    var that = this;
    const { file } = event.detail;
    console.log(file)

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://www.yiyoucha.com/api/Upload/qiniuFile', // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { "source":"wx" },
      success(res) {
        console.log('图片上传返回',res)
        var obj = JSON.parse(res.data);
        // 上传完成需要更新 fileList
        const { license = [] } = that.data;
        license.push({ ...file, url: obj.result.url });
        that.setData({ 
          license: license,
          license_id:obj.result.id
        });
      },
    });
    
  },

  afterRead_z(event) {
    var that = this;
    const { file } = event.detail;
    console.log(file)

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: config.qiniuFile_url, // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { "source":"wx" },
      success(res) {
        console.log('图片上传返回',res)
        var obj = JSON.parse(res.data);
        // 上传完成需要更新 fileList
        const { sfz_z = [] } = that.data;
        sfz_z.push({ ...file, url: obj.result.url });
        that.setData({ 
          sfz_z: sfz_z,
          sfz_z_id:obj.result.id
        });
      },
    });
    
  },

  afterRead_f(event) {
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    const { file } = event.detail;
    console.log(file)

    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: config.qiniuFile_url, // 仅为示例，非真实的接口地址
      filePath: file.url,
      name: 'file',
      formData: { "source":"wx" },
      success(res) {
        console.log('图片上传返回',res)
        var obj = JSON.parse(res.data);
        // 上传完成需要更新 fileList
        const { sfz_f = [] } = that.data;
        sfz_f.push({ ...file, url: obj.result.url });
        that.setData({ 
          sfz_f: sfz_f,
          sfz_f_id:obj.result.id
        });
      },
    });
    
  },

  //提交
  onAdd(){
    var that = this;
    var loginUserinfo = (wx.getStorageSync('userinfo'));

    var license_id = that.data.license_id;
    var sfz_z_id = that.data.sfz_z_id;
    var sfz_f_id = that.data.sfz_f_id;
    var name = that.data.name;
    var address = that.data.address;
    var tell = that.data.tell;

    wx.request({
      url: config.setShopAdd_url,
      data:{"source":"wx","token":loginUserinfo.token,"license_id":license_id,"sfz_z_id":sfz_z_id,"sfz_f_id":sfz_f_id,"name":name,"address":address,"tell":tell,"uid":that.data.id},
      method: "post",
      success: function (res) {
        console.log('注册商家返回：',res)
        if(res.data.status == 200){
          wx.switchTab({
            url: '../index'
          })
          
        }else{
          Toast.fail(res.data.msg);
        }
        
      }
    });

  },

  //获取《商家入驻协议》
  getShopRegInfo(){
    var that = this
    wx.request({
      url: config.getArticleInfo_url,
      data:{"source":"wx","id":14},
      method: "post",
      success: function (res) {
        console.log('商家入驻协议 返回：',res)
        if(res.data.status == 200){
          that.setData({
            infoArticle: res.data.result,
            nodes: replace.convertHtmlToText(res.data.result.content)
          });
        }else{
          Toast.fail(res.data.msg);
        }
        
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo)

    console.log('生美/美容-注册：option',option)
    if(option.q){
      var link = decodeURIComponent(option.q);
      console.log('生美/美容-注册：url',link);
      var paramArr = link.split('ewm/');
      if (paramArr.length == 2){
        console.log('绑定销售id',paramArr[1]);

        this.setData({ id: paramArr[1] });
      }     
    }
    
    if(option.id){
      console.log('绑定销售id',option.id);
      this.setData({ id: option.id});   
    }

    that.getShopRegInfo();

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