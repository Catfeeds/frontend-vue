<template>
  <div class="pageContent">
    <div class="headerDiv">
      <img src="../assets/header.png" />
      <div class="headerUserAvatar">
        <img :src="userAvatarImgSrc" />
      </div>
      <div class="headerPromptImgDiv" @click="promptAction">
        <img src="../assets/prompt.png" />
      </div>
      <p class="headerUserName">{{userName}}</p>
      <p class="headerJoinRemark">
        <span class="speedTitleFont">这是我使用e换电的</span>
        <span class="speedFont">{{joinDuration}}</span>
        <span class="speedTitleFont">天</span>
      </p>
    </div>
    <div class="speedDiv" v-if="speed>0">
      <span class="speedTitleFont">您最近一次骑行平均速度：</span>
      <span class="speedFont">{{speed}}km/h，</span>
      <span class="speedTitleFont">{{speedText}}</span>
    </div>
    <div class="sectionHeaderDiv">
      <div
        @click="sectionChanged(1)"
        v-bind:class="[selectIndex==1?sectionSelectClass:sectionNormalClass]"
      >减少铅酸污染</div>
      <div
        @click="sectionChanged(2)"
        v-bind:class="[selectIndex==2?sectionSelectClass:sectionNormalClass, centerMarginClass]"
      >骑行公里数</div>
      <div
        @click="sectionChanged(3)"
        v-bind:class="[selectIndex==3?sectionSelectClass:sectionNormalClass]"
      >骑行时长</div>
    </div>
    <div v-if="ownerRidingData" class="ownerDiv">
      <div ref="owner" class="LeaderBoardDataDiv">
        <p class="rankText leaderBoardTextFont leaderBoardTextColor">{{ownerRidingData.rank}}</p>
        <p
          class="leaderBoardContent leaderBoardTextFont leaderBoardTextColor"
        >{{ownerRidingData.uname}}</p>
        <p
          class="leaderBoardShowText leaderBoardTextFont leaderBoarderOwnerTextColor"
        >{{ownerRidingData.rankVal}}</p>
      </div>
    </div>
    <div v-if="ownerRidingData" class="lineDiv"></div>
    <div class="LeaderBoardDiv">
      <div v-if="leaderBoardData.length>0">
        <div v-for="item in leaderBoardData" :key="item.rank" class="LeaderBoardDataDiv">
          <div v-if="item.rank<=3" class="rankImgDiv">
            <img :src="item.imgSrc" />
          </div>
          <p
            v-if="item.rank>3"
            class="rankText leaderBoardTextFont leaderBoardTextColor"
          >{{item.rank}}</p>
          <p class="leaderBoardContent leaderBoardTextFont leaderBoardTextColor">{{item.uname}}</p>
          <p class="leaderBoardShowText leaderBoardTextFont leaderBoardTextColor">{{item.rankVal}}</p>
        </div>
      </div>
      <div v-if="leaderBoardData.length==0&&loadCompleted">
        <div class="leaderBoardEmptyIconDiv">
          <img src="../assets/data_empty.png" />
        </div>
        <p class="leaderBoardEmptyText">当前没有数据哦</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabLeaderboard",
  props: {
    type: Number,
    userName: String,
    userAvatar: String,
    speed: Number,
    joinDuration: Number,
    userToken: String,
    uid: String
  },
  data() {
    return {
      selectIndex: 1,
      speedText: "",
      userAvatarImgSrc: "",
      sectionSelectClass:
        "section_header section_select section_font section_select_color",
      sectionNormalClass:
        "section_header section_normal section_font section_normal_color",
      centerMarginClass: "center_margin",
      ownerRidingData: null,
      leaderBoardData: [],
      loadCompleted: false,
      //缓存请求的数据，让每种类型只请求一次
      pollutionReduceData: [],
      drivenDistanceData: [],
      drivenHoursData: [],
      ownerPollutionReduceData: null,
      ownerDivenDistanceData: null,
      ownerDivennHoursData: null
    };
  },
  watch: {
    speed: function(val) {
      this.updateSpeedText(val);
    },
    userAvatar: function(val) {
      this.updateUserAvatarImgSrc(val);
    },
    // uid: function(val){
    //   this.fetchUserRankData();
    // },
    userToken: function() {
      var vueThis = this;
      vueThis.$nextTick(vueThis.fetchUserRankData());
    }
  },
  methods: {
    promptAction: function() {
      this.$dialog.setDefaultOptions({
        messageAlign: "left",
        confirmButtonText: "知道了",
        confirmButtonColor: "#FC9153"
      });
      this.$dialog
        .alert({
          title: "  ",
          message:
            "1、骑行排行为在当前城市e换电骑行用户排行；<br> 2、骑行统计不含当日骑行数据；<br> 3、骑行统计数据可能有所偏差，具体以页面显示为准；<br> 4、骑行排行统计最终解释权归深圳易马达科技有限公司所有"
        })
        .then(() => {
          // on close
        });
    },
    sectionChanged: function(idx) {
      if (this.selectIndex != idx) {
        this.leaderBoardData = [];
        this.ownerRidingData = null;
      }
      this.selectIndex = idx;
      this.leaderBoardData = this.getCacheLeaderBoardData(idx);
      this.ownerRidingData = this.getCaheOwnerRidingData(idx);
      if (this.leaderBoardData.length == 0) {
        this.fetchUserRankData();
      }
    },
    getCacheLeaderBoardData: function(idx) {
      if (idx == 1) {
        return this.pollutionReduceData;
      } else if (idx == 2) {
        return this.drivenDistanceData;
      } else if (idx == 3) {
        return this.drivenHoursData;
      }
    },
    getCaheOwnerRidingData: function(idx) {
      if (idx == 1) {
        return this.ownerPollutionReduceData;
      } else if (idx == 2) {
        return this.ownerDivenDistanceData;
      } else if (idx == 3) {
        return this.ownerDivennHoursData;
      }
    },
    updateSpeedText: function(val) {
      if (val <= 0) {
        this.speedText = "";
      } else if (val <= 20) {
        this.speedText = "时速缓慢，是不是沿途欣赏风景去啦~";
      } else if (val <= 50) {
        this.speedText = "时速正常，棒棒哒~";
      } else {
        this.speedText = "时速偏快，请注意控制~";
      }
    },
    updateUserAvatarImgSrc: function(val) {
      if (val.length === 0) {
        this.userAvatarImgSrc = require("../assets/um_default_avatar.png");
      } else {
        this.userAvatarImgSrc = val;
      }
    },
    updateUserRankVal: function(item, rankType) {
      if (!item.uphone && !item.uname) {
        item.uname = "-";
      } else if (!item.uname) {
        item.uname =
          item.uphone.substr(0, 3) +
          "****" +
          item.uphone.substr(7, item.uphone.length);
      }
      if (item.rank == 1) {
        item.imgSrc = require("../assets/first.png");
      } else if (item.rank == 2) {
        item.imgSrc = require("../assets/second.png");
      } else if (item.rank == 3) {
        item.imgSrc = require("../assets/third.png");
      }

      if (rankType == 1) {
        if (item.rankVal > 1000) {
          item.rankVal = (item.rankVal / 1000).toFixed(2) + "kg";
        } else {
          item.rankVal = item.rankVal.toFixed(2) + "g";
        }
      } else if (rankType == 2) {
        item.rankVal = (item.rankVal / 1000).toFixed(2) + "km";
      } else if (rankType == 3) {
        var hours = parseInt(item.rankVal / 3600);
        var min = parseInt((item.rankVal % 3600) / 60);
        item.rankVal = hours + "小时";
        if (min > 0) {
          item.rankVal += min + "分钟";
        }
      }
      return item;
    },
    fetchUserRankData: function() {
      var vueThis = this;
      if (vueThis.userToken.length == 0) {
        return;
      }
      //获取本地缓存中排行榜数据
      var rankType = vueThis.selectIndex;
      vueThis.loadCompleted = false;
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.getUserRankData,
          data: {
            rankType: rankType,
            timeType: vueThis.type
          },
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.code == 0) {
            var dataList = result.data;
            var leaderBoardData = result.data.slice(0, result.data.length); 
            //判断最后一条是不是自己的数据
            var lastRidingData = result.data[result.data.length - 1];
            var ownerRidingData = null;
            if (lastRidingData.uid == vueThis.uid) {
              ownerRidingData = vueThis.updateUserRankVal(
                result.data[result.data.length - 1], rankType
              );
              leaderBoardData = result.data.slice(0, result.data.length - 1); 
            }
            leaderBoardData.forEach(element => {
              element = vueThis.updateUserRankVal(element, rankType);
            });
            if(rankType == vueThis.selectIndex){
              vueThis.leaderBoardData = leaderBoardData;
              vueThis.ownerRidingData = ownerRidingData;
            }
            if (rankType == 1) {
              vueThis.pollutionReduceData = leaderBoardData;
              vueThis.ownerPollutionReduceData = ownerRidingData;
            } else if (rankType == 2) {
              vueThis.drivenDistanceData = leaderBoardData;
              vueThis.ownerDivenDistanceData = ownerRidingData;
            } else if (rankType == 3) {
              vueThis.drivenHoursData = leaderBoardData;
              vueThis.ownerDivennHoursData = ownerRidingData;
            }
          } else if (result.code == -2) {
            //无数据
          } else {
            // window.location.href =
            //   "IMMOTOR://showPrompt?code=0&message=" + result.msg;
          }
          vueThis.loadCompleted = true;
        })
        .catch(resp => {
          vueThis.loadCompleted = true;
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    }
  },
  mounted() {
    this.fetchUserRankData();
    this.updateSpeedText(this.speed);
    this.updateUserAvatarImgSrc(this.userAvatar);
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
  background: #66c990;
}

