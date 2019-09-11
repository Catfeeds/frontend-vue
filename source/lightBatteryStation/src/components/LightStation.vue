<template>
  <div class="pageContent">
    <div class="header">
      <div class="headBK">
        <img src="../assets/headerBK.png" />
      </div>
      <div class="headerMyLight" v-if="myRankData">
        <p class="myLightedTitle">
          <span class="lightTitleFont">已点亮</span>
          <span class="lightNumFont">{{myRankData.lightCount}}台</span>
          <span class="lightTitleFont">换电柜</span>
        </p>
        <div class="stepTextDiv">
          <p class="stepText activeTextColor">0</p>
          <div class="stepTextFlex" v-for="(item, idx) in myRankData.rewardIntervalList" :key="idx">
            <p
              class="stepText right rightMargin"
              v-bind:class="[activeIndex>idx?'activeTextColor':'normalTextColor']"
            >{{item}}</p>
          </div>
        </div>
        <div class="step">
          <div class="step_circle active leftMargin"></div>
          <div class="stepBodyFlex" v-for="(item, idx) in myRankData.rewardCouponList" :key="idx">
            <div class="step_line" v-bind:class="[activeIndex>idx?'active':'normal']"></div>
            <div class="step_circle" v-bind:class="[activeIndex>idx?'active':'normal']"></div>
          </div>
        </div>
        <div class="stepIconDiv">
          <div class="stepIcon leftMargin"></div>
          <div class="stepIconFlex" v-for="(item, idx) in couponSrcList" :key="idx">
            <div class="stepIcon right rightMargin">
              <img :src="item" />
            </div>
          </div>
        </div>
        <p class="couponPrompt">优惠券于活动结束后，统一发放</p>
      </div>
      <p class="rules" @click="rulesAction">规则</p>
      <p class="headerTitle">点亮换电柜，赢优惠券&10天免费换电</p>
      <p class="headerTime">活动时间：2019.10.01-2019.10.07</p>
    </div>
    <div class="content">
      <div class="mapParent">
        <div id="mapContainer" class="mapDiv"></div>
        <div class="locationBtn" @click="locationAction">
          <img src="../assets/location.png">
        </div>
      </div>
      <div class="sectionDiv">
        <div class="sectionBK">
          <img src="../assets/rankTitleBK.png" />
        </div>
        <p class="rankSectionTitle">点亮排行</p>
      </div>
      <div class="tableDiv">
        <div class="tableHeader">
          <span class="header_rank tableFont headerTextColor">排名</span>
          <span class="header_user tableFont headerTextColor">用户</span>
          <span class="header_num tableFont headerTextColor">点亮数量</span>
        </div>
        <div class="tableContent">
          <div v-if="myRankData">
            <div class="contentItem ownerBKColor">
              <p class="contentItemRank">{{myRankData.myRanking}}</p>
              <p class="contentItemName">{{myRankData.nickName}}</p>
              <p class="contentItemNum">{{myRankData.lightCount}}</p>
            </div>
            <div class="contentLine"></div>
          </div>
          <div v-for="(item, index) in rankList" :key="index">
            <div class="contentItem">
              <p class="contentItemRank">{{index+1}}</p>
              <p
                class="contentItemName"
              >{{item.nickName.length==0? (item.phone.substr(0, 3) + "****" + item.phone.substr(7, item.phone.length)) : item.nickName}}</p>
              <p class="contentItemNum">{{item.lightCount}}</p>
            </div>
            <div class="contentLine"></div>
          </div>
        </div>
      </div>
      <div class="bottomDiv">
        <p class="bottomPrompt">
          本活动最终解释权在法律允许范围内归e换电官方所有
          如有疑问，请致电官方客服 0755-27787220
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import MapLoader from "../lib/AMap.js";

