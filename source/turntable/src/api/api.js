/* eslint-disable */

//测试环境
const promotionServerPath = 'https://test.ehuandian.net/server/promotion/app/';
//正式环境
// const promotionServerPath = 'https://promotion.ehuandian.net/';
var yApi = {
	//获取奖品配置信息
	getLotteryData: promotionServerPath + 'lottery/',
	//获取用户抽奖次数
	getUserLotteryTimes: promotionServerPath + 'lotterytime/',
	//获取最近中奖名单
	getRecentwinnerlist: promotionServerPath + 'lottery/recentwinnerlist/',
	//获取我的奖品列表
	getMyPrizeList: promotionServerPath + 'lottery/myprizelist/',
	//抽奖
	luckyDraw: promotionServerPath + 'lottery/draw/',
	//登记实物中奖者信息
	recordEntityWinnerInfo: promotionServerPath + 'entity/record/report'
};

export default yApi;
