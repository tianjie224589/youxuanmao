// pages/product/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:0,
    background: [
      '../../images/info6.jpg',
      '../../images/info5.jpg',
      '../../images/info4.jpg',
      '../../images/info3.jpg',
      '../../images/info2.jpg',
      '../../images/info1.jpg'
    ],
    viewHeight:0,
    nodes:''
  },

  onSubmit(e){
    console.log('自购',e.currentTarget.dataset.val)
    wx.navigateTo({
      url: 'submit?id='+e.currentTarget.dataset.val
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var viewWidth=wx.getSystemInfoSync().windowWidth;           //设置图片显示宽度为当前屏幕宽度，
    console.log('viewHeight',viewWidth);
    this.setData({
      viewHeight:viewWidth
    })

    var id = options.id;
    console.log('id',id);
    this.setData({
      id: id
    });

    let data = '<img style="width:100%;" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fp14.yuemei.com%2Ftao%2F2017%2F0605%2F20170605%2F14966374687807.png&refer=http%3A%2F%2Fp14.yuemei.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1616506666&t=b6faffaf0bb53093499f76253284c551"><div><h3>javascript - <em>js同步编程</em>与异步编程的区别,异步有哪些优点,为什么...</h3><div><span>2016年5月20日 - </span>从编程方式来讲当然是<em>同步编程</em>的方式更为简单,但是同步有其局限性一是假如是单线程那么一旦遇到阻塞调用,会造成整个线程阻塞,导致cpu无法得到有效利用...</div><div><div></div><span ><span ></span></span> - 百度快照</div><div ><span>为您推荐：</span>js同步和异步ajax异步和同步的区别</div></div>';
    this.setData({ nodes:data })

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