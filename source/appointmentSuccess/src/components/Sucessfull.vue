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
import { Dialog } from "vant";

export default {
  name: "Sucessfull",
  components: {
    [Dialog.Component.name]: Dialog.Component
  },
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
      vueThis.$dialog
        .confirm({
          title: "提示",
          message: "确定执行此操作?"
        })
        .then(() => {
          // on confirm
          vueThis.cancerAppointment();
        })
        .catch(() => {
          // on cancel
        });
    },
    rescheduleAction: function() {
      window.location.href =
        "https://test.ehuandian.net/immotor/h5vue/consumerGuide/index.html";
    },
    cancerAppointment: function() {
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
  height: 216px;
  position: relative;
}

.appointTitle {
  left: 35px;
  right: 35px;
  top: 35px;
  height: 35px;
  position: absolute;
  line-height: 35px;
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(181, 88, 51, 1);
  text-align: left;
}

.storesName {
  left: 35px;
  right: 35px;
  top: 70px;
  height: 25px;
  position: absolute;
  line-height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(181, 88, 51, 1);
  text-align: left;
  overflow: hidden; /*超出部分隐藏*/
  white-space: nowrap; /*不换行*/
  text-overflow: ellipsis; /*超出部分文字以...显示*/
}

.prompt {
  left: 35px;
  right: 35px;
  top: 105px;
  height: 20px;
  position: absolute;
  line-height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(181, 88, 51, 1);
  text-align: left;
}

.contentDiv {
  margin-top: -50px;
  margin-left: 10px;
  margin-right: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  z-index: 101;
  position: relative;
}

.contentHeader {
  height: 50px;
  position: relative;
}

.headerTitle {
  width: 70px;
  height: 24px;
  left: 15px;
  top: 13px;
  position: absolute;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  line-height: 24px;
  text-align: left;
}

.headerTelText {
  width: 24px;
  height: 17px;
  right: 16px;
  top: 17px;
  position: absolute;
  line-height: 17px;
}

.sectionRightTitleFont {
  font-size: 11px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.textFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.btnTitleFont {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.headerTelIcon {
  width: 17px;
  height: 16px;
  right: 45px;
  top: 18px;
  position: absolute;
}

.headerRightLine {
  width: 1px;
  height: 10px;
  right: 75px;
  top: 20px;
  position: absolute;
  background: #c8c8c8;
}

.headerNavgationText {
  width: 24px;
  height: 17px;
  right: 92px;
  top: 17px;
  position: absolute;
  line-height: 17px;
}

.headerNavgationIcon {
  width: 17px;
  height: 16px;
  right: 121px;
  top: 17px;
  position: absolute;
}

.line {
  margin: 0 30px;
  height: 1px;
  background: #e8e8e8;
}

.leftTextFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
}

.rightTextFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.contentSectionDiv {
  padding: 13px 15px;
}

.contentSection {
  justify-content: space-between;
  display: flex;
}

.sectionTop {
  margin-top: 5px;
}

.sectionLeftText {
  height: 27px;
  margin-right: 5px;
  text-align: left;
}
.sectionRightText {
  width: 230px;
  text-align: left;
}

.contentFooter {
  height: 50px;
  position: relative;
}

.footerBtn {
  width: 100%;
  height: 44px;
  left: 0;
  top: 0;
  position: absolute;
  line-height: 44px;
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
  width: 300px;
  height: 319px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
}

.toastSuccessIcon {
  width: 67px;
  height: 62px;
  margin: auto;
  margin-top: 66px;
}

.toastSucessPrompt {
  width: 100px;
  height: 25px;
  margin: auto;
  margin-top: 30px;
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  line-height: 25px;
}

.toastAppointmentInfo {
  width: 100%;
  height: 20px;
  margin: auto;
  margin-top: 10px;
  line-height: 20px;
}

.infoRemarkFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(165, 165, 165, 1);
}

.infoNameFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #454545;
}

.toastRescheduleBtn {
  width: 255px;
  height: 44px;
  margin: auto;
  margin-top: 37px;
  background: rgba(248, 127, 58, 1);
  border-radius: 5px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
}
</style>
