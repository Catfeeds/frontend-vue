<template>
	<div class="mainBK">
		<div v-bind:style="{height:headerImgHeight}">
			<img class="img" src="../assets/header.png" />
		</div>
		<div class="contentDiv">
			<em class="contentTitleClass titleFontClass">服务内容</em>
			<em class="batteryTitleClass textFontClass">电池盗抢险服务(30天)</em>
			<!-- <em class="batteryCostsClass textFontClass">{{insuranceCosts}}元/颗</em> -->
		</div>
		<div class="dividerheight">
		</div>
		<div class="policy-holderDiv">
			<div class="holderTitleDiv">
				<em class="holderTitleClass titleFontClass">投保人信息</em>
			</div>
			<ul class="holderUL">
				<li>
					<div class="holderULlidiv">
						<em class="inputTitleClass textFontClass">姓名</em>
						<input v-bind:style="{width:inputWidth}" type="text" maxlength="20" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="userName"></input>
						<div class="holderLineClass"></div>
					</div>
				</li>
				<li>
					<div class="holderULlidiv">
						<em class="inputTitleClass textFontClass">身份证号码</em>
						<input v-bind:style="{width:inputWidth}" type="text" maxlength="18" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="userIDCard"></input>
						<div class="holderLineClass"></div>
					</div>
				</li>
				<li>
					<div class="holderULlidiv">
						<em class="inputTitleClass textFontClass">手机号码</em>
						<input v-bind:style="{width:inputWidth}" type="tel" maxlength="11" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="userPhone"></input>
						<div class="holderLineClass"></div>
					</div>
				</li>
				<li>
					<div class="holderULlidiv">
						<em class="inputTitleClass textFontClass">中控SN码</em>
						<input v-bind:style="{width:inputWidth}" type="text" maxlength="40" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="scooterSN"></input>
						<div class="holderLineClass"></div>
					</div>
				</li>
				<li>
					<div class="holderULlidiv">
						<em class="inputTitleClass textFontClass">电机号</em>
						<input v-bind:style="{width:inputWidth}" type="text" maxlength="50" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="makeFactory"></input>
						<div class="holderLineClass"></div>
					</div>
				</li>
				<li>
					<div class="holderULlidiv">
						<em class="inputTitleClass textFontClass">车架号</em>
						<input v-bind:style="{width:inputWidth}" type="text" maxlength="20" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="fuelName"></input>
						<div class="holderLineClass"></div>
					</div>
				</li>
				<li>
					<div class="holderULlidiv">
						<em class="inputTitleClass textFontClass">地址</em>
						<input v-bind:style="{width:inputWidth}" type="text" maxlength="50" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="userAddress"></input>
						<div class="holderLineClass"></div>
					</div>
				</li>
				<li>
					<div class="holderULlidiv">
						<em class="inputTitleClass textFontClass">邮箱</em>
						<input v-bind:style="{width:inputWidth}" type="email" maxlength="30" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="userEmail" placeholder=""></input>
					</div>
				</li>
			</ul>
		</div>
		<div class="agreementDiv">
			<label class="checkBoxClass">
				<img class="img" v-bind:src="selectImgSrc" @click="checkclick()" />
			</label>
			<div class="agreementDivClass">
				<span style="left: 0; top: 0; position: absolute; line-height: 16px; padding-top:8px;">
				<span class="remarkFontClass readColor">我已经阅读并同意</span>
				<a class="remarkFontClass agreementColor" @click="scooterXieyiClick()">电动自行车盗抢保险条款</a>
				<span class="remarkFontClass readColor">、</span>
				<a class="remarkFontClass agreementColor" @click="batteryXieyiClick()">电池盗抢保险条款</a>
				<span class="remarkFontClass readColo">及</span>
				<a class="remarkFontClass agreementColor" @click="rightTransferClick()">受益权转让协议</a>
				</span>
            </div>
		</div>
		<div class="claimsDiv">
			<em class="claimsTitleClass titleFontClass">理赔流程</em>
			<img class="claimsArrowImgClass" src="../assets/arrow.png" @click="claimClick"/>
		</div>
		<div class="dividerheight"></div>
		<div class="remarkDiv">
			<div class="leftLine lineClass"></div>
			<em class="remarkTitleClass remarkTitleFontClass">保险说明</em>
			<div class="rightLine lineClass"></div>
			<ul class="remarkUL">
				<li>
					<div class="liDivClass">
						<div class="remarkCircleClass"></div>
						<em class="remarkTextClass remarkFontClass remarkColor">每次投保的保期为30天；</em>
					</div>
				</li>
				<li>
					<div class="liDivClass">
						<div class="remarkCircleClass"></div>
						<em class="remarkTextClass remarkFontClass remarkColor">投保后次日开始生效；</em>
					</div>
				</li>
				<li>
					<div class="liDivClass">
						<div class="remarkCircleClass"></div>
						<em class="remarkTextClass remarkFontClass remarkColor">保险购买之后可以到个人中心-我的保单页面查看保单号；</em>
					</div>
				</li>
				<li>
					<div class="liDivClass">
						<div class="remarkCircleClass"></div>
						<em class="remarkTextClass remarkFontClass remarkColor">请详细阅读相关协议条款和理赔流程；</em>
					</div>
				</li>
			</ul>
		</div>
		<div class="confirmMsgBtn confirmFontClass" @click="confirmClick">确认信息</div>
	</div>
