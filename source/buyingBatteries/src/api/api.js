/* eslint-disable */

//测试环境
// const ehdServerPath = 'https://test.ehuandian.net/server/ehd/app/';
//正式环境
const ehdServerPath = 'https://ehd.ehuandian.net/';
//促销测试环境
// const promotionServerPath = "https://test.ehuandian.net/server/promotion/app/";
//促销正式环境
const promotionServerPath = "https://promotion.ehuandian.net"

var yApi = {
	//获取c端用户可购买电池套餐信息 
	getConsumerAvailableBatteryPackage: ehdServerPath + 'power/user/package/availableByC',
	//获取可用的优惠劵列表
	getUsableCouponList: promotionServerPath + 'coupon/usable/1',
};

export default yApi;
