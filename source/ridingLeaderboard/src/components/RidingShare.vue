<template>
  <div>
    <div class="share_pageConent" ref="page">
      <div class="shareHeaderDiv">
        <img src="../assets/shareHeader.png" />
        <div class="header_titleBK">
          <img src="../assets/share_titleBK.png" />
          <p class="header_title">我的骑行{{headerTypeText}}</p>
        </div>
        <div class="header_userAvatar">
          <img :src="userAvatarImgSrc" />
        </div>
        <p class="header_userName">{{userName}}</p>
        <p class="header_remark">这是我使用e换电的 {{joinDuration}}天</p>
      </div>
      <div class="section_header firstMarginTop">
        <p class="section_title">{{sectionTypeText}}总减少铅酸污染</p>
        <p v-bind:class="ridingDataClass">{{pollutionReduceAmountText}}</p>
        <p class="section_remark">{{pollutionReduceAmountRankText}}</p>
      </div>
      <div class="barChartDiv" v-if="pollutionReduceAmountChartXData.length>0">
        <barChart :xData="pollutionReduceAmountChartXData" :yData="pollutionReduceAmountChartYData"></barChart>
      </div>
      <div class="section_header">
        <p class="section_title">{{sectionTypeText}}总骑行公里</p>
        <p v-bind:class="ridingDataClass">{{drivenDistanceText}}</p>
        <p class="section_remark">{{drivenDistanceRankText}}</p>
      </div>
      <div class="barChartDiv" v-if="drivenDistanceChartXData.length>0">
        <barChart :xData="drivenDistanceChartXData" :yData="drivenDistanceChartYData"></barChart>
      </div>
      <div class="section_header">
        <p class="section_title">{{sectionTypeText}}总骑行时长</p>
        <p v-bind:class="ridingDataClass">{{drivenHoursText}}</p>
        <p class="section_remark">{{drivenHoursRankText}}</p>
      </div>
      <div class="barChartDiv" v-if="drivenHoursChartXData.length>0">
        <barChart :xData="drivenHoursChartXData" :yData="drivenHoursChartYData"></barChart>
      </div>
      <div class="qrCodeDiv">
        <img src="../assets/QRCode.png" />
      </div>
      <div class="shareLogoDiv">
        <img src="../assets/share_logo.png" />
      </div>
      <p class="bottomRemark1 bottomRemarkFont">加入e换电，一起来挑战</p>
      <p class="bottomRemark2 bottomRemarkFont">长按识别二维码下载e换电APP</p>
    </div>
    <div v-if="showShareBtn" @click="shareAction" class="shareBtn">分享</div>
  </div>
</template>