</template>

<script>
	export default {
		name: 'Insurance',
		data() {
			return {
				headerImgHeight: (screen.width * 110) / 375 + 'px',
				inputWidth: (screen.width - 130) + 'px',
				agreementSelected: false,
				selectImgSrc: require('../assets/ic_check_nomal.png'),
				batteryNumStr: '',
				insuranceCosts: '',
				userPhone: '',
				userName: '',
				userIDCard: '',
				scooterSN: '',
				makeFactory:'',
				fuelName:'',
				userAddress: '',
				userEmail: '',
				userToken: '',
			}
		},
		methods: {
			//是不是手机号码
			isPhoneNumber: function(val) {
				var reg = /^1[0-9]{10}$/;
				return reg.test(val);
			},
			isIDCardNumber: function(val) {
				var idcardReg =
					/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
				return idcardReg.test(val)
			},
			isEmail: function (val) {
					var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
					return reg.test(val);
			},
			isEmptyStr: function(val){
				if(val && val.length > 0){
					return false;
				}
				return true;
			},
			fetchUserData: function() {
				var vueThis = this;
				vueThis.axios({
					method: 'get',
					url: vueThis.$yApi.userQuery,
					headers: {
						'Authorization': vueThis.userToken
					}
				}).then(function(resp) {
					var data = resp.data;
					if (data.code == 600) {
						vueThis.userName = data.result.name;
						vueThis.userIDCard = data.result.idcard;
						vueThis.userPhone = data.result.phone;
						vueThis.scooterSN = data.result.sn;
						vueThis.insuranceCosts = data.result.insurance;
					} else {
						var messageStr = data.msg;
						window.location.href = "IMMOTOR://showPrompt?code=0&message=" + messageStr;
					}
				}).catch(resp => {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
				});
			},
			checkclick: function() {
				this.agreementSelected = !this.agreementSelected;
				this.selectImgSrc = this.agreementSelected ? require('../assets/ic_check_select.png') : require(
					'../assets/ic_check_nomal.png');
			},
			scooterXieyiClick: function() {
				window.location.href = "IMMOTOR://openWebView?url=https://imgcn.immotor.com/app/protocol/bikeagreement.html";
			},
			batteryXieyiClick: function () {
				window.location.href = "IMMOTOR://openWebView?url=https://imgcn.immotor.com/app/protocol/batteryagreement.html";
			},
			rightTransferClick: function () {
				window.location.href = "IMMOTOR://openWebView?url=https://imgcn.immotor.com/app/protocol/usufructtransfer.html";
			},
			claimClick: function(){
				window.location.href = "IMMOTOR://openWebView?url=https://imgcn.immotor.com/app/insurance/claim.html";
			},
			confirmClick: function() {
				var vueThis = this;
				if (!vueThis.agreementSelected) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请阅读并同意保险相关协议";
					return;
				}
				if (vueThis.isEmptyStr(vueThis.userName)) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入姓名";
					return;
				}
				if (!vueThis.isIDCardNumber(vueThis.userIDCard)) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入正确的身份证号";
					return;
				}
				if (!vueThis.isPhoneNumber(vueThis.userPhone)) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入正确的手机号";
					return;
				}
				if (vueThis.isEmptyStr(vueThis.scooterSN)) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入你绑定的车辆SN码";
					return;
				}
				if (vueThis.isEmptyStr(vueThis.makeFactory)) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入电机号";
					return;
				}
				if(vueThis.isEmptyStr(vueThis.fuelName) || vueThis.fuelName.length > 20){
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入正确的车架号";
					return;
				}
				if (vueThis.isEmptyStr(vueThis.userAddress)) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入地址";
					return;
				}
				if (!vueThis.isEmail(vueThis.userEmail)) {
					window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入正确的邮箱";
					return;
				}
				vueThis.axios({
					method: 'post',
					url: vueThis.$yApi.addInsurancePolicyInfo,
					data: {
						"name": vueThis.userName,
						"idcard": vueThis.userIDCard,
						"email": vueThis.userEmail,
						"address": vueThis.userAddress,
						"phone": vueThis.userPhone,
						"prechar2": vueThis.scooterSN,
						"makeFactory": vueThis.makeFactory,
						"fuelName": vueThis.fuelName
					},
					headers: {
						'Content-Type': 'application/json',
						'Authorization': vueThis.userToken
					}
				}).then(function(resp) {
					var data = resp.data;
					if (data.code == 600) {
						window.location.href = "IMMOTOR://showPrompt?code=1&message=添加保单信息成功";
						window.location.href = "IMMOTOR://addPolicyInfoSuccess";
					} else {
						var messageStr = data.msg;
						window.location.href = "IMMOTOR://showPrompt?code=0&message=" + messageStr;
					}
				}).catch(resp => {
					console.log('请求失败：' + resp.status + ',' + resp.statusText);
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
						vueThis.fetchUserData();
					}
				})
			} else {
				var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if (isiOS) {
					vueThis.$bridge.callhandler('getEhdUserInfo', '', (responseData) => {
						// 处理返回数据
						vueThis.userToken = "bearer " + responseData.token;
						vueThis.fetchUserData();
					})
				}
			}
		},
	}
