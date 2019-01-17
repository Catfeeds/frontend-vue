<template>
	<div id="familyAccountPage">
		<!-- 添加亲情账号页面 -->
		<div v-if="addPageShow">
			<img id="addPageHeaderImg" v-bind:style="{height: addPageHeaderHeight + 'px'}" src="../assets/addPageHeader.png" />
			<div class="addPageContentDivClass" v-bind:style="{top: (addPageHeaderHeight-5) + 'px'}">
				<div style="width: 100%; height: 100%;">
					<div class="addContentBKDiv">
						<ul id="iconUL">
							<li>
								<img class="iconClass" src="../assets/convenient.png" />
							</li>
							<li>
								<img class="iconClass" src="../assets/free.png" />
							</li>
							<li>
								<img class="iconClass" src="../assets/share.png" />
							</li>
						</ul>
						<ul id="titleUL">
							<li class="addPageTitleFontClass">便捷换电</li>
							<li class="addPageTitleFontClass">免费换电</li>
							<li class="addPageTitleFontClass">多人换电</li>
						</ul>
						<div class="inputDivClass" style="top: 130px;">
							<div style="width: 100%; height: 100%;">
								<img class="inputIcoClass" src="../assets/noteIco.png" />
								<input class="inputClass inputFontClass" maxlength="10" autocomplete="off" v-model="name" placeholder="备注名:例如爸爸"></input>
							</div>
						</div>
						<div class="inputDivClass" style="top: 180px;">
							<div>
								<img class="inputIcoClass" src="../assets/phoneIco.png" />
								<input type="tel" maxlength="11" autocomplete="off" class="inputClass inputFontClass" v-model="userPhone"
								 placeholder="请输入手机号码"></input>
							</div>
						</div>
						<div class="inputDivClass" style="top: 230px;">
							<div>
								<img class="inputIcoClass" src="../assets/vcodeIco.png" />
								<input type="tel" maxlength="6" autocomplete="off" class="inputClass inputFontClass" v-model="vcode"
								 placeholder="验证码"></input>
								<div @click="getVCode" class="vcodeBtnClass vcodeBtnFontClass" v-bind:class="[canReqVCode ? 'vcodeBtnTextColor':'vcodeBtnDisableTextColor']">{{vcodeBtnText}}</div>
							</div>
						</div>
					</div>
					<div class="maskDivClass">
						<img class="maskImg" src="../assets/accountListMask.png" />
					</div>
					<div class="addBtnClass" v-bind:class="[addBtnDisable ? 'addBtnDisableBackground btnDisableFontClass': 'addBtnBackground btnFontClass']"
					 @click="submitAddFamilyAccount">立即为家人开通</div>
				</div>
			</div>
		</div>
		<!-- 亲情账号列表页面 -->
		<div v-if="listPageShow">
			<img id="accountListHeaderImg" v-bind:style="{height: accountListHeaderHeight + 'px'}" src="../assets/accountListHeader.png" />
			<div class="accountListPageContentDivClass" v-bind:style="{top: (accountListHeaderHeight-11) + 'px'}">
				<div style="width: 100%;height: 100%; position: relative;">
					<div class="accountListDivClass" v-bind:style="{height: accountListHeight + 'px'}">
						<div class="accountListBKDivClass" v-bind:style="{height: familyAccountList.length*100 + 'px'}">
							<ul class="accountListULClass">
								<li v-for="(item) in familyAccountList">
									<div class="familyAccountBkDivClass">
										<div style="width: 100%; height: 100%; position: relative;">
											<img class="avatarImgClass" v-bind:src="item.avatar" />
											<em class="itemNameClass">{{item.name}}</em>
											<em class="itemPhoneClass">手机：{{item.phone}}</em>
											<div class="itemDelBtnClass" @click="showDeleteConfirm(item.slaveId, item.name)">解除</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
					<div class="maskDivClass">
						<img class="maskImg" src="../assets/accountListMask.png" />
					</div>
				</div>
			</div>
			<div class="toAddPageBtnClass btnFontClass" @click="addFamilyAccount">继续添加亲情账号</div>
		</div>
		<div v-if="deleteConfirmShow" class="deleteMaskClass">
			<div class="confirmClass">
				<em class="confirmTitleClass confirmTitleFontClass">{{confirmTitle}}</em>
				<div class="cancelBtnClass confirmBtnFontClass" @click="cancelAction">取消</div>
				<div class="okBtnClass confirmBtnFontClass" @click="confirmAction">好</div>
				<div class="horiSepLineClass"></div>
				<div class="veriSepLineClass"></div>
			</div>
		</div>
	</div>
</template>