export default {
  name: "LightStation",
  data() {
    return {
      userToken: "",
      map: null,
      cityCode: 0,
      lat: 0,
      lon: 0,
      isMapInit: false,
      stationList: [],
      activityId: "",
      rankList: [],
      myRankData: null,
      lightStationList: [],
      activeIndex: 0,
      couponSrcList: [],
      stationTimer: null
    };
  },
  mounted() {
    this.activityId = this.getUrlParam("lotteryID");
    var u = navigator.userAgent;
    //userAgent中没有token字段使用jsbridge获取
    if (u.indexOf("token=") > 0) {
      var token = u.substr(u.indexOf("token=") + 6, u.length);
      token = token.substr(0, token.indexOf("&"));
      this.userToken = "bearer " + token;
    }
    this.getEhdUserInfoFromBridge();
    if (this.userToken.length > 0) {
      this.getLightRankList();
      this.getLightedBatteryStationList();
      this.getMyRankData();
    }
    var that = this;
    this.stationTimer = setInterval(() => {
      that.getEhdUserInfoFromBridge();
    }, 5000);
  },
  beforeDestroy () {
    if(this.stationTimer){
      clearInterval(this.stationTimer);
      this.stationTimer = null;
    }
  },
  methods: {
    rulesAction: function(){
      if(this.myRankData && this.myRankData.ruleUrl){
        window.location.href = this.myRankData.ruleUrl;
      }
    },
    locationAction: function(){
      this.map.setCenter([this.lon, this.lat]);
    },
    setupMapMarkers: function() {
      var vueThis = this;
      vueThis.map.clearMap();
      var ligthedIcon = new AMap.Icon({
        size: new AMap.Size(28.5, 34),
        image: "/static/lighted.png",
        imageSize: new AMap.Size(28.5, 34)
      });
      var disableIcon = new AMap.Icon({
        size: new AMap.Size(28.5, 34),
        image: "/static/disable.png",
        imageSize: new AMap.Size(28.5, 34)
      });
      var userLocation = new AMap.LngLat(vueThis.lon, vueThis.lat);

      vueThis.stationList.forEach(element => {
        if (vueThis.isLightedBatteryStation(element)) {
          var marker = new AMap.Marker({
            icon: ligthedIcon,
            position: [element.longitude, element.latitude],
            offset: new AMap.Pixel(-14.25, -34)
          });
          vueThis.map.add(marker);
        } else {
          var stationLocation = new AMap.LngLat(
            element.longitude,
            element.latitude
          );
          var distance = userLocation.distance(stationLocation);
          if (distance > 100) {
            var marker = new AMap.Marker({
              icon: disableIcon,
              position: [element.longitude, element.latitude],
              offset: new AMap.Pixel(-14.25, -34)
            });
            AMap.event.addListener(marker, "click", function(e) {
              window.location.href =
                "IMMOTOR://showPrompt?code=0&message=请到换电柜旁点亮哦";
            });
            vueThis.map.add(marker);
          } else {
            var marker = new AMap.Marker({
              icon: "/static/light.gif",
              position: [element.longitude, element.latitude],
              offset: new AMap.Pixel(-55, -66)
            });
            AMap.event.addListener(marker, "click", function(e) {
              vueThis.lightBatteryStation(element);
            });
            vueThis.map.add(marker);
          }
        }
      });
    },
    isLightedBatteryStation: function(item) {
      if (this.lightStationList && this.lightStationList.length > 0) {
        for (let index = 0; index < this.lightStationList.length; index++) {
          const element = this.lightStationList[index];
          if (element.pid == item.pID) {
            return true;
          }
        }
      }
      return false;
    },
    getAroundBatteryStation: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getAroundBatteryStation,
          params: {
            latitude: vueThis.lat,
            longitude: vueThis.lon,
            count: 0,
            radius: 5000,
            cityCode: vueThis.cityCode
          },
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            vueThis.stationList = data.result;
            if (vueThis.isMapInit) {
              vueThis.setupMapMarkers();
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
    lightBatteryStation: function(item) {
      var vueThis = this;
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.lightBatteryStation,
          data: {
            activityId: vueThis.activityId,
            userLon: vueThis.lon,
            userLat: vueThis.lat,
            pid: item.pID,
            pLon: item.longitude,
            pLat: item.latitude
          },
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.getLightRankList();
            vueThis.getMyRankData();
            vueThis.getLightedBatteryStationList();
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getLightRankList: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getLightRankList + vueThis.activityId,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.rankList = data.data;
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getMyRankData: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getMyLightRank,
          params: {
            activityId: vueThis.activityId
          },
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.myRankData = data.data;
            vueThis.couponSrcList = [];
            if (vueThis.myRankData.rewardCouponList) {
              vueThis.myRankData.rewardCouponList.forEach(element => {
                var src = require("../assets/coupon" + element + ".png");
                vueThis.couponSrcList.push(src);
              });
            }
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getLightedBatteryStationList: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getMyLightedStationList + vueThis.activityId,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.lightStationList = data.data;
            if (vueThis.isMapInit) {
              vueThis.setupMapMarkers();
            }
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    mapInit: function() {
      let that = this;
      if (!that.isMapInit) {
                MapLoader().then(
          AMap => {
            that.map = new AMap.Map("mapContainer", {
              resizeEnable: true,
              pitchEnable: true,
              zoom: 16,
              buildingAnimation: true, //楼块出现是否带动画
              zoomEnable: true,
              mapStyle: "amap://styles/d201a1fe6f4142392da452bc848891ab",
              center: [that.lon, that.lat],
              dragEnable: true //是否启动拖拽
            });
            that.isMapInit = true;
            if (that.stationList.length > 0) {
              that.setupMapMarkers();
            }
          },
          e => {
            console.log("地图加载失败", e);
          }
        );
      } 
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
              if (vueThis.userToken.length == 0) {
                vueThis.userToken = "bearer " + dataObj.token;
                vueThis.getLightRankList();
                vueThis.getLightedBatteryStationList();
                vueThis.getMyRankData();
              }
              vueThis.cityCode = dataObj.cityCode;
              vueThis.lat = dataObj.lat;
              vueThis.lon = dataObj.lon;
              vueThis.mapInit();
              vueThis.getAroundBatteryStation();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            if (vueThis.userToken.length == 0) {
              vueThis.userToken = "bearer " + responseData.token;
              vueThis.getLightRankList();
              vueThis.getLightedBatteryStationList();
              vueThis.getMyRankData();
            }
            vueThis.cityCode = responseData.cityCode;
            vueThis.lat = responseData.lat;
            vueThis.lon = responseData.lon;
            vueThis.mapInit();
            vueThis.getAroundBatteryStation();
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  width: 100%;
  height: 100%;
  display: block;
}
.pageContent {
  width: 100%;
}
.header {
  height: 632px;
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(202, 19, 13, 1) 0%,
    rgba(47, 4, 137, 1) 100%
  );
}
.headBK {
  height: 577px;
}
.headerMyLight {
  height: 135px;
  margin-top: -80px;
  padding: 0.1px;
  position: relative;
}
.lightTitleFont {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(158, 149, 255, 1);
}
.lightNumFont {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 128, 49, 1);
}
.myLightedTitle {
  margin-left: 20px;
  margin-right: 20px;
  height: 21px;
  text-align: left;
  line-height: 21px;
}
.stepTextDiv {
  height: 15px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 11px;
  position: relative;
  display: flex;
  flex-direction: row;
}
.stepTextFlex {
  height: 15px;
  flex: 1;
  position: relative;
}
.stepText {
  width: 30px;
  height: 15px;
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  line-height: 15px;
}
.stepSep {
  height: 15px;
}
.normalTextColor {
  color: rgba(158, 149, 255, 0.6);
}
.activeTextColor {
  color: rgba(158, 149, 255, 1);
}
.step {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 7px;
  position: relative;
  display: flex;
  flex-direction: row;
}
.stepIconDiv {
  margin-top: 11px;
  margin-left: 15px;
  margin-right: 15px;
  height: 17px;
  position: relative;
  display: flex;
  flex-direction: row;
}
.stepIcon {
  width: 33px;
  height: 17px;
}
.stepIconFlex {
  height: 17px;
  flex: 1;
  position: relative;
}
.stepBodyFlex {
  height: 10px;
  position: relative;
  display: flex;
  flex: 1;
}
.step_line {
  margin-top: 3px;
  margin-left: 0;
  width: 100%;
  margin-right: 0;
  height: 4px;
  z-index: 1;
}
.step_circle {
  width: 10px;
  height: 10px;
  margin-right: 0;
  border-radius: 50%;
  z-index: 99;
}
.normal {
  background: rgba(45, 6, 95, 1);
}
.active {
  background: #ff8031;
}
.leftMargin {
  margin-left: 0;
}
.rightMargin {
  margin-right: 0;
}
.right {
  float: right;
}
.couponPrompt {
  height: 17px;
  margin: auto;
  margin-top: 12px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(158, 149, 255, 1);
  line-height: 17px;
}
.headerTitle {
  height: 17px;
  left: 0;
  right: 0;
  top: 145px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(193, 15, 54, 1);
  line-height: 17px;
}
.headerTime {
  height: 17px;
  left: 0;
  right: 0;
  top: 173px;
  position: absolute;
  height: 17px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 191, 88, 1);
  line-height: 17px;
}
.rules {
  width: 49px;
  height: 25px;
  right: 0;
  top: 40px;
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 100px 0px 0px 100px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 191, 88, 1);
  line-height: 25px;
  padding-left: 6px;
}
.content {
  background: rgba(47, 4, 137, 1);
}
.mapParent {
  margin-left: 20px;
  margin-right: 20px;
  height: 466px;
  background: rgba(67, 7, 191, 1);
  border-radius: 4px;
  padding: 0.1px;
  position: relative;
}
.mapDiv {
  margin: 16px;
  height: 434px;
  position: relative;
  overflow: hidden;
}
.sectionDiv {
  height: 68px;
  padding: 0.1px;
  position: relative;
}
.sectionBK {
  width: 221px;
  height: 7px;
  margin: auto;
  margin-top: 38px;
}
.rankSectionTitle {
  left: 0;
  right: 0;
  top: 30px;
  height: 22px;
  position: absolute;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 22px;
  background: linear-gradient(
    360deg,
    rgba(237, 79, 41, 1) 0%,
    rgba(255, 187, 73, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.tableDiv {
  margin-left: 20px;
  margin-right: 20px;
}
.tableHeader {
  height: 42px;
  background: rgba(67, 7, 191, 1);
  border-radius: 4px 4px 0px 0px;
  position: relative;
}
.header_rank {
  left: 27px;
  top: 12px;
  width: 35px;
  height: 18px;
  position: absolute;
  line-height: 18px;
}
.header_user {
  left: 151px;
  top: 12px;
  width: 35px;
  height: 18px;
  position: absolute;
  line-height: 18px;
}
.header_num {
  right: 27px;
  top: 12px;
  width: 59px;
  height: 18px;
  position: absolute;
  line-height: 18px;
}
.tableContent {
  background: #fff;
  border-radius: 0px 0px 4px 4px;
  max-height: 256px;
  overflow-y: scroll;
}
.contentItem {
  height: 38px;
  position: relative;
}
.ownerBKColor {
  background: #f3eeff;
}
.contentLine {
  height: 1px;
  background: rgba(248, 248, 248, 1);
}
.contentItemRank {
  left: 28px;
  width: 32px;
  top: 11px;
  height: 18px;
  position: absolute;
  line-height: 18px;
}
.contentItemName {
  left: 100px;
  right: 100px;
  top: 11px;
  height: 18px;
  position: absolute;
  line-height: 18px;
}
.contentItemNum {
  right: 8px;
  width: 56px;
  top: 11px;
  height: 18px;
  position: absolute;
  line-height: 18px;
  text-align: left;
}

.bottomDiv {
  height: 76px;
}
.bottomPrompt {
  width: 295px;
  height: 32px;
  margin: auto;
  margin-top: 22px;
  font-size: 11px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(158, 149, 255, 1);
  line-height: 16px;
}
.tableFont {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  line-height: 18px;
}
.headerTextColor {
  color: rgba(255, 255, 255, 1);
}
.contentTextColor {
  color: rgba(51, 51, 51, 1);
}
.locationBtn{
  width: 40px;
  height: 40px;
  bottom: 55px;
  right: 26px;
  position: absolute;
}
</style>
