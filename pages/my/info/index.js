// pages/my/info/index.js
var config = (wx.getStorageSync('config'));

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
        console.log(res)
        wx.switchTab({
          url: '../index/index'
        })
      }
    });


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  var that = this

    var loginUserinfo = (wx.getStorageSync('userinfo'));
    console.log('token',loginUserinfo.token)

    if(option.q){ 
      console.log(option.q);
      var link = decodeURIComponent(option.q);
      console.log(link);
      var paramArr = link.split('=');
      if (paramArr.length == 2){
        var params = paramArr[1].split('_');
        console.log(params[0]);
        console.log(params[1]);

        this.setData({ id: params[1] });
      }     
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