.headerDiv {
  margin-top: 8px;
  height: 205px;
  z-index: 1;
  position: relative;
}

.headerUserAvatar {
  left: 23px;
  top: 32px;
  width: 54px;
  height: 54px;
  position: absolute;
  border-radius: 27px;
  overflow: hidden;
}

.headerPromptImgDiv {
  right: 11px;
  top: 11px;
  width: 24px;
  height: 24px;
  position: absolute;
  border-radius: 50%;
}

.headerUserName {
  left: 87px;
  right: 20px;
  top: 37px;
  height: 22px;
  position: absolute;
  text-align: left;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
}

.headerJoinRemark {
  left: 87px;
  right: 20px;
  top: 61px;
  height: 20px;
  position: absolute;
  text-align: left;
  line-height: 20px;
}

.speedDiv {
  height: 55px;
  margin-top: -38px;
  margin-left: 10px;
  margin-right: 10px;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 1px 0px 0px rgba(234, 234, 234, 0.5);
  border-radius: 8px;
  padding: 10px 20px;
  z-index: 2;
  position: relative;
  text-align: left;
}

.speedTitleFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.speedFont {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.sectionHeaderDiv {
  height: 44px;
  margin: 10px 0px 10px 10px;
  margin-bottom: 0px;
  display: flex;
}

.section_select {
  background: rgba(255, 255, 255, 1);
}

.section_normal {
  background: rgba(61, 184, 114, 1);
}

.section_font {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  line-height: 20px;
}

.section_select_color {
  color: rgba(63, 171, 109, 1);
}

.section_normal_color {
  color: rgba(255, 255, 255, 1);
}

.center_margin {
  margin-left: 10px;
  margin-right: 9px;
}

.section_header {
  width: 112px;
  height: 44px;
  border-radius: 8px 8px 0px 0px;
  line-height: 44px;
}

.LeaderBoardDataDiv {
  height: 55px;
  margin-top: 0px;
  background: rgba(255, 255, 255, 1);
  display: flex;
  position: relative;
}

.lineDiv {
  height: 10px;
  margin: 0 10px;
  background: #f8f8f8;
}

.ownerDiv {
  margin: 0 10px;
  background: white;
}

.LeaderBoardDiv {
  margin: 0 10px;
  background: white;
  padding: 1px;
  min-height: 500px;
  padding-bottom: 80px;
  box-shadow: 0px 1px 0px 0px rgba(234, 234, 234, 0.5);
}

.rankImgDiv {
  width: 20px;
  height: 30px;
  margin-left: 20px;
  margin-right: 13px;
  margin-top: 14px;
}

.rankText {
  width: 43px;
  height: 55px;
  margin-left: 10px;
  line-height: 55px;
}

.leaderBoardContent {
  width: 160px;
  height: 55px;
  margin-left: 10px;
  line-height: 55px;
  text-align: left;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}

.leaderBoardShowText {
  width: 100px;
  margin: auto;
  margin-right: 20px;
  height: 55px;
  line-height: 55px;
  text-align: right;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}

.leaderBoardTextFont {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
}

.leaderBoardTextColor {
  color: rgba(72, 72, 72, 1);
}

.leaderBoarderOwnerTextColor {
  color: rgba(237, 113, 66, 1);
}

.leaderBoardEmptyIconDiv {
  width: 100px;
  height: 100px;
  margin: auto;
  margin-top: 104px;
}

.leaderBoardEmptyText {
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(165, 165, 165, 1);
  line-height: 20px;
}
</style>
