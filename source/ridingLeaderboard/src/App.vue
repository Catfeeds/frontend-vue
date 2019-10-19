<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
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
      this.fetchUserData();
    }
  },
  methods: {
    fetchUserData: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getUserJionDays,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.code == 0) {
            var userData = result.data;
            var joinDuration = userData.useDays;
            var userAvatar = '';
            if (userData.avatar && userData.avatar.length > 0) {
              if (userData.avatar.indexOf("http:") == 0) {
                userAvatar =
                  "https" + userData.avatar.substr(4, userData.avatar.length);
              } else {
                userAvatar = userData.avatar;
              }
            }
            var userName = userData.name ? userData.name : ( userData.phone.substr(0, 3) +
                "****" +
                userData.phone.substr(7, userData.phone.length))
            var uid = userData.uid + "";

            vueThis.$store.commit("setUserJoinDuration", joinDuration);
            vueThis.$store.commit("setUserAvatar", userAvatar);
            vueThis.$store.commit("setUserName", userName);
            vueThis.$store.commit("setUid", uid);
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + result.msg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
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
              vueThis.fetchUserData();
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
            vueThis.fetchUserData();
          });
        }
      }
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    }
  }
};
</script>

<style>
@import "../static/general.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
