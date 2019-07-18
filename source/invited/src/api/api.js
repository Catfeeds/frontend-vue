/* eslint-disable */

//测试环境
const promotionServerPath = 'https://test.ehuandian.net/server/promotion/app/';
//正式环境
// const promotionServerPath = 'https://promotion.ehuandian.net/';
var yApi = {
	//获取我的奖励
	// gainMyReward: promotionServerPath + '/invitation/mySummary?invActId=5d245b3c5c108800016e4c0a',
	gainMyReward: promotionServerPath + '/invitation/mySummary',
	//获取我的邀请列表
	// gainMyInviteList: promotionServerPath + '/invitation/myInvitationList?pageIndex=1&pageSize=10&invActId=5d245b3c5c108800016e4c0a',
	gainMyInviteList: promotionServerPath + '/invitation/myInvitationList',
	//根据拉新活动id获取排行前10名
	// ToptenReviews: promotionServerPath + '/invitation/recentInvitationList/5d245b3c5c108800016e4c0a'
	ToptenReviews: promotionServerPath + '/invitation/recentInvitationList/'
};
export default yApi;
