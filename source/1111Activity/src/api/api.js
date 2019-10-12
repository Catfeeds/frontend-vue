/* eslint-disable */

//促销测试环境
const promotionServerPath = "https://test.ehuandian.net/server/promotion/app/";
//促销正式环境
// const promotionServerPath = "https://promotion.ehuandian.net/";

var yApi = {
	//获取子任务列表 
    getActivityTaskList: promotionServerPath + 'card/record/task/',
    //获取我的卡片列表
    getMyCardList: promotionServerPath + 'card/record/myCard/',
    //获取集齐人数
    getCompletedCollectionNum: promotionServerPath + 'card/record/summary/',
    //领取卡片
    receiveCard: promotionServerPath + 'card/record/receive/',
    //合成五星卡
    compoundCard:  promotionServerPath + 'card/record/compound',
    //开奖
    drawLottery: promotionServerPath + 'card/record/draw/'
};

export default yApi;