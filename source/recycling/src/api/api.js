//测试环境
const ehdServerPath = 'https://test.ehuandian.net/server/ehd/app/';
//正式环境
// const ehdServerPath = 'https://ehd.ehuandian.net/';

var yApi = {
	//获取回收信息 
	getRecylingInfo: ehdServerPath + 'power/user/recylingInfo',
	//押金退款
	depositRefund: ehdServerPath + 'power/user/combinationRefund',
};

export default yApi;
