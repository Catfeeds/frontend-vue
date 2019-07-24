<template>
  <div>
    <div class="header">
      <img class="imgClass" src="../assets/headerBK.png" />
      <p class="appointTitle">你已预约</p>
      <p class="storesName" v-if="siteInfo">{{siteInfo.name}}</p>
      <p class="prompt">请按时到达</p>
    </div>
    <div class="contentDiv">
      <div class="contentHeader">
        <p class="headerTitle">预约详情</p>
        <div class="headerNavgationIcon" @click="navAction">
          <img class="imgClass" src="../assets/navigation.png" />
        </div>
        <p class="headerNavgationText sectionRightTitleFont" @click="navAction">导航</p>
        <div class="headerRightLine"></div>
        <div class="headerTelIcon" @click="telAction">
          <img class="imgClass" src="../assets/tel.png" />
        </div>
        <p class="headerTelText sectionRightTitleFont" @click="telAction">电话</p>
      </div>
      <div class="line"></div>
      <div class="contentSectionDiv" v-if="siteInfo">
        <div class="contentSection">
          <span class="sectionLeftText leftTextFont">服务商</span>
          <span class="sectionRightText rightTextFont">{{siteInfo.name}}</span>
        </div>
        <div class="contentSection sectionTop">
          <span class="sectionLeftText leftTextFont">服务商地址</span>
          <span class="sectionRightText rightTextFont">{{siteInfo.address}}</span>
        </div>
        <div class="contentSection sectionTop">
          <span class="sectionLeftText leftTextFont">预约人</span>
          <span class="sectionRightText rightTextFont">{{appointmentName}}</span>
        </div>
        <div class="contentSection sectionTop">
          <span class="sectionLeftText leftTextFont">到店时间</span>
          <span class="sectionRightText rightTextFont">{{arrivalTime}}</span>
        </div>
      </div>
      <div class="line"></div>
      <div class="contentFooter">
        <div class="footerBtn btnTitleFont" @click="cancerAction">取消预约</div>
      </div>
      <div class="toastMask" v-if="cancerToast">
        <div class="toastBK">
          <div class="toastSuccessIcon">
            <img class="imgClass" src="../assets/success.png" />
          </div>
          <p class="toastSucessPrompt">预约已取消</p>
          <p class="toastAppointmentInfo">
            <span class="infoRemarkFont">你已取消预约“</span>
            <span class="infoNameFont">{{siteInfo.name}}</span>
            <span class="infoRemarkFont">”</span>
          </p>
          <div class="toastRescheduleBtn" @click="rescheduleAction">重新预约</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sucessfull",
  data() {
    return {
      userToken: "",
      siteInfo: null,
      appointmentName: "",
      appointmentId: "",
      arrivalTime: "",
      cancerToast: false
    };
  },
  methods: {
    navAction: function() {
      window.location.href =
        "IMMOTOR://userNavigation?lat=" +
        this.siteInfo.latitude +
        "&lon=" +
        this.siteInfo.longitude +
        "&addr=" +
        this.siteInfo.address;
    },
    telAction: function() {
      window.location.href = "IMMOTOR://tel:" + this.siteInfo.contactsPhone;
    },
    cancerAction: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "patch",
          url: vueThis.$yApi.cancerUserAppointment + vueThis.appointmentId,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            vueThis.cancerToast = true;
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
    rescheduleAction: function() {
      window.location.href =
        "https://test.ehuandian.net/immotor/h5vue/consumerGuide/index.html";
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
            vueThis.siteInfo = result.data.siteInfo;
            vueThis.appointmentName = result.data.name;
            vueThis.appointmentId = result.data.id;
            vueThis.arrivalTime =
              vueThis.formatDateToYYYYMMDD(result.data.date) +
              " " +
              result.data.startTime +
              "-" +
              result.data.endTime;
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
    },
    formatDateToYYYYMMDD: function(timestamp) {
      var oDate = new Date(timestamp);
      var year = oDate.getFullYear();
      var month = oDate.getMonth() + 1;
      var day = oDate.getDate();
      return year + "年" + month + "月" + day + "日";
    }
  },
  mounted() {
    this.userToken = this.getUrlParam("token");
    if (this.userToken && this.userToken.length > 0) {
      this.userToken = "bearer " + this.userToken;
      this.getUserAppointmentInfo();
    }
    //如果在参数中没有token,从userAgent中获取
    else {
      var u = navigator.userAgent;
      //userAgent中没有token字段使用jsbridge获取
      if (u.indexOf("token=") == -1) {
        this.getEhdUserInfoFromBridge();
      } else {
        var token = u.substr(u.indexOf("token=") + 6, u.length);
        token = token.substr(0, token.indexOf("&"));
        this.userToken = "bearer " + token;
        this.getUserAppointmentInfo();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgClass {
  width: 100%;
  height: 100%;
  display: block;
}

.header {
  width: 100%;
  height: 431px;
  position: relative;
}

.appointTitle {
  left: 70px;
  right: 70px;
  top: 70px;
  height: 70px;
  position: absolute;
  line-height: 70px;
  font-size: 56px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(181, 88, 51, 1);
  text-align: left;
}

.storesName {
  left: 70px;
  right: 70px;
  top: 140px;
  height: 50px;
  position: absolute;
  line-height: 50px;
  font-size: 48px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(181, 88, 51, 1);
  text-align: left;
}

.prompt {
  left: 70px;
  right: 70px;
  top: 210px;
  height: 40px;
  position: absolute;
  line-height: 40px;
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(181, 88, 51, 1);
  text-align: left;
}

.contentDiv {
  margin-top: -100px;
  margin-left: 20px;
  margin-right: 20px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  z-index: 101;
  position: relative;
}

.contentHeader {
  height: 99px;
  position: relative;
}

.headerTitle {
  width: 140px;
  height: 48px;
  left: 30px;
  top: 26px;
  position: absolute;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  line-height: 48px;
  text-align: left;
}

.headerTelText {
  width: 48px;
  height: 33px;
  right: 32px;
  top: 34px;
  position: absolute;
  line-height: 33px;
}

.sectionRightTitleFont{
  font-size: 22px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.textFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.btnTitleFont {
  font-size: 26px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.headerTelIcon {
  width: 33px;
  height: 32px;
  right: 90px;
  top: 35px;
  position: absolute;
}

.headerRightLine {
  width: 2px;
  height: 20px;
  right: 151px;
  top: 41px;
  position: absolute;
  background: #c8c8c8;
}

.headerNavgationText {
  width: 48px;
  height: 33px;
  right: 184px;
  top: 34px;
  position: absolute;
  line-height: 33px;
}

.headerNavgationIcon {
  width: 33px;
  height: 32px;
  right: 242px;
  top: 35px;
  position: absolute;
}

.line {
  margin: 0 30px;
  height: 2px;
  background: #e8e8e8;
}

.leftTextFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
}

.rightTextFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.contentSectionDiv {
  padding: 25px 30px;
}

.contentSection {
  justify-content: space-between;
  display: flex;
}

.sectionTop {
  margin-top: 10px;
}

.sectionLeftText {
  height: 54px;
  margin-right: 10px;
  text-align: left;
}
.sectionRightText {
  width: 460px;
  text-align: left;
}

.contentFooter {
  height: 99px;
  position: relative;
}

.footerBtn {
  width: 100%;
  height: 88px;
  left: 0;
  top: 0;
  position: absolute;
  line-height: 88px;
}

.toastMask {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
}

.toastBK {
  width: 600px;
  height: 637px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  position: relative;
}

.toastSuccessIcon {
  width: 134px;
  height: 124px;
  margin: auto;
  margin-top: 132px;
}

.toastSucessPrompt {
  width: 200px;
  height: 50px;
  margin: auto;
  margin-top: 60px;
  font-size: 36px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  line-height: 50px;
}

.toastAppointmentInfo {
  width: 100%;
  height: 40px;
  margin: auto;
  margin-top: 20px;
  line-height: 40px;
}

.infoRemarkFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(165, 165, 165, 1);
}

.infoNameFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #454545;
}

.toastRescheduleBtn {
  width: 510px;
  height: 88px;
  margin: auto;
  margin-top: 74px;
  background: rgba(248, 127, 58, 1);
  border-radius: 10px;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 88px;
}
</style>
