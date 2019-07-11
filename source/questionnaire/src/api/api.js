/* eslint-disable */

//测试环境
const promotionServerPath = 'https://test.ehuandian.net/server/promotion/app/';
//正式环境
// const promotionServerPath = 'https://promotion.ehuandian.net/';
var yApi = {
	//获取押金退还原因问卷内容
	getQuestionnaireData: promotionServerPath + 'deposit/refund/findAll',
	//添加用户保单信息
	recordQuestionnaire: promotionServerPath + 'deposit/refund/record',
};

export default yApi;