<script>
const barChart = () => import("./eEchart/barChart.vue");
export default {
  name: "RidingShare",
  props: {
    type: Number,
    userName: String,
    userAvatar: String,
    joinDuration: Number,
    userToken: String
  },
  components: {
    barChart
  },
  data() {
    return {
      userAvatarImgSrc: "",
      headerTypeText: "",
      sectionTypeText: "",
      cityName: "",
      shareTimeType: 0,
      drivenDistanceText: "",
      drivenDistanceRankText: "",
      drivenHoursText: "",
      drivenHoursRankText: "",
      ridingDataClass: "section_ridingData",
      pollutionReduceAmountText: "",
      pollutionReduceAmountRankText: "",
      drivenDistanceChartXData: [],
      drivenDistanceChartYData: [],
      drivenHoursChartXData: [],
      drivenHoursChartYData: [],
      pollutionReduceAmountChartXData: [],
      pollutionReduceAmountChartYData: [],
      showShareBtn: false
    };
  },
  watch: {
    type: function(val) {
      if (!this.this.shareTimeType) {
        this.updateTypeText(val);
      }
    },
    userAvatar: function(val) {
      this.updateUserAvatarImgSrc(val);
    },
    userToken: function() {
      var vueThis = this;
      vueThis.$nextTick(vueThis.fetchData());
    }
  },
  methods: {
    updateTypeText: function(val) {
      switch (val) {
        case 1:
          this.headerTypeText = "日报";
          this.sectionTypeText = "昨日";
          break;
        case 2:
          this.headerTypeText = "周报";
          this.sectionTypeText = "本周";
          break;
        case 3:
          this.headerTypeText = "月报";
          this.sectionTypeText = "本月";
          break;
        case 4:
          this.headerTypeText = "年报";
          this.sectionTypeText = "本年";
          break;
        case 5:
          this.headerTypeText = "生涯";
          this.sectionTypeText = "历史";
          break;
        default:
          break;
      }
    },
    updateUserAvatarImgSrc: function(val) {
      if (val.length === 0) {
        this.userAvatarImgSrc = require("../assets/um_default_avatar.png");
      } else {
        this.userAvatarImgSrc = val;
      }
    },
    shareAction: function() {
      var param =
        "&share=1&type=" +
        (this.shareTimeType ? this.shareTimeType : this.type);
      if (window.location.href.indexOf("?") == -1) {
        param =
          "?share=1&type=" +
          (this.shareTimeType ? this.shareTimeType : this.type);
      }
      param = encodeURIComponent(param);
      var shareUrl = window.location.href + param;
      window.location.href =
        "IMMOTOR://sharePageScreenshots?" +
        "left=" +
        parseInt(this.$refs.page.offsetLeft) +
        "&top=" +
        parseInt(this.$refs.page.offsetTop) +
        "&width=" +
        parseInt(this.$refs.page.getBoundingClientRect().width) +
        "&height=" +
        parseInt(this.$refs.page.getBoundingClientRect().height) +
        "&title=我的排行" +
        "&shareurl=" +
        shareUrl;
    },
    getRankText: function(rankItem) {
      if (!rankItem) {
        return "";
      }
      if (rankItem.percent * 100 > 20) {
        return "您的骑行为您带来方便且环保，继续加油哦！";
      } else {
        return (
          this.cityName +
          "排名第" +
          rankItem.rank +
          "位超过" +
          (100 - rankItem.percent * 100) +
          "%用户"
        );
      }
    },
    setupChartData: function(array, xData, yData) {
      var vueThis = this;
      var type = vueThis.shareTimeType ? vueThis.shareTimeType : vueThis.type;
      array.forEach(element => {
        var x = "";
        if (type < 4) {
          x = element.x.substr(4, 2) + "/" + element.x.substr(6, 2);
        } else if (type < 5) {
          x = parseInt(element.x.substr(4, 2)) + "月";
        } else {
          x = element.x.substr(0, 4) + "年";
        }
        xData.push(x);
        yData.push(parseInt(element.y));
      });
    },
    fetchData: function() {
      var vueThis = this;
      if (vueThis.userToken.length == 0) {
        return;
      }
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.getUserShareData,
          data: {
            timeType: vueThis.shareTimeType
              ? vueThis.shareTimeType
              : vueThis.type
          },
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.code == 0) {
            vueThis.cityName = result.data.cityName;
            var pollutionReduceAmount = result.data.pollutionReduceAmount;
            if (pollutionReduceAmount > 0) {
              vueThis.pollutionReduceAmountText =
                pollutionReduceAmount > 1000
                  ? (pollutionReduceAmount / 1000).toFixed(2) + "kg"
                  : pollutionReduceAmount.toFixed(2) + "g";
            }
            var drivenDistance = result.data.drivenDistance;
            if (drivenDistance > 0) {
              vueThis.drivenDistanceText =
                (drivenDistance / 1000).toFixed(2) + "km";
            }
            var drivenHours = result.data.drivenHours;
            if (drivenHours > 0) {
              vueThis.drivenHoursText = parseInt(drivenHours / 3600) + "h";
              var min = parseInt((drivenHours % 3600) / 60);
              if (min > 0) {
                vueThis.drivenHoursText += min + "min";
              }
            }
            vueThis.pollutionReduceAmountRankText = vueThis.getRankText(
              result.data.pollutionReduceRank
            );
            vueThis.drivenDistanceRankText = vueThis.getRankText(
              result.data.drivenDistanceRank
            );
            vueThis.drivenHoursRankText = vueThis.getRankText(
              result.data.drivenHoursRank
            );
            vueThis.setupChartData(
              result.data.drivenMilesChart,
              vueThis.drivenDistanceChartXData,
              vueThis.drivenDistanceChartYData
            );
            vueThis.setupChartData(
              result.data.drivenHoursChart,
              vueThis.drivenHoursChartXData,
              vueThis.drivenHoursChartYData
            );
            vueThis.setupChartData(
              result.data.pollutionChart,
              vueThis.pollutionReduceAmountChartXData,
              vueThis.pollutionReduceAmountChartYData
            );
            vueThis.showShareBtn = true;
          } else if (result.code == -2) {
            //无数据
            vueThis.ridingDataClass = "section_emptyRidingData";
            vueThis.pollutionReduceAmountText =
              "您" + vueThis.sectionTypeText + "没有骑行记录哦，加油";
            var type = vueThis.shareTimeType
              ? vueThis.shareTimeType
              : vueThis.type;
            if (type == 5) {
              vueThis.pollutionReduceAmountText = "您没有骑行记录哦，加油";
            }
            vueThis.drivenDistanceText =
              "您" + vueThis.sectionTypeText + "没有骑行记录哦，加油";
            if (type == 5) {
              vueThis.drivenDistanceText = "您没有骑行记录哦，加油";
            }
            vueThis.drivenHoursText =
              "您" + vueThis.sectionTypeText + "没有骑行记录哦，加油";
            if (type == 5) {
              vueThis.drivenHoursText = "您没有骑行记录哦，加油";
            }
            vueThis.showShareBtn = true;
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
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    }
  },
  mounted() {
    var type = this.getUrlParam("type");
    if (type) {
      this.shareTimeType = parseInt(type);
      this.updateTypeText(this.shareTimeType);
    } else {
      this.updateTypeText(this.type);
    }
    this.fetchData();
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

.share_pageConent {
  margin: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  border: 1px solid rgba(235, 239, 247, 1);
}

.shareHeaderDiv {
  height: 261px;
  margin-bottom: 18px;
  position: relative;
}

.header_titleBK {
  width: 124px;
  height: 30px;
  left: 0;
  top: 20px;
  position: absolute;
}

.header_title {
  width: 100px;
  height: 20px;
  left: 14px;
  top: 6px;
  position: absolute;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  text-align: left;
}

.header_userAvatar {
  width: 54px;
  height: 54px;
  left: 141px;
  top: 30px;
  position: absolute;
  border-radius: 50%;
}

.header_userName {
  left: 0;
  right: 0;
  height: 22px;
  top: 96px;
  position: absolute;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  line-height: 22px;
}

.header_remark {
  left: 0;
  right: 0;
  height: 20px;
  top: 120px;
  position: absolute;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}

.section_header {
  height: 58px;
  position: relative;
}

.section_title {
  left: 16px;
  right: 16px;
  height: 20px;
  top: 0;
  position: absolute;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  text-align: left;
  line-height: 20px;
}

.section_ridingData {
  left: 16px;
  right: 180px;
  height: 37px;
  top: 22px;
  position: absolute;
  font-size: 26px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 37px;
  text-align: left;
}

.section_emptyRidingData {
  left: 16px;
  right: 16px;
  height: 37px;
  top: 22px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
  text-align: left;
}

.section_remark {
  width: 150px;
  height: 34px;
  right: 16px;
  top: 24px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
  text-align: right;
}

.secton_leftImgDiv {
  width: 28px;
  height: 11px;
  margin-left: 50px;
}

.section_title_font {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 22px;
}

.section_title_color {
  color: rgba(51, 51, 51, 1);
}

.section_ridingdata_color {
  color: #ff8d59;
}

.section_remark_font {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.section_rightImgDiv {
  width: 28px;
  height: 11px;
  margin-right: 50px;
}

.barChartDiv {
  margin-top: 0px;
  margin-bottom: 30px;
}

.qrCodeDiv {
  width: 70px;
  height: 70px;
  margin: auto;
}

.shareLogoDiv {
  width: 75px;
  height: 26px;
  margin: auto;
  margin-top: 15px;
}

.bottomRemarkFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.bottomRemark1 {
  margin: auto;
  margin-top: 10px;
  height: 17px;
  line-height: 17px;
}
.bottomRemark2 {
  margin: auto;
  margin-bottom: 40px;
  height: 17px;
  line-height: 17px;
}

.shareBtn {
  margin: 20px;
  margin-bottom: 30px;
  height: 44px;
  background: rgba(51, 51, 51, 1);
  border-radius: 4px;
  font-size: 13px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
}
</style>
