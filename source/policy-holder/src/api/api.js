/* eslint-disable */

//测试环境
// const ehdServerPath = 'https://test.ehuandian.net/';
//正式环境
const ehdServerPath = 'https://ehd.ehuandian.net/';

var yApi = {
	//查询已填保单信息
	getInsurancePolicyInfo: ehdServerPath + 'insurance/user/details/get',
	//修改投保人信息
	addInsurancePolicyInfo: ehdServerPath + 'insurance/user/details/add',
};

export default yApi;