<script>
	import yData from '../api/api.js'
	import axios from 'axios'

	export default {
		name: 'familyAccount',
		data: function() {
			return ({
				familyAccountList: [],
				addPageShow: false,
				listPageShow: false,
				name: '',
				userPhone: '',
				vcode: '',
				countDownNumber: 0,
				countDownTimer: null,
				vcodeBtnText: '获取验证码',
				canReqVCode: false,
				addBtnDisable: true,
				accountListHeight: 365,
				addPageHeaderHeight: (screen.width * 302.5) / 375,
				accountListHeaderHeight: (screen.width * 101.5) / 375,
				deleteConfirmShow: false,
				confirmTitle: "",
				seletedSlaveId: '',
				userToken: '',
				yApi: yData.yApi(),
			})
		},
		watch: {
			name: function(val, oldVal) {
				this.nameChanged();
			},
			userPhone: function(val, oldVal) {
				this.phoneChanged();
			},
			vcode: function(val, oldVal) {
				this.vcodeChanged();
			},
		},
		methods: {
			//是不是手机号码
			isPhoneNumber: function(str) {
				var reg = /^1[0-9]{10}$/;
				return reg.test(str);
			},
			//1分钟不能获取验证码定时器
			vCodeCountDownTimerFunc: function() {
				var vueThis = this;
				vueThis.countDownTimer = setInterval(function() {
					//提交成功会countDownNumber 改为0 如果此时此任务还未被清除 会有概率出现负数， 导致无法获取验证码
					vueThis.countDownNumber--;
					vueThis.countDownNumber = vueThis.countDownNumber < 0 ? 0 : vueThis.countDownNumber;
					if (vueThis.countDownNumber == 0) {
						vueThis.vcodeBtnText = '获取验证码';
						clearInterval(vueThis.countDownTimer);
						vueThis.countDownTimer = null;
						if (vueThis.isPhoneNumber(vueThis.userPhone) && vueThis.countDownNumber == 0) {
							vueThis.canReqVCode = true;
						} else {
							vueThis.canReqVCode = false;
						}
					} else {
						vueThis.vcodeBtnText = vueThis.countDownNumber.toString();
					}
				}, 1000);
			},
			//设置添加按钮状态
			setAddBtnStatus: function() {
				if (this.isPhoneNumber(this.userPhone) && this.name.length > 0 && this.vcode.length >= 6) {
					this.addBtnDisable = false;
				} else {
					this.addBtnDisable = true;
				}
			},
			//备注名文字改变
			nameChanged: function() {
				this.setAddBtnStatus();
			},
			//手机输入框文字改变
			phoneChanged: function() {
				if (this.isPhoneNumber(this.userPhone) && this.countDownNumber == 0) {
					this.canReqVCode = true;
				} else {
					this.canReqVCode = false;
				}
				this.setAddBtnStatus();
			},
			//验证码文字改变
			vcodeChanged: function() {
				this.setAddBtnStatus();
			},
			//点击添加亲情账号
			addFamilyAccount: function() {
				this.addPageShow = true;
				this.listPageShow = false;
			},
			//获取验证码
			getVCode: function() {
				var vueThis = this;
				if (!vueThis.canReqVCode) {
					return;
				}
				if (vueThis.userPhone.length < 11) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入正确的手机号";
					return;
				}
				axios({
					method: 'get',
					url: vueThis.yApi.getVCode,
					params: {
						"phone": vueThis.userPhone,
					},
					headers: {
						'Authorization': vueThis.userToken
					}
				}).then(function(resp) {
					var data = resp.data;
					if (data.code == 200 || data.code == 600) {
						vueThis.countDownNumber = 60;
						vueThis.canReqVCode = false;
						vueThis.vcodeBtnText = vueThis.countDownNumber.toString();
						//启动定时器
						vueThis.vCodeCountDownTimerFunc();
					} else {
						var messageStr = data.msg;
						window.location.href = "IMMOTOR://showPrompt?code=0&message=" + messageStr;
					}
				}).catch(resp => {
					console.log('请求失败：' + resp.status + ',' + resp.statusText);
					window.location.href = "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
				});
			},
			//提交添加亲情账号
			submitAddFamilyAccount: function() {
				var vueThis = this;
				if (vueThis.addBtnDisable) {
					return;
				}
				if (vueThis.name.length == 0) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入备注名";
					return;
				}
				if (vueThis.userPhone.length < 11) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入正确的手机号";
					return;
				}
				if (vueThis.vcode.length < 6) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入正确的验证码";
					return;
				}
				axios({
					method: 'post',
					url: vueThis.yApi.addFamilyAccount,
					params: {
						"name": vueThis.name,
						"phone": vueThis.userPhone,
						"code": vueThis.vcode
					},
					headers: {
						'Authorization': vueThis.userToken
					}
				}).then(function(resp) {
					var data = resp.data;
					if (data.code == 600 || data.code == 200) {
						//重新拉取亲情账号列表
						vueThis.name = '';
						vueThis.userPhone = '';
						vueThis.vcode = '';
						vueThis.vcodeBtnText = '获取验证码';
						clearInterval(vueThis.countDownTimer);
						vueThis.countDownTimer = null;
						vueThis.canReqVCode = false;
						vueThis.countDownNumber = 0;
						vueThis.getFamilyAccountList();
					} else {
						var messageStr = data.msg;
						window.location.href = "IMMOTOR://showPrompt?code=0&message=" + messageStr;
					}
				}).catch(resp => {
					console.log('请求失败：' + resp.status + ',' + resp.statusText);
					window.location.href = "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
				});
			},
			//显示删除确认框
			showDeleteConfirm: function(slaveId, name) {
				this.seletedSlaveId = slaveId.toString();
				this.confirmTitle = "确认解除与" + name + "的亲情关系";
				this.deleteConfirmShow = true;
			},

			//取消
			cancelAction: function() {
				this.seletedSlaveId = '';
				this.deleteConfirmShow = false;
			},

			//确认
			confirmAction: function() {
				this.deleteFamilyAccount(this.seletedSlaveId);
				this.seletedSlaveId = '';
				this.deleteConfirmShow = false;
			},

			//删除亲情账号
			deleteFamilyAccount: function(slaveId) {
				var vueThis = this;
				if (slaveId && slaveId.length > 0) {
					axios({
						method: 'post',
						url: vueThis.yApi.deleteFamilyAccount,
						params: {
							"slaveId": slaveId,
						},
						headers: {
							'Authorization': vueThis.userToken
						}
					}).then(function(resp) {
						var data = resp.data;
						if (data.code == 600 || data.code == 200) {
							//重新拉取亲情账号列表
							vueThis.getFamilyAccountList();
						} else {
							//出错提示
							var messageStr = data.msg;
							window.location.href = "IMMOTOR://showPrompt?code=0&message=" + messageStr;
						}
					}).catch(resp => {
						console.log('请求失败：' + resp.status + ',' + resp.statusText);
						window.location.href = "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
					});
				}
			},

			//获取亲情账号列表
			getFamilyAccountList: function() {
				var vueThis = this;
				axios({
					method: 'get',
					url: vueThis.yApi.getFamilyAccountList,
					headers: {
						'Authorization': this.userToken
					}
				}).then(function(resp) {
					var data = resp.data;
					if (data.code == 600 || data.code == 200) {
						vueThis.familyAccountList = data.result;
						vueThis.familyAccountList.forEach(function(obj) {
							obj.phone = obj.phone.substr(0, 3) + "****" + obj.phone.substr(7, obj.phone.length);
							if (!(obj.avatar && obj.avatar.length > 0)) {
								obj.avatar = require("../assets/um_default_avatar.png");
							}
						})
						if (vueThis.familyAccountList.length > 0) {
							vueThis.accountListHeight = 65 + vueThis.familyAccountList.length * 100;
							vueThis.addPageShow = false;
							vueThis.listPageShow = true;
						} else {
							vueThis.addPageShow = true;
							vueThis.listPageShow = false;
						}
					} else {
						vueThis.addPageShow = true;
						vueThis.listPageShow = false;
						var messageStr = data.msg;
						window.location.href = "IMMOTOR://showPrompt?code=0&message=" + messageStr;
					}
				}).catch(resp => {
					vueThis.addPageShow = true;
					vueThis.listPageShow = false;
					window.location.href = "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
				});
			}
		},
		mounted: function() {
			//先获取用户信息
			var vueThis = this;
			var u = navigator.userAgent;

			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
			if (isAndroid) {
				vueThis.$bridge.callAndriodHandler('getEhdUserInfo', '', (responseData) => {
					// 处理返回数据
					var dataObj = JSON.parse(responseData);
					if (dataObj && dataObj.token) {
						vueThis.userToken = "bearer " + dataObj.token;
						vueThis.getFamilyAccountList();
					}
				})
			} else {
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if (isiOS) {
					vueThis.$bridge.callhandler('getEhdUserInfo', '', (responseData) => {
						// 处理返回数据
						vueThis.userToken = "bearer " + responseData.token;
						vueThis.getFamilyAccountList();
					})
				}
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	@import "../css/general.css";
	@import "../css/familyAccount.css";
</style>
