<template>
  <div>
    <div class="mainBody">
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
            <TabLeaderboard :type="item.type" :speed="recentlySpeed" />
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
  </div>
</template>

<script>
import TabLeaderboard from "./TabLeaderboard";

export default {
  name: "RidingLeaderboard",
  components: {
    TabLeaderboard
  },
  data() {
    return {
      selectTab: this.$store.state.selectTab,
      userToken: this.$store.state.userToken,
      recentlySpeed: 0,
      userSpeedText: "",
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
  computed: {
    listenUserToken() {
      return this.$store.state.userToken;
    }
  },
  watch: {
    selectTab: function(val) {
      this.$store.commit("setSelectTab", val);
    },
    listenUserToken: function(val) {
      this.userToken = val;
      if(this.userToken.length > 0){
        this.fetchHasUserRank();
        this.fetchLastAvgDriveSpeed();
      }
    }
  },
  methods: {
    shareAction: function() {
      this.$router.push({
        path: "/RidingShare",
        query: {
          type: this.selectTab + 1
        }
      });
    },
    fetchHasUserRank: function() {
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
            vueThis.hasUserRank = result.data == 1 ? true : false;
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
    }
  },
  mounted() {
    if (this.userToken.length > 0) {
      this.fetchHasUserRank();
      this.fetchLastAvgDriveSpeed();
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
