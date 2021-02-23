var host = "http://www.yiyoucha.com/";
var config = {
  host,
  getCode_url:host+"v1/Weixin/getWxCode",
  setUserEdit_url:host+"v1/Login/setUserEdit",
  getClassify_url:host+"v1/Classify/getCategoryList",

  getAdvert_url:host+"v1/Common/getAdvert",
  getConfig_url:host+"v1/Common/getConfig",
  getGoodsList_url:host+"v1/Goods/getList",
  getGoodsInfo_url:host+"v1/Goods/getInfo",
  getShopList_url:host+"v1/Shop/getList",

  getUserInfo_url:host+"api/User/getInfo",
  getCollectList_url:host+"api/User/getCollectList",
  getCollectInfo_url:host+"api/User/getCollectInfo",
  setCollectEdit_url:host+"api/User/setCollect",
  setCollectDef_url:host+"api/User/setCollectDef",
  getCollectDel_url:host+"api/User/getCollectDel",
  setCollect_url:host+"api/User/setCollect",

  
}
module.exports = config;