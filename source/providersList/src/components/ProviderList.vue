<template>
  <div class="page-content">
    <div v-if="showList">
      <p class="topPrompt textFont">* 为提高服务质量，请选择附近的门店进行预约</p>
      <div
        v-for="(item, index) in providerList"
        v-bind:class="[selectIndex==index ? 'providerItemSelect providerItem' : 'providerItem']"
        @click="providerItemSelectAction(item, index)"
      >
        <p class="providerItemName nameFont">{{item.name}}</p>
        <p class="providerItemShopHours textFont">营业时间 {{item.startTime + " - " + item.endTime}}</p>
        <div class="providerItemLocationDiv textFont">
          <p v-if="index==0" class="providerItemNearest nearTextFont">离我最近</p>
          <p class="providerItemLocationItem textFont">{{(item.distance/1000).toFixed(2)}}km</p>
          <div class="providerSep"></div>
          <p class="providerItemAddress textFont">{{item.address}}</p>
        </div>
        <div class="providerItemNavigation" @click="navigationAction(item)">
          <img class="imgClass" src="../assets/navigation.png" />
        </div>
        <div class="providerItemTopSep"></div>
        <div class="providerItemTel" @click="telAction(item)">
          <img class="imgClass" src="../assets/tel.png" />
        </div>
        <div class="providerItemIcoSelect" v-if="selectIndex==index">
          <img class="imgClass" src="../assets/select.png" />
        </div>
      </div>
      <div class="pageBottom"></div>
      <div v-if="appointment" class="nextBtn" @click="nextAction">下一步</div>
    </div>
    <div v-else>
      <div class="emptyIconDiv">
        <img class="imgClass" src="../assets/empty.png" />
      </div>
      <p class="emptyText1 textFont">抱歉，你的城市没有服务网点</p>
      <p class="emptyText2 textFont">敬请期待！</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProviderList",
  data() {
    return {
      providerList: [],
      selectIndex: 0,
      appointment: 0,
      userToken: "",
      cityCode: "",
      userLat: 0,
      userLon: 0,
      showList: true,
      appointmentId: ""
    };
  },
  methods: {
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    },
    navigationAction: function(item) {
      window.location.href =
        "IMMOTOR://userNavigation?lat=" +
        item.latitude +
        "&lon=" +
        item.longitude +
        "&addr=" +
        item.address;
    },
    telAction: function(item) {
      window.location.href = "IMMOTOR://tel:" + item.contactsPhone;
    },
    providerItemSelectAction: function(item, index) {
      this.selectIndex = index;
    },
    nextAction: function() {
      if (this.appointmentId && this.appointmentId.length > 0) {
        window.location.href =
          "../appointmentSuccess/index.html";
      } else {
        let item = this.providerList[this.selectIndex];
        window.location.href =
          "../appointment/index.html?siteId=" +
          item.id;
      }
    },
    getUserAppointmentInfo: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getUserAppointment,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            vueThis.appointmentId = result.data.id;
          }
        })
        .catch(resp => {});
    },
    getConsumerSitesData: function() {
      var vueThis = this;
      var param = {};
      if (vueThis.cityCode.length == 0) {
        return;
      }
      param.cityCode = vueThis.cityCode;
      if (vueThis.userLat != 0) {
        param.latitude = vueThis.userLat;
      }
      if (vueThis.userLon != 0) {
        param.longitude = vueThis.userLon;
      }
      param.pageSize = 9999;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getConsumerSites,
          params: param,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            vueThis.providerList = result.data.pageData;
            if (vueThis.providerList.length == 0) {
              vueThis.showList = false;
            }
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + result.resultMsg;
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
              vueThis.userLat = dataObj.lat;
              vueThis.userLon = dataObj.lon;
              vueThis.cityCode = dataObj.citycode;
              vueThis.getConsumerSitesData();
              vueThis.getUserAppointmentInfo();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.userLat = responseData.lat;
            vueThis.userLon = responseData.lon;
            vueThis.cityCode = responseData.citycode;
            vueThis.getConsumerSitesData();
            vueThis.getUserAppointmentInfo();
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
    let appointmentParam = this.getUrlParam("appointment");
    if (appointmentParam && appointmentParam.length > 0) {
      this.appointment = appointmentParam;
    }
    let cityCode = this.getUrlParam("cityCode");
    if (cityCode && cityCode.length > 0 && cityCode != "(null)") {
      this.cityCode = cityCode;
    }
    let lat = this.getUrlParam("lat");
    if (lat && lat.length > 0) {
      this.userLat = lat;
    }
    let lon = this.getUrlParam("lon");
    if (lon && lon.length > 0) {
      this.userLon = lon;
    }
    var token = this.getUrlParam("token");
    if (token && token.length > 0) {
      this.userToken = "bearer " + token;
    }
    //如果在参数中没有token,从userAgent中获取
    else {
      var u = navigator.userAgent;
      //userAgent中没有token字段使用jsbridge获取
      if (u.indexOf("token=") != -1) {
        var token = u.substr(u.indexOf("token=") + 6, u.length);
        token = token.substr(0, token.indexOf("&"));
        this.userToken = "bearer " + token;
      }
    }
    if (this.userToken.length > 0 && this.cityCode.length > 0) {
      this.getConsumerSitesData();
      this.getUserAppointmentInfo();
    } else {
      //使用jsbridage获取token 和 城市code信息
      this.getEhdUserInfoFromBridge();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.page-content {
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  height: 100%;
  position: relative;
  z-index: 1;
}

.imgClass {
  width: 100%;
  height: 100%;
  display: block;
}
.nameFont {
  font-size: 36px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
}

.textFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
}

.nearTextFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(74, 144, 226, 1);
}

