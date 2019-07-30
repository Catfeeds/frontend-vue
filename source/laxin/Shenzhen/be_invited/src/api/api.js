/* eslint-disable */

//测试环境
// const promotionServerPath = 'https://test.ehuandian.net/server/promotion/app/';//促销测试环境
const ehd = 'https://ehd.immotor.com';  // e换电正式环境

const promotionServerPath = 'https://promotion.ehuandian.net/';//促销正式环境
// const ehd = 'https://test.ehuandian.net'  // e换电测试环境
var yApi = {
	//获取验证码
	postacquireData: ehd + '/oauth/sendWithOutCaptchaCode',
	//领取奖励
	postacquireAward: ehd + '/oauth/h5Register',
	//城市
	postacquireCity: promotionServerPath + '/userCity'
};

export default yApi;
