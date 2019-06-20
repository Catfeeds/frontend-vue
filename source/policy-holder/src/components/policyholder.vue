<template>
  <div class="mainBK">
    <div class="policy-holderDiv" v-if="policy_holderData">
      <ul class="holderUL">
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">姓名</em>
            <input v-bind:style="{width:inputWidth}" @keyup="inputTextChanged()" type="text" maxlength="20" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="policy_holderData.name"></input>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">身份证号码</em>
            <input v-bind:style="{width:inputWidth}" @keyup="inputTextChanged()" type="text" maxlength="18" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="policy_holderData.idcard"></input>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">手机号码</em>
            <input v-bind:style="{width:inputWidth}" @keyup="inputTextChanged()" type="tel" maxlength="11" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="policy_holderData.phone"></input>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">中控SN码</em>
            <input v-bind:style="{width:inputWidth}" @keyup="inputTextChanged()" type="text" maxlength="40" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="policy_holderData.prechar2"></input>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">电机号</em>
            <input v-bind:style="{width:inputWidth}" @keyup="inputTextChanged()" type="text" maxlength="50" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="policy_holderData.makeFactory"></input>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">车架号</em>
            <input v-bind:style="{width:inputWidth}" @keyup="inputTextChanged()" type="text" maxlength="20" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="policy_holderData.fuelName"></input>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">地址</em>
            <input v-bind:style="{width:inputWidth}" @keyup="inputTextChanged()" type="text" maxlength="50" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="policy_holderData.address"></input>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">邮箱</em>
            <input v-bind:style="{width:inputWidth}" @keyup="inputTextChanged()" type="email" maxlength="30" autocomplete="off" class="inputTextClass textFontClass"
						 v-model="policy_holderData.email" placeholder=""></input>
            <div class="holderLineClass"></div>
          </div>
        </li>
      </ul>
    </div>
    <div v-bind:class="[btnClass]"  @click="savePolicyHolderData()">保存</div>
  </div>
</template>

<script>
export default {
  name: 'policyholder',
  data () {
    return {
      headerImgHeight: (screen.width * 110) / 375 + 'px',
      inputWidth: screen.width - 130 + 'px',
      policy_holderData: null,
      contentChanged: false,
      btnClass: 'submitButton disableColor',
      userToken: ''
    }
  },
  methods: {
    // 是不是手机号码
    isPhoneNumber: function (val) {
      var reg = /^1[0-9]{10}$/
      return reg.test(val)
    },
    isIDCardNumber: function (val) {
      var idcardReg =
					/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
      return idcardReg.test(val)
    },
    isEmail: function (val) {
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      return reg.test(val)
    },
    isEmptyStr: function (val) {
      if (val && val.length > 0) {
        return false
      }
      return true
    },
    inputTextChanged: function () {
      if (!this.contentChanged) {
        this.contentChanged = true
        this.btnClass = 'submitButton normalColor'
      }
    },
    fetchPolicyHolderData: function () {
      var vueThis = this
      vueThis
        .axios({
          method: 'get',
          url: vueThis.$yApi.getInsurancePolicyInfo,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function (resp) {
          var data = resp.data
          if (data.code === 600) {
            vueThis.policy_holderData = data.result
          } else {
            var messageStr = data.msg
            window.location.href =
              'IMMOTOR://showPrompt?code=0&message=' + messageStr
          }
        })
        .catch(resp => {
          window.location.href =
            'IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置'
        })
    },
    savePolicyHolderData: function () {
      var vueThis = this

      if (!vueThis.contentChanged) {
        return
      }

      if (vueThis.isEmptyStr(vueThis.policy_holderData.name)) {
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=请输入姓名'
        return
      }
      if (!vueThis.isIDCardNumber(vueThis.policy_holderData.idcard)) {
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=请输入正确的身份证号'
        return
      }
      if (!vueThis.isPhoneNumber(vueThis.policy_holderData.phone)) {
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=请输入正确的手机号'
        return
      }
      if (vueThis.isEmptyStr(vueThis.policy_holderData.prechar2)) {
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=请输入你绑定的车辆SN码'
        return
      }
      if (vueThis.isEmptyStr(vueThis.policy_holderData.makeFactory)) {
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=请输入电机号'
        return
      }
      if (vueThis.isEmptyStr(vueThis.policy_holderData.fuelName) || vueThis.policy_holderData.fuelName.length > 20) {
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=请输入正确的车架号'
        return
      }
      if (vueThis.isEmptyStr(vueThis.policy_holderData.address)) {
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=请输入地址'
        return
      }
      if (!vueThis.isEmail(vueThis.policy_holderData.email)) {
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=请输入正确的邮箱'
        return
      }
      vueThis.axios({
        method: 'post',
        url: vueThis.$yApi.addInsurancePolicyInfo,
        data: {
          'name': vueThis.policy_holderData.name,
          'idcard': vueThis.policy_holderData.idcard,
          'email': vueThis.policy_holderData.email,
          'address': vueThis.policy_holderData.address,
          'phone': vueThis.policy_holderData.phone,
          'prechar2': vueThis.policy_holderData.prechar2,
          'makeFactory': vueThis.policy_holderData.makeFactory,
          'fuelName': vueThis.policy_holderData.fuelName
        },
        headers: {
          'Content-Type': 'application/json',
          'Authorization': vueThis.userToken
        }
      }).then(function (resp) {
        var data = resp.data
        if (data.code === 600) {
          window.location.href = 'IMMOTOR://showPrompt?code=1&message=修改投保人信息成功'
          vueThis.btnClass = 'submitButton disableColor'
          vueThis.contentChanged = false
        } else {
          window.location.href = 'IMMOTOR://showPrompt?code=0&message=' + data.msg
        }
      }).catch(resp => {
        console.log('请求失败：' + resp.status + ',' + resp.statusText)
        window.location.href = 'IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置'
      })
    }
  },
  mounted: function () {
    // 先获取用户信息
    var vueThis = this
    var u = navigator.userAgent
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
    if (isAndroid) {
      vueThis.$bridge.callAndriodHandler('getEhdUserInfo', '', responseData => {
        // 处理返回数据
        var dataObj = JSON.parse(responseData)
        if (dataObj && dataObj.token) {
          vueThis.userToken = 'bearer ' + dataObj.token
          vueThis.fetchPolicyHolderData()
        }
      })
    } else {
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) // ios终端
      if (isiOS) {
        vueThis.$bridge.callhandler('getEhdUserInfo', '', responseData => {
          // 处理返回数据
          vueThis.userToken = 'bearer ' + responseData.token
          vueThis.fetchPolicyHolderData()
        })
      }
    }
  }
}
</script>

<style>
@import "../css/general.css";

.mainBK {
  width: 100%;
  height: 100%;
  background-color: #fff;
  overflow: hidden;
}

.policy-holderDiv {
  width: 100%;
  height: 400px;
  background-color: white;
  position: relative;
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

.holderTitleDiv {
  width: 100%;
  height: 50px;
  border-bottom: 1px solid rgba(235, 235, 235, 1);
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
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}

.holderLineClass {
  left: 20px;
  right: 20px;
  top: 49px;
  height: 1px;
  position: absolute;
  background-color: #e5e5e5;
}

.submitButton {
  position: relative;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 60px;
  margin-bottom: 40px;
  height: 50px;
  border-radius: 2px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
}

.disableColor{
  background: #ccc;
}

.normalColor{
  background: rgba(252, 145, 83, 1);
}

.nav-hide {
  display: none;
}

.nav-visible{
  display: block;
}

</style>
