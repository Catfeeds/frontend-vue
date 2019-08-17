//测试环境
const bigDataServerPath = 'https://test.ehuandian.net/server/bigdata/screen/smartBI/';
//正式环境
// const bigDataServerPath = 'https://promotion.ehuandian.net/';
var yApi = {
	//获取用户加入天数
	getUserJionDays: bigDataServerPath + 'user/rank/useDays',
	//获取用户上次骑行速度
    getLastAvgDriveSpeed: bigDataServerPath + 'user/rank/lastAvgDriveSpeed',
    //获取用户排行信息
    getUserRankData: bigDataServerPath + 'user/rank/userRank',
    //获取用户个人分享数据
    getUserShareData: bigDataServerPath + 'user/rank/showoff',
};

export default yApi;