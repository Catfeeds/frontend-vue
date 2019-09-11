/* eslint-disable */

//测试环境
// const ehdServerPath = 'http://119.23.133.72:8080/';
const ehdServerPath = 'https://test.ehuandian.net/server/ehd/app/';
//正式环境
// const ehdServerPath = 'https://ehd.ehuandian.net/';
//促销测试环境
const promotionServerPath = "https://test.ehuandian.net/server/promotion/app/";
//促销正式环境
// const promotionServerPath = "https://promotion.ehuandian.net/"

var yApi = {
	//点亮换电柜
	lightBatteryStation: promotionServerPath + 'light-activity',  
    //获取我的点亮排行
	getMyLightRank: promotionServerPath + 'light-activity/mySummary',
	//获取点亮排行
    getLightRankList: promotionServerPath + 'light-activity/lightRankingList/',
    //获取我点亮的换电柜
    getMyLightedStationList: promotionServerPath + 'light-activity/findAll/',
	//获取周围换电柜
	getAroundBatteryStation: ehdServerPath + 'power',
};

export default yApi;