.topPrompt {
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 30px;
  height: 33px;
  line-height: 33px;
  text-align: left;
}

.providerItem {
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  padding: 1px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.providerItemSelect {
  border-radius: 10px;
  border: 2px solid rgba(255, 141, 89, 1);
}

.providerItemTel {
  width: 36px;
  height: 36px;
  top: 36px;
  right: 30px;
  position: absolute;
}

.providerItemTopSep {
  width: 2px;
  height: 20px;
  top: 45px;
  right: 98px;
  position: absolute;
  background: #c8c8c8;
}

.providerItemNavigation {
  width: 36px;
  height: 36px;
  top: 36px;
  right: 130px;
  position: absolute;
}

.providerItemIcoSelect {
  width: 56px;
  height: 56px;
  top: 0;
  right: 0;
  position: absolute;
}

.providerItemName {
  margin-top: 30px;
  margin-left: 30px;
  margin-right: 170px;
  height: 50px;
  line-height: 50px;
  text-align: left;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}

.providerItemShopHours {
  margin-top: 28px;
  margin-left: 30px;
  margin-right: 30px;
  height: 33px;
  line-height: 33px;
  text-align: left;
}

.providerItemLocationDiv {
  margin: 10px 30px 30px 30px;
  padding: 1px;
  display: flex;
}

.providerItemNearest {
  margin-right: 12px;
  width: 120px;
  height: 33px;
  line-break: 33px;
  text-align: left;
}

.providerItemLocationItem {
  margin-right: 12px;
  height: 33px;
  line-height: 33px;
  text-align: left;
}

.providerSep {
  width: 2px;
  height: 20px;
  margin-top: 7px;
  margin-right: 12px;
  background: #c8c8c8;
}

.providerItemAddress {
  margin-right: 12px;
  text-align: left;
}

.pageBottom {
  height: 160px;
}

.nextBtn {
  left: 40px;
  right: 40px;
  bottom: 30px;
  height: 88px;
  position: fixed;
  background: rgba(248, 127, 58, 1);
  border-radius: 10px;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 88px;
  text-align: center;
  z-index: 999;
}

.emptyIconDiv {
  margin: auto;
  margin-top: 226px;
  width: 202px;
  height: 154px;
}

.emptyText1 {
  margin: auto;
  margin-top: 60px;
  width: 364px;
  height: 40px;
  line-height: 40px;
}
.emptyText2 {
  margin: auto;
  margin-top: 0;
  width: 364px;
  height: 40px;
  line-height: 40px;
}
</style>