</script>

<style>
	@import "../css/general.css";

	.mainBK {
		width: 100%;
		background-color: #FBFBFB;
		overflow: hidden;
	}

	.contentDiv {
		width: 100%;
		height: 90px;
		background-color: white;
		position: relative;
	}

	.dividerheight {
		height: 10px;
	}

	.policy-holderDiv {
		width: 100%;
		height: 450px;
		background-color: white;
		position: relative;
	}

	.agreementDiv {
		width: 100%;
		height: 50px;
		background-color: #F3F4F5;
		position: relative;
	}

	.claimsDiv {
		width: 100%;
		height: 50px;
		background-color: white;
		position: relative;
	}

	.remarkDiv {
		width: 100%;
		height: 171px;
		background-color: white;
		position: relative;
	}

	.confirmMsgBtn {
		width: 100%;
		height: 50px;
		background-color: #FF6B00;
		line-height: 50px;
	}

	.confirmFontClass {
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(255, 255, 255, 1);
	}

	.titleFontClass {
		font-size: 16px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
	}

	.textFontClass {
		font-size: 14px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.remarkTitleFontClass {
		font-size: 14px;
		font-family: PingFangSC-Medium;
		font-weight: 500;
		color: rgba(153, 153, 153, 1);
	}

	.remarkFontClass {
		font-size: 12px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
	}

	.claimsRemarkFontClass {
		font-size: 11px;
		font-family: PingFangSC-Regular;
		font-weight: 400;
	}

	.remarkColor {
		color: #999999;
	}

	.readColor {
		color: #333333;
	}

	.agreementColor {
		color: #FC9153;
	}

	.contentTitleClass {
		left: 20px;
		right: 20px;
		top: 12px;
		height: 24px;
		position: absolute;
		text-align: left;
		line-height: 24px;
	}

	.batteryTitleClass {
		left: 20px;
		width: 220px;
		top: 60px;
		height: 20px;
		position: absolute;
		text-align: left;
		line-height: 20px;
	}

	.batteryCostsClass {
		left: 140px;
		right: 20px;
		top: 65px;
		height: 20px;
		position: absolute;
		text-align: right;
		line-height: 20px;
	}

	.holderTitleDiv {
		width: 100%;
		height: 50px;
		border-bottom: 1px solid rgba(235, 235, 235, 1);
		;
	}

	.holderTitleClass {
		left: 20px;
		right: 20px;
		top: 15px;
		height: 23px;
		position: absolute;
		line-height: 23px;
		text-align: left;
	}

	.holderUL {
		width: 100%;
		height: 400px;
	}

	.holderUL li {
		width: 100%;
		height: 50px;
	}

	.holderULlidiv {
		width: 100%;
		height: 50px;
		position: relative;
	}

	.inputTitleClass {
		left: 20px;
		width: 80px;
		top: 15px;
		height: 20px;
		position: absolute;
		line-height: 20px;
		text-align: left;
	}

	.inputTextClass {
		left: 110px;
		top: 15px;
		height: 20px;
		position: absolute;
		line-height: 20px;
		text-align: left;
		background-color: transparent;
		border: 0;
		-webkit-tap-highlight-color:rgba(255,0,0,0);
	}

	.holderLineClass {
		left: 20px;
		right: 20px;
		top: 49px;
		height: 1px;
		position: absolute;
		background-color: #E5E5E5;
	}

	.checkBoxClass {
		left: 20px;
		width: 16px;
		top: 18px;
		height: 16px;
		position: absolute;
	}

	.img {
		width: 100%;
		height: 100%;
	}

	.agreementDivClass {
		left: 42px;
		right: 15px;
		top: 0px;
		height: 50px;
		line-height: 50px;
		position: absolute;
		text-align: left;
	}
	
	.claimsTitleClass {
		left: 20px;
		top: 15px;
		width: 100px;
		height: 22px;
		position: absolute;
		line-height: 22px;
		text-align: left;
	}
	
	.claimsArrowImgClass{
		right: 20px;
		width: 12px;
		top: 18px;
		height: 12px;
		position: absolute;
	}

	.claimsIconUL {
		left: 10px;
		right: 10px;
		top: 60px;
		height: 50px;
		position: absolute;
		display: flex;
	}

	.claimsIconUL li {
		width: 50px;
		height: 50px;
		margin: auto;
	}

	.iconClass {
		width: 100%;
		height: 100%;
		border-radius: 50%;
		display: block;
	}

	.claimsTextUL {
		left: 10px;
		right: 10px;
		top: 117px;
		height: 20px;
		position: absolute;
		display: flex;
	}

	.claimsTextUL li {
		margin-left: 10px;
		margin-right: 10px;
		height: 20px;
		line-height: 20px;
		margin: auto;
	}

	.claimsRemarkUL {
		left: 10px;
		right: 10px;
		top: 141px;
		height: 34px;
		position: absolute;
		display: flex;
	}

	.claimsRemarkUL li {
		margin-left: 10px;
		margin-right: 10px;
		height: 34px;
		margin: auto;
		overflow: hidden;
		text-overflow: ellipsis;
		display: box;
		display: -webkit-box;
		-webkit-line-clamp: 2;
	}

	.remarkUL {
		left: 0px;
		width: 100%;
		top: 55px;
		bottom: 30px;
		position: absolute;
	}

	.remarkUL li {
		height: 14px;
		margin-bottom: 10px;
	}

	.liDivClass {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.remarkTitleClass {
		left: 20px;
		right: 20px;
		height: 15px;
		top: 20px;
		position: absolute;
		line-height: 15px;
	}

	.leftLine {
		left: 35px;
	}

	.rightLine {
		right: 35px;
	}

	.lineClass {
		width: 90px;
		height: 1px;
		top: 28px;
		position: absolute;
		background: rgba(239, 239, 239, 1);
	}

	.remarkCircleClass {
		left: 12px;
		top: 5px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background: rgba(165, 165, 165, 1);
		position: absolute;
	}

	.remarkTextClass {
		left: 21px;
		right: 12px;
		height: 13px;
		top: 0;
		position: absolute;
		line-height: 13px;
		text-align: left;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
</style>
