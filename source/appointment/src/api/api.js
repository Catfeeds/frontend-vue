//测试环境
const promotionServerPath = 'http://119.23.133.72:8023/';
//正式环境
// const promotionServerPath = 'https://promotion.ehuandian.net/';
var yApi = {
	//预约
	siteAppointment: promotionServerPath + 'site/reservation',
};

export default yApi;