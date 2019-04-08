/* eslint-disable */

//测试环境
const ehdServerPath = 'http://119.23.133.72:8080/';
var yApi = {
	//查询用户信息
	userQuery: ehdServerPath + 'insurance/user/details/pre',
	//添加用户保单信息
	addInsurancePolicyInfo: ehdServerPath + 'insurance/user/details/add',
};

export default yApi;