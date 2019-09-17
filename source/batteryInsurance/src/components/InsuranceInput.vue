<template>
  <div class="pageContent">
    <van-cell-group class="headerTop">
      <van-field v-model="name" placeholder="请输入用户名" maxlength="20" @input="textChanged" disabled>
        <div slot="label" class="leftText">用户名</div>
        <div slot="button" class="authClass">已认证</div>
      </van-field>
      <van-field
        v-model="idCard"
        placeholder="请输入身份证号"
        type="number"
        maxlength="18"
        @input="textChanged"
        disabled
      >
        <div slot="label" class="leftText">身份证</div>
        <div slot="button" class="authClass">已认证</div>
      </van-field>
      <van-field
        v-model="phone"
        placeholder="请输入手机号码"
        type="tel"
        maxlength="11"
        @input="telInput"
        clearable
      >
        <div slot="label" class="leftText">手机号</div>
      </van-field>
      <van-field
        v-model="vcode"
        placeholder="请输入验证码"
        type="number"
        maxlength="6"
        @input="textChanged"
        v-if="showVCode"
        clearable
      >
        <div slot="label" class="leftText">验证码</div>
        <div
          slot="button"
          v-bind:class="[sendDisable?'vcodeDisableTextColor':'vcodeTextColor', 'vcodeBtn']"
          @click="sendVCodeAction"
        >{{sendText}}</div>
      </van-field>
    </van-cell-group>
    <van-cell-group class="headerTop">
      <van-field v-model="sn" placeholder="请输入中控SN码" maxlength="40" @input="textChanged" clearable>
        <div slot="label" class="leftText">中控SN</div>
      </van-field>
      <van-field
        v-model="makeFactory"
        placeholder="请输入电机号"
        maxlength="50"
        @input="textChanged"
        clearable
      >
        <div slot="label" class="leftText">电机号</div>
      </van-field>
      <van-field
        v-model="fuelName"
        placeholder="请输入车架号"
        maxlength="20"
        @input="textChanged"
        clearable
      >
        <div slot="label" class="leftText">车架号</div>
      </van-field>
      <van-field v-model="addr" placeholder="请输入地址" maxlength="50" @input="textChanged" clearable>
        <div slot="label" class="leftText">地址</div>
      </van-field>
      <van-field v-model="email" placeholder="请输入邮箱" maxlength="30" @input="textChanged" clearable>
        <div slot="label" class="leftText">邮箱</div>
      </van-field>
    </van-cell-group>
    <div class="confirmBtn" @click="confirmAction">确定</div>
  </div>
</template>

