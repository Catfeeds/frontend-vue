//测试环境
const promotionServerPath = 'https://test.ehuandian.net/server/promotion/app/';
//正式环境
// const promotionServerPath = 'https://promotion.ehuandian.net/';
var yApi = {
	//获取C端服务网点
	getConsumerSites: promotionServerPath + 'site/findSiteList',
};

export default yApi;