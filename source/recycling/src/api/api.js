//测试环境
const ehdServerPath = 'http://119.23.133.72:8080/';
//正式环境
// const ehdServerPath = 'https://ehd.ehuandian.net/';

var yApi = {
	//获取回收信息 
	getRecylingInfo: ehdServerPath + 'power/user/recylingInfo',
	//押金退款
	depositRefund: ehdServerPath + 'power/user/combinationRefund',
};

export default yApi;
