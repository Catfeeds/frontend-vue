/* eslint-disable */

//测试环境
// const ehdServerPath = 'https://test.ehuandian.net/server/ehd/app/';
//正式环境
const ehdServerPath = 'https://ehd.ehuandian.net/';
//促销测试环境
// const promotionServerPath = "https://test.ehuandian.net/server/promotion/app/";
//促销正式环境
const promotionServerPath = "https://promotion.ehuandian.net/"

var yApi = {
	//获取用户保单
	getUserInsuranceOrder: ehdServerPath + 'insurance/user/getUserInsurance',  
    //查询用户信息
	userInsurancePreInfo: ehdServerPath + 'insurance/user/details/pre',
	//查询保险用户信息
	getUserInsuranceInfo: ehdServerPath + 'insurance/user/details/get',
	//添加用户保单信息
	addInsurancePolicyInfo: ehdServerPath + 'insurance/user/details/add',
    //获取用户余额
	getUserBalance: ehdServerPath + 'power/user/amount',
	//发送手机验证码
	getPhoneVCode: ehdServerPath + 'oauth/sendReplaceMsg',
	//获取可用的保险优惠劵列表
	getUsableCouponList: promotionServerPath + 'coupon/usable/3',
};

export default yApi;