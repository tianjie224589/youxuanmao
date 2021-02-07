var host = "http://www.yiyoucha.com/";
var config = {
  host,
  getCode_url:host+"api/Weixin/getWxCode",
  setUserEdit_url:host+"api/Login/setUserEdit",
  getClassify_url:host+"api/Classify/getCategoryList",
  getGoodsList_url:host+"api/Goods/getList",
}
module.exports = config;