<template>
  <div class="mainBK" v-loading="!policy_holderData" v-if="policy_holderData">
    <div class="policy-holderDiv">
      <ul class="holderUL">
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">姓名</em>
            <em
              v-bind:style="{width:inputWidth}"
              type="text"
              class="inputTextClass textFontClass"
            >{{policy_holderData.name}}</em>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">身份证号码</em>
            <em
              v-bind:style="{width:inputWidth}"
              type="text"
              class="inputTextClass textFontClass"
            >{{policy_holderData.idcard}}</em>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">手机号码</em>
            <em
              v-bind:style="{width:inputWidth}"
              type="text"
              class="inputTextClass textFontClass"
            >{{policy_holderData.phone}}</em>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">车辆SN码</em>
            <em
              v-bind:style="{width:inputWidth}"
              type="text"
              class="inputTextClass textFontClass"
            >{{policy_holderData.prechar2}}</em>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">电机号</em>
            <em
              v-bind:style="{width:inputWidth}"
              type="text"
              class="inputTextClass textFontClass"
            >{{policy_holderData.makeFactory}}</em>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">车架号</em>
            <em
              v-bind:style="{width:inputWidth}"
              type="text"
              class="inputTextClass textFontClass"
            >{{policy_holderData.fuelName}}</em>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">地址</em>
            <em
              v-bind:style="{width:inputWidth}"
              type="text"
              class="inputTextClass textFontClass"
            >{{policy_holderData.address}}</em>
            <div class="holderLineClass"></div>
          </div>
        </li>
        <li>
          <div class="holderULlidiv">
            <em class="inputTitleClass textFontClass">邮箱</em>
            <em
              v-bind:style="{width:inputWidth}"
              type="text"
              class="inputTextClass textFontClass"
            >{{policy_holderData.email}}</em>
            <div class="holderLineClass"></div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "policyholder",
  data() {
    return {
      headerImgHeight: (screen.width * 110) / 375 + "px",
      inputWidth: screen.width - 130 + "px",
      policy_holderData:null,
      userToken: ""
    };
  },
  methods: {
    fetchPolicyHolderData: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getInsurancePolicyInfo,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            vueThis.policy_holderData = data.result;
          } else {
            var messageStr = data.msg;
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + messageStr;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    }
  },
  mounted: function() {
    //先获取用户信息
    var vueThis = this;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    if (isAndroid) {
      vueThis.$bridge.callAndriodHandler("getEhdUserInfo", "", responseData => {
        // 处理返回数据
        var dataObj = JSON.parse(responseData);
        if (dataObj && dataObj.token) {
          vueThis.userToken = "bearer " + dataObj.token;
          vueThis.fetchPolicyHolderData();
        }
      });
    } else {
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
          // 处理返回数据
          vueThis.userToken = "bearer " + responseData.token;
          vueThis.fetchPolicyHolderData();
        });
      }
    }
  }
};
</script>

<style>
@import "../css/general.css";

.mainBK {
  width: 100%;
  height: 100%;
  background-color: #fbfbfb;
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
}

.holderLineClass {
  left: 20px;
  right: 20px;
  top: 49px;
  height: 1px;
  position: absolute;
  background-color: #e5e5e5;
}
</style>
