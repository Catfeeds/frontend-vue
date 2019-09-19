<template>
  <div class="pageContent">
    <div class="header">
      <div class="headBK">
        <img src="../assets/headerBK.png" />
      </div>
      <div class="headerMyLight" v-if="isEhdWebview&&myRankData">
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
      <div class="downAppBtn" v-if="!isEhdWebview" @click="downAppAction">下载APP，参与点亮活动</div>
      <div class="openAppBtn" v-if="!isEhdWebview" @click="openAppAction">我已下载，打开APP</div>
      <p class="rules" @click="rulesAction" v-if="isEhdWebview">规则</p>
      <p class="headerTitle">点亮换电柜，赢优惠券&10天免费换电</p>
      <p class="headerTime">活动时间：2019.10.01-2019.10.10</p>
    </div>
    <div class="content" v-if="isEhdWebview">
      <div class="mapParent">
        <div id="mapContainer" class="mapDiv"></div>
        <div
          v-bind:class="[showNavgation?'locationNavBottom' :'locationBottom', 'locationBtn']"
          @click="locationAction"
        >
          <img src="../assets/location.png" />
        </div>
        <div
          class
          v-bind:class="[selectNavStation.name.length>19?'navHeight':'navShortHeight', 'navDiv']"
          v-if="showNavgation&&selectNavStation"
        >
          <div class="navContent">
            <p class="lightPrompt">请到换电柜附近点亮</p>
            <p
              class="navAddr"
              v-bind:class="[selectNavStation.name.length>19?'navAddrHeight':'navAddrShortHeight', 'navAddr']"
            >{{selectNavStation.name}}</p>
            <div class="navSepLine"></div>
            <div class="navIcon" @click="navgationAction">
              <img src="../assets/navgation.png" />
            </div>
            <p class="navText" @click="navgationAction">导航</p>
          </div>
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
    <div class="emptyBottom" v-else></div>
    <div @touchmove.prevent v-if="showToast" class="browserToast" @click="toastClick">
      <div class="browserDiv">
        <p class="linkTitle">链接打不开？</p>
        <p class="linkText">请点击右上角，选择在“浏览器”打开</p>
        <div class="linkIcon">
          <img src="../assets/link.png" />
        </div>
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
      stationTimer: null,
      isEhdWebview: true,
      userMarker: null,
      stationMarkerList: [],
      showNavgation: false,
      selectNavStation: null,
      routeLine: null,
      showToast: false
    };
  },
  mounted() {
    this.activityId = this.getUrlParam("lotteryID");
    var u = navigator.userAgent;
    var fromParam = this.getParam(u, "from");
    if (fromParam == "ehdApp") {
      this.isEhdWebview = true;
    } else {
      this.isEhdWebview = false;
    }
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
  beforeDestroy() {
    if (this.stationTimer) {
      clearInterval(this.stationTimer);
      this.stationTimer = null;
    }
  },
  methods: {
    rulesAction: function() {
      if (this.myRankData && this.myRankData.ruleUrl) {
        window.location.href = this.myRankData.ruleUrl;
      }
    },
    locationAction: function() {
      this.map.setCenter([this.lon, this.lat]);
    },
    navgationAction: function() {
      if (this.selectNavStation) {
        window.location.href =
          "IMMOTOR://userNavigation?lat=" +
          this.selectNavStation.latitude +
          "&lon=" +
          this.selectNavStation.longitude +
          "&addr=" +
          this.selectNavStation.name;
      }
    },
    downAppAction: function() {
      window.location.href =
        "http://download.immotor.com/app/downloads/ehuandian";
    },
    openAppAction: function() {
      if (this.isQQWechatBrowser()) {
        //提示在浏览器中打开
        this.showToast = true;
      } else {
        window.location.href = "immotor://app-links/homepage";
      }
    },
    toastClick: function() {
      this.showToast = false;
    },
    setupUserMarker: function() {
      if (this.userMarker) {
        this.userMarker.setPosition([this.lon, this.lat]);
      } else {
        var userIcon = new AMap.Icon({
          size: new AMap.Size(22, 23),
          image: "./static/user.png",
          imageSize: new AMap.Size(22, 23)
        });
        this.userMarker = new AMap.Marker({
          icon: userIcon,
          position: [this.lon, this.lat],
          offset: new AMap.Pixel(-11, -11.5)
        });
        this.map.add(this.userMarker);
      }
    },
    setupMapMarkers: function() {
      var vueThis = this;
      vueThis.stationList.forEach(element => {
        var stationMarker = vueThis.getStationMarker(element.pID);
        var stateState = vueThis.getStationMarkerState(element);
        if (stationMarker) {
          var state = stationMarker.getExtData().state;
          if (state != stateState) {
            vueThis.removeArrayItem(vueThis.stationMarkerList, stationMarker);
            vueThis.map.remove(stationMarker);
            stationMarker = vueThis.setupSingleMarker(stateState, element);
            if (stationMarker) {
              stationMarker.setExtData({
                pid: element.pID,
                state: stateState
              });
              vueThis.stationMarkerList.push(stationMarker);
              vueThis.map.add(stationMarker);
            }
          }
        } else {
          stationMarker = vueThis.setupSingleMarker(stateState, element);
          if (stationMarker) {
            stationMarker.setExtData({
              pid: element.pID,
              state: stateState
            });
            vueThis.stationMarkerList.push(stationMarker);
            vueThis.map.add(stationMarker);
          }
        }
      });
    },
    setupSingleMarker: function(state, element) {
      var vueThis = this;
      var stationMarker = null;
      var ligthedIcon = new AMap.Icon({
        size: new AMap.Size(28.5, 34),
        image: "./static/lighted.png",
        imageSize: new AMap.Size(28.5, 34)
      });
      var disableIcon = new AMap.Icon({
        size: new AMap.Size(28.5, 34),
        image: "./static/disable.png",
        imageSize: new AMap.Size(28.5, 34)
      });
      if (state == 1) {
        stationMarker = new AMap.Marker({
          icon: ligthedIcon,
          position: [element.longitude, element.latitude],
          offset: new AMap.Pixel(-14.25, -34)
        });
      } else if (state == 2) {
        stationMarker = new AMap.Marker({
          icon: "./static/light.gif",
          position: [element.longitude, element.latitude],
          offset: new AMap.Pixel(-55, -66)
        });
        AMap.event.addListener(stationMarker, "click", function(e) {
          vueThis.lightBatteryStation(element);
        });
      } else if (state == 0) {
        stationMarker = new AMap.Marker({
          icon: disableIcon,
          position: [element.longitude, element.latitude],
          offset: new AMap.Pixel(-14.25, -34)
        });
        AMap.event.addListener(stationMarker, "click", function(e) {
          vueThis.unLightUpMarkerClick(element);
        });
      }
      return stationMarker;
    },
    //返回： 1、已经点亮 2、可点亮 0、不可点亮
    getStationMarkerState: function(element) {
      var userLocation = new AMap.LngLat(this.lon, this.lat);
      if (this.isLightedBatteryStation(element)) {
        return 1;
      } else {
        var stationLocation = new AMap.LngLat(
          element.longitude,
          element.latitude
        );
        var distance = userLocation.distance(stationLocation);
        if (distance > 100) {
          return 0;
        }
      }
      return 2;
    },
    getStationMarker: function(pid) {
      for (let index = 0; index < this.stationMarkerList.length; index++) {
        const element = this.stationMarkerList[index];
        if (element.getExtData().pid == pid) {
          return element;
        }
      }
      return null;
    },
    unLightUpMarkerClick: function(element) {
      var vueThis = this;
      if (vueThis.routeLine) {
        vueThis.map.remove(vueThis.routeLine);
        vueThis.routeLine = null;
      }
      vueThis.showNavgation = true;
      vueThis.selectNavStation = element;
      //绘制导航线路
      //骑行导航
      var riding = new AMap.Riding({
        policy: 1
      });
      //根据起终点坐标规划骑行路线
      riding.search(
        [vueThis.lon, vueThis.lat],
        [element.longitude, element.latitude],
        function(status, result) {
          if (status === "complete") {
            if (result.routes && result.routes.length) {
              vueThis.drawRoute(result.routes[0]);
              console.log("绘制骑行路线完成");
            }
          } else {
            console.log("骑行路线数据查询失败" + result);
          }
        }
      );
    },
    drawRoute: function(route) {
      var path = this.parseRouteToPath(route);
      this.routeLine = new AMap.Polyline({
        path: path,
        strokeWeight: 3,
        strokeColor: "#31354A",
        lineJoin: "round"
      });
      this.routeLine.setMap(this.map);
      // 调整视野达到最佳显示区域
      this.map.setFitView([this.routeLine]);
    },
    parseRouteToPath: function(route) {
      var path = [];
      for (var i = 0, l = route.rides.length; i < l; i++) {
        var step = route.rides[i];

        for (var j = 0, n = step.path.length; j < n; j++) {
          path.push(step.path[j]);
        }
      }
      return path;
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
            vueThis.activeIndex = 0;
            if (vueThis.myRankData.rewardIntervalList) {
              vueThis.myRankData.rewardIntervalList.forEach(element => {
                if (vueThis.myRankData.lightCount >= element) {
                  vueThis.activeIndex++;
                }
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
            that.setupUserMarker();
            if (that.stationList.length > 0) {
              that.setupMapMarkers();
            }
            that.map.on("click", function() {
              if (that.routeLine) {
                that.map.remove(that.routeLine);
                that.routeLine = null;
              }
              that.showNavgation = false;
              that.selectNavStation = null;
            });
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
            vueThis.isEhdWebview = true;
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
            vueThis.isEhdWebview = true;
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
    removeArrayItem: function(array, item) {
      var index = array.indexOf(item);
      if (index > -1) {
        array.splice(index, 1);
      }
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    },
    getParam: function(search, name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    },
    isQQWechatBrowser: function() {
      var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //微信
        return true;
      } else if (ua.indexOf("mobile mqqbrowser") > -1) {
        //安卓QQ
        return true;
      } else if (ua.indexOf("iphone") > -1 || ua.indexOf("mac") > -1) {
        //iOS QQ
        if (ua.indexOf("qq") > -1) {
          return true;
        }
      }
      return false;
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
  height: 100%;
  background: rgba(47, 4, 137, 1);
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
  background: rgba(233, 227, 253, 1);
}
.contentLine {
  height: 1px;
  background: rgba(248, 248, 248, 1);
}
.contentItemRank {
  left: 24px;
  width: 40px;
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
.locationBtn {
  width: 40px;
  height: 40px;
  right: 26px;
  position: absolute;
}
.locationBottom {
  bottom: 30px;
}
.locationNavBottom {
  bottom: 110px;
}
.navDiv {
  left: 16px;
  right: 16px;
  bottom: 16px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.1);
  position: absolute;
}
.navHeight {
  height: 81px;
}
.navShortHeight {
  height: 65px;
}
.navContent {
  width: 100%;
  height: 100%;
  position: relative;
}
.lightPrompt {
  width: 140px;
  height: 18px;
  left: 12px;
  top: 12px;
  position: absolute;
  font-size: 13px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 128, 49, 1);
  line-height: 18px;
  text-align: left;
}
.navAddr {
  width: 232px;
  left: 12px;
  bottom: 12px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 16px;
  text-align: left;
}
.navAddrHeight {
  height: 32px;
}
.navAddrShortHeight {
  height: 16px;
}
.navSepLine {
  width: 1px;
  height: 28px;
  right: 50px;
  bottom: 17px;
  position: absolute;
  background: #e9e9e9;
}
.navIcon {
  width: 14px;
  height: 15px;
  right: 16px;
  bottom: 32px;
  position: absolute;
}
.navText {
  width: 30px;
  right: 16px;
  height: 16px;
  bottom: 12px;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 16px;
  text-align: right;
}
.downAppBtn {
  left: 60px;
  right: 60px;
  top: 522px;
  height: 38px;
  position: absolute;
  background: linear-gradient(
    90deg,
    rgba(255, 176, 49, 1) 0%,
    rgba(255, 111, 31, 1) 100%
  );
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border-radius: 100px;
  line-height: 38px;
}
.openAppBtn {
  left: 60px;
  right: 60px;
  top: 584px;
  height: 38px;
  position: absolute;
  border-radius: 100px;
  border: 1px solid;
  border-color: rgba(255, 113, 31, 1);
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    90deg,
    rgba(255, 176, 49, 1) 0%,
    rgba(255, 133, 65, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 38px;
}
.emptyBottom {
  height: 90px;
  background: rgba(47, 4, 137, 1);
}
.browserToast {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
}
.browserDiv {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  height: 98px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  padding: 0.1px;
}
.linkIcon {
  width: 190px;
  height: 30px;
  right: 15px;
  top: 10px;
  position: absolute;
}
.linkTitle {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 27px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  text-align: left;
}
.linkText {
  margin-left: 20px;
  margin-right: 20px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  text-align: left;
}
</style>