<script>
export default {
  name: "InsuranceInput",
  data() {
    return {
      name: "",
      idCard: "",
      phone: "",
      vcode: "",
      sn: "",
      makeFactory: "",
      fuelName: "",
      addr: "",
      email: "",
      lastPhone: "",
      showVCode: false,
      isChange: false,
      sendDisable: false,
      sendText: "发送验证码",
      disableTimer: null
    };
  },
  mounted() {
    this.getInsuranceInfo();
  },
  methods: {
    confirmAction: function() {
      var vueThis = this;
      if (vueThis.isEmptyStr(vueThis.name)) {
        window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入姓名";
        return;
      }
      if (!vueThis.isIDCardNumber(vueThis.idCard)) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请输入正确的身份证号";
        return;
      }
      if (!vueThis.isPhoneNumber(vueThis.phone)) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请输入正确的手机号";
        return;
      }
      if (vueThis.isEmptyStr(vueThis.sn)) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请输入你绑定的车辆SN码";
        return;
      }
      if (vueThis.isEmptyStr(vueThis.makeFactory)) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请输入电机号";
        return;
      }
      if (
        vueThis.isEmptyStr(vueThis.fuelName) ||
        vueThis.fuelName.length > 20
      ) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请输入正确的车架号";
        return;
      }
      if (vueThis.isEmptyStr(vueThis.addr)) {
        window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入地址";
        return;
      }
      if (!vueThis.isEmail(vueThis.email)) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请输入正确的邮箱";
        return;
      }
      if (vueThis.showVCode && vueThis.vcode.length != 6) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请输入正确的验证码";
        return;
      }
      if (vueThis.isChange) {
        vueThis
          .axios({
            method: "post",
            url: vueThis.showVCode
              ? vueThis.$yApi.addInsurancePolicyInfo + "?cCode=" + vueThis.vcode
              : vueThis.$yApi.addInsurancePolicyInfo,
            data: {
              name: vueThis.name,
              idcard: vueThis.idCard,
              email: vueThis.email,
              address: vueThis.addr,
              phone: vueThis.phone,
              prechar2: vueThis.sn,
              makeFactory: vueThis.makeFactory,
              fuelName: vueThis.fuelName
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: vueThis.$store.state.userToken
            }
          })
          .then(function(resp) {
            var data = resp.data;
            if (data.code == 600) {
              vueThis.$router.push({
                path: "/instructions"
              });
            } else {
              window.location.href =
                "IMMOTOR://showPrompt?code=0&message=" + data.msg;
            }
          })
          .catch(resp => {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
          });
      } else {
        vueThis.$router.push({
          path: "/instructions"
        });
      }
    },
    telInput: function() {
      this.showVCode = this.phone == this.lastPhone ? false : true;
      this.isChange = true;
    },
    textChanged: function() {
      this.isChange = true;
    },
    sendVCodeAction: function() {
      if (!this.sendDisable) {
        if (!this.isPhoneNumber(this.phone)) {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=请输入正确的手机号";
          return;
        }
        this.sendDisable = true;
        this.getPhoneVCode();
        var offset = 60;
        this.sendText = offset + "后重新获取";
        var vueThis = this;
        vueThis.disableTimer = setInterval(() => {
          offset--;
          if (offset == 0) {
            vueThis.sendText = "发送验证码";
            vueThis.sendDisable = false;
            clearInterval(vueThis.disableTimer);
            vueThis.disableTimer = null;
          }
          vueThis.sendText = offset + "后重新获取";
        }, 1000);
      }
    },
    getInsuranceInfo: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getUserInsuranceInfo,
          headers: {
            Authorization: vueThis.$store.state.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            if (data.result) {
              vueThis.name = data.result.name;
              vueThis.idCard = data.result.idcard;
              vueThis.phone = data.result.phone;
              vueThis.lastPhone = data.result.phone;
              vueThis.sn = data.result.prechar2;
              vueThis.makeFactory = data.result.makeFactory;
              vueThis.fuelName = data.result.fuelName;
              vueThis.addr = data.result.address;
              vueThis.email = data.result.email;
            } else {
              vueThis.getUserInsurancePreInfo();
            }
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.msg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getUserInsurancePreInfo: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.userInsurancePreInfo,
          headers: {
            Authorization: vueThis.$store.state.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            vueThis.name = data.result.name;
            vueThis.idCard = data.result.idcard;
            vueThis.phone = data.result.phone;
            vueThis.lastPhone = data.result.phone;
            vueThis.sn = data.result.sn;
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.msg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getPhoneVCode: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.getPhoneVCode,
          data: {
            phone: vueThis.phone
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: vueThis.$store.state.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
          } else {
            vueThis.sendText = "发送验证码";
            vueThis.sendDisable = false;
            clearInterval(vueThis.disableTimer);
            vueThis.disableTimer = null;
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.msg;
          }
        })
        .catch(resp => {
          vueThis.sendText = "发送验证码";
          vueThis.sendDisable = false;
          clearInterval(vueThis.disableTimer);
          vueThis.disableTimer = null;
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    isPhoneNumber: function(val) {
      var reg = /^1[0-9]{10}$/;
      return reg.test(val);
    },
    isIDCardNumber: function(val) {
      var idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      return idcardReg.test(val);
    },
    isEmail: function(val) {
      var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      return reg.test(val);
    },
    isEmptyStr: function(val) {
      if (val && val.length > 0) {
        return false;
      }
      return true;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 100%;
  height: 100%;
  display: block;
}
.pageContent {
  background: #f8f8f8;
  height: 100%;
  padding: 0.1px;
}

.headerTop {
  margin-top: 10px;
}
.input {
  width: 375px;
}
.confirmBtn {
  margin: 30px 20px;
  height: 50px;
  /* left: 20px;
  right: 20px;
  bottom: 30px; */
  position: relative;
  background: rgba(255, 127, 69, 1);
  border-radius: 5px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
}
.leftText {
  width: 50px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  text-align: left;
}
.vcodeBtn {
  width: 100px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  line-height: 20px;
  text-align: right;
}
.vcodeTextColor {
  color: rgba(255, 127, 69, 1);
}
.vcodeDisableTextColor {
  color: rgba(149, 149, 149, 1);
}
.authClass {
  width: 44px;
  height: 18px;
  background: rgba(212, 215, 218, 1);
  border-radius: 2px;
  font-size: 10px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
  text-align: center;
}
</style>
