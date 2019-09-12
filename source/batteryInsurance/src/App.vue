<template>
  <div id="app">
    <router-view v-if="userToken.length>0" />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userToken: ""
    };
  },
  mounted() {
    var u = navigator.userAgent;
    //userAgent中没有token字段使用jsbridge获取
    if (u.indexOf("token=") == -1) {
      this.getEhdUserInfoFromBridge();
    } else {
      var token = u.substr(u.indexOf("token=") + 6, u.length);
      token = token.substr(0, token.indexOf("&"));
      this.userToken = "bearer " + token;
      this.$store.commit("setUserToken", this.userToken);
      this.getUserInsuranceInfo();
      this.getUserInsuranceOrder();
    }
  },
  methods: {
    formatDateToYYYYMMDD: function(oDate) {
      return (
        oDate.getFullYear() +
        "." +
        (oDate.getMonth() + 1) +
        "." +
        oDate.getDate()
      );
    },
    getUserInsuranceInfo: function() {
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
            var num = data.result.num;
            vueThis.$store.commit("setUserName", data.result.name);
            vueThis.$store.commit("setInsuranceCosts", data.result.insurance);
            vueThis.$store.commit("setBatteryNum", num);
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
    getUserInsuranceOrder: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getUserInsuranceOrder,
          headers: {
            Authorization: vueThis.$store.state.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            var insuranceOrder = data.result[0];
            vueThis.startDateText = vueThis.formatDateToYYYYMMDD(
              new Date(insuranceOrder.startDate)
            );
            vueThis.endDateText = vueThis.formatDateToYYYYMMDD(
              new Date(insuranceOrder.endDate)
            );
            vueThis.$store.commit("setInsuranceOrder", insuranceOrder);
          } else if (data.code == 640) {
            vueThis.status = 0;
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
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    },
    getEhdUserInfoFromBridge: function() {
      var vueThis = this;
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        vueThis.$bridge.callAndriodHandler(
          "getEhdUserInfo",
          "",
          responseData => {
            // 处理返回数据
            var dataObj = JSON.parse(responseData);
            if (dataObj && dataObj.token) {
              vueThis.userToken = "bearer " + dataObj.token;
              vueThis.$store.commit("setUserToken", vueThis.userToken);
              vueThis.getUserInsuranceInfo();
              vueThis.getUserInsuranceOrder();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.$store.commit("setUserToken", vueThis.userToken);
            vueThis.getUserInsuranceInfo();
            vueThis.getUserInsuranceOrder();
          });
        }
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
