var host = "http://www.yiyoucha.com/";
var config = {
  host,
  getCode_url:host+"api/Weixin/getWxCode",
  getClassify_url:host+"api/Classify/getCategoryList",
  getGoodsList_url:host+"api/Goods/getList",
}
module.exports = config;