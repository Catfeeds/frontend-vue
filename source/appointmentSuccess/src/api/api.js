//测试环境
// const promotionServerPath = 'https://test.ehuandian.net/server/promotion/app/';
//正式环境
const promotionServerPath = 'https://promotion.ehuandian.net/';
var yApi = {
	//获取预约信息
    getUserAppointment: promotionServerPath + 'site/reservation',
    //取消预约
    cancerUserAppointment: promotionServerPath + 'site/reservation/cancelTime/',
};

export default yApi;