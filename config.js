var host = "https://www.yiyoucha.com/";
var config = {
  host,
  getCode_url:host+"v1/Weixin/getWxCode",
  getUserInfoWx_url:host+"api/Weixin/getUserInfoWx",

  setUserEdit_url:host+"v1/Login/setUserEdit",
  getClassify_url:host+"v1/Classify/getCategoryList",

  getAdvert_url:host+"v1/Common/getAdvert",
  getConfig_url:host+"v1/Common/getConfig",
  qiniuFile_url:host+"api/Upload/qiniuFile",
  
  getGoodsList_url:host+"v1/Goods/getList",
  getGoodsInfo_url:host+"v1/Goods/getInfo",
  getGoodsCheck_url:host+"api/Goods/getCheckList",
  getNavGoodsList_url:host+"api/Goods/getNavGoodsList",

  getShopList_url:host+"v1/Shop/getList",
  getShopInfo_url:host+"api/Shop/getInfo",
  setShopAdd_url:host+"api/Shop/setShopAdd",

  getUserInfo_url:host+"api/User/getInfo",
  getTopUserList_url:host+"api/User/getTopUserList",
  getBindInitial_url:host+"api/User/getBindInitial",
  
  getCollectList_url:host+"api/User/getCollectList",
  getCollectInfo_url:host+"api/User/getCollectInfo",
  setCollectEdit_url:host+"api/User/setCollect",
  setCollectDef_url:host+"api/User/setCollectDef",
  getCollectDel_url:host+"api/User/getCollectDel",

  getBankList_url:host+"api/User/getBankList",
  getBankInfo_url:host+"api/User/getBankInfo",
  setBankAdd_url:host+"api/User/setBankAdd",
  setBankDef_url:host+"api/User/setBankDef",
  getBankDel_url:host+"api/User/getBankDel",

  getWaterList_url:host+"api/Capital/getWaterList",
  getCashOut_url:host+"api/Capital/getCashOut",

  getOrderList_url:host+"api/Order/getOrderList",
  setOrderAdd_url:host+"api/Order/setOrderAdd",
  getOrderInfo_url:host+"api/Order/getOrderInfo",
  setHexiaoma_url:host+"api/Order/setHexiaoma",

  getShareList_url:host+"api/Share/getShareList",
  setShareAdd_url:host+"api/Share/setShareAdd",
  setShareDel_url:host+"api/Share/setShareDel",
  setShareBuyAdd_url:host+"api/Share/setShareBuyAdd",

  setPay_url:host+"api/Order/setPay",

  setYuyue_url:host+"api/Order/setYuyue",
  setConfirm_url:host+"api/Order/setConfirm",
  getOrderShopList_url:host+"api/Order/getOrderShopList",

  getCouponList_url:host+"api/Coupon/getCouponList",
  setCouponAdd_url:host+"api/Coupon/setCouponAdd",
  getMyCouponList_url:host+"api/Coupon/getMyCouponList",
  setMyCouponUse_url:host+"api/Order/setMyCouponUse",

  telephone:"15683088738",

}
module.exports = config;