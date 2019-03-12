/* eslint-disable */

//测试环境
const ehdServerPath = 'http://test.ehuandian.net/';

var yApi = {
	//获取验证码
	getVCode: ehdServerPath + 'user/family/check',
	//添加亲情账号
	addFamilyAccount: ehdServerPath + 'user/family/add',
	//删除亲情关系
	deleteFamilyAccount: ehdServerPath + 'user/family/delete',
	//获取亲情账号列表
	getFamilyAccountList: ehdServerPath + 'user/family/list',
};

export default {
	yApi: function() {
		return yApi
	}
}
