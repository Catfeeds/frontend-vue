/* eslint-disable */

//测试环境
const ehdServerPath = 'https://test.ehuandian.net/';

var yApi = {
	//查询用户信息
	userQuery: ehdServerPath + 'insurance/user/details/pre',
	//添加用户保单信息
	addInsurancePolicyInfo: ehdServerPath + 'insurance/user/details/add',
};

export default yApi;