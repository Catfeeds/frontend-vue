<template>
  <div>
    <div v-if="!shareRidingData" class="mainBody">
      <div v-if="hasUserRank">
        <van-tabs
          v-model="selectTab"
          :swipeable="true"
          :border="false"
          :swipe-threshold="6"
          :line-height="2"
          color="#FF8D59"
          title-active-color="#333"
          title-inactive-color="#999"
        >
          <van-tab v-for="item in tabs" :title="item.title" :key="item.type">
            <TabLeaderboard
              :type="item.type"
              :userName="userName"
              :userAvatar="userAvatar"
              :speed="recentlySpeed"
              :joinDuration="joinDuration"
              :userToken="userToken"
              :uid="uid"
            />
          </van-tab>
        </van-tabs>
        <div class="bottomDiv">
          <div class="showOffBtn" @click="shareAction">炫耀一下</div>
        </div>
      </div>
      <div v-else>
        <div class="emptyIconDiv">
          <img src="../assets/data_empty.png" />
        </div>
        <p class="emptyText">暂无排行数据，请联系代理商加入群组。</p>
      </div>
    </div>
    <RidingShare
      v-else
      :type="selectTab+1"
      :userName="userName"
      :userAvatar="userAvatar"
      :joinDuration="joinDuration"
      :userToken="userToken"
    ></RidingShare>
  </div>
</template>

<script>
import TabLeaderboard from "./TabLeaderboard";
import RidingShare from "./RidingShare";

export default {
  name: "RidingLeaderboard",
  components: {
    TabLeaderboard,
    RidingShare
  },
  data() {
    return {
      selectTab: 0,
      userName: "",
      userAvatar: "",
      userToken: "",
      uid:'',
      recentlySpeed: 0,
      userSpeedText: "",
      joinDuration: 0,
      shareRidingData: false,
      hasUserRank: true,
      tabs: [
        {
          title: "昨日",
          type: 1
        },
        {
          title: "本周",
          type: 2
        },
        {
          title: "本月",
          type: 3
        },
        {
          title: "本年",
          type: 4
        },
        {
          title: "历史",
          type: 5
        }
      ]
    };
  },
  methods: {
    shareAction: function() {
      this.shareRidingData = true;
    },
    fetchHasUserRank: function(){
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.isHaveUserRank,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.code == 0) {
            vueThis.hasUserRank = result.data==1 ? true: false;
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
    fetchLastAvgDriveSpeed: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getLastAvgDriveSpeed,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.code == 0) {
            vueThis.recentlySpeed = window.Number(result.data.toFixed(2));
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
            vueThis.joinDuration = userData.useDays;
            if (userData.avatar) {
              vueThis.userAvatar = userData.avatar;
            }
            if (userData.name) {
              vueThis.userName = userData.name;
            } else {
              vueThis.userName =
                userData.phone.substr(0, 3) +
                "****" +
                userData.phone.substr(7, userData.phone.length);
            }
            vueThis.uid = userData.uid + '';
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
              vueThis.fetchHasUserRank();
              vueThis.fetchUserData();
              vueThis.fetchLastAvgDriveSpeed();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.fetchHasUserRank();
            vueThis.fetchUserData();
            vueThis.fetchLastAvgDriveSpeed();
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
  },
  mounted() {
    var token = this.getUrlParam("token");
    if (token && token.length > 0) {
      this.userToken = "bearer " + token;
    }
    //如果在参数中没有token,从userAgent中获取
    else {
      var u = navigator.userAgent;
      //userAgent中没有token字段使用jsbridge获取
      if (u.indexOf("token=") != -1) {
        token = u.substr(u.indexOf("token=") + 6, u.length);
        token = token.substr(0, token.indexOf("&"));
        this.userToken = "bearer " + token;
      }
    }
    if (this.userToken.length > 0) {
      this.fetchHasUserRank();
      this.fetchUserData();
      this.fetchLastAvgDriveSpeed();
    } else {
      this.getEhdUserInfoFromBridge();
    }
    //
    var share = this.getUrlParam("share");
    if(share){
      this.shareRidingData = true;
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

.mainBody {
  z-index: 1;
}

.bottomDiv {
  width: 100%;
  height: 80px;
  bottom: 0;
  left: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  position: fixed;
  z-index: 99;
}
.showOffBtn {
  margin-top: 13px;
  margin-left: 20px;
  margin-right: 20px;
  height: 44px;
  background: rgba(51, 51, 51, 1);
  border-radius: 4px;
  font-size: 13px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
}
.emptyIconDiv {
  width: 100px;
  height: 100px;
  margin: auto;
  margin-top: 200px;
}
.emptyText {
  margin: 20px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(165, 165, 165, 1);
  line-height: 20px;
}
</style>
