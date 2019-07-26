<template>
  <div>
    <div class="mainBody" v-if="isClient==1">
      <div class="header">
        <img class="imgClass" src="../assets/header.png" />
        <p class="headerRemark">电池+中控绿色回收</p>
        <div class="headerTitle">
          <img src="../assets/headerTitle.png" />
        </div>
        <div class="headerRecyclingTitle">
          <span class="headerRecylingLeftFont">回收奖励高达</span>
          <span class="headerRecylingRightFont">{{topRecyclingPrice}}元</span>
        </div>
      </div>
      <div class="contentDiv">
        <p class="sectionTitle sectionTop sectionTitleFont">中控+电池回收奖励</p>
        <div class="recyclingPriceChart">
          <barChart :xData="recyclingTime" :yData="recyclingPrice"></barChart>
        </div>
        <p class="chartBottomRemark">月限区间（一个月=30天）</p>
        <p class="sectionTitle sectionTop sectionTitleFont">绿色回收流程</p>
        <div class="recyclingProcessDiv">
          <div class="icon1Left processIconDiv">
            <img src="../assets/offline.png" />
          </div>
          <div class="processArrowDiv arrow1Left">
            <img src="../assets/arrow.png" />
          </div>
          <div class="icon2Left processIconDiv">
            <img src="../assets/online.png" />
          </div>
          <div class="processArrowDiv arrow2Left">
            <img src="../assets/arrow.png" />
          </div>
          <div class="icon3Left processIconDiv">
            <img src="../assets/wait.png" />
          </div>
          <p class="processTitle processTitle1Left">线下实物归还</p>
          <p class="processTitle processTitle2Left">线上申请奖励</p>
          <p class="processTitle processTitle3Left">等待回收奖励</p>
          <p class="processRemark1 processRemarkFont">线下服务网点回收电池和中控</p>
          <p class="processRemark2 processRemarkFont">e换电APP申请回收拿奖励</p>
          <p class="processRemark3 processRemarkFont">1-7个工作日奖励到账</p>
        </div>
        <p class="sectionTitle sectionTop sectionTitleFont">当前回收奖励</p>
        <div class="recyclingCommodityDiv">
          <div class="commodityItem" v-if="recyclingDepositAmount">
            <div class="commodityItemIcon" @click="batteryCheckAction">
              <img :src="[batteryChecked?selectSrc:normalSrc]" />
            </div>
            <div class="commodityItemLine"></div>
            <p class="commodityItemName">超级电池</p>
            <p class="commodityItemRemark">当前回收奖励</p>
            <p class="commodityItemAmount">
              <span class="amountFont">{{recyclingDepositAmount}}</span>
              <span class="amountUnitFont">元</span>
            </p>
          </div>
          <div class="commodityItem" v-if="recyclingScooterAmount">
            <div class="commodityItemIcon" @click="scooterCheckAction">
              <img :src="[scooterChecked?selectSrc:normalSrc]" />
            </div>
            <div class="commodityItemLine"></div>
            <p class="commodityItemName">智慧中控</p>
            <p class="commodityItemRemark">当前回收奖励</p>
            <p class="commodityItemAmount">
              <span class="amountFont">{{recyclingScooterAmount}}</span>
              <span class="amountUnitFont">元</span>
            </p>
          </div>
        </div>
      </div>
      <div class="footer">
        <div class="footerLeftItem">
          <span class="remarkFont">可得</span>
          <span class="footerAmountFont">{{recyclingAmount}}元</span>
        </div>
        <div class="footerRightItem" @click="recyclingAction">
          <p class="footerRecyclingText">马上回收 ></p>
          <p class="footerRecyclingRemark">最终回收奖励以实际到账为准</p>
        </div>
      </div>
      <div class="toastMask" v-if="refundFlag">
        <div class="toastBK">
          <div class="toastSuccessIcon" v-if="refundFlag==1">
            <img src="../assets/success.png" />
          </div>
          <div class="toastFailureIcon" v-if="refundFlag==2">
            <img src="../assets/failure.png" />
          </div>
          <div class="toastClose" v-if="refundFlag==2" @click="closeAction">
            <img src="../assets/toastClose.png" />
          </div>
          <p class="toastSuccessPrompt">
            <span class="promptTextFont" v-if="refundFlag==1">您的{{recyclingText}}回收已经受理。回收奖励金额：</span>
            <span class="promptAmountFont" v-if="refundFlag==1">{{recyclingAmount}}元</span>
            <span class="promptTextFont" v-if="refundFlag==1">，预计7个工作日到账</span>
            <span class="promptTextFont" v-if="refundFlag==2">请把电池和中控带到附近的电池退还站点，再进行回收！</span>
          </p>
          <div class="toastBtn toastBtnTextFont" v-if="refundFlag==1" @click="confirmAction">确定</div>
          <div
            class="toastBtn toastBtnTextFont"
            v-if="refundFlag==2"
            @click="goSitesAction"
          >查看附近的电池退还站点</div>
        </div>
      </div>
    </div>
    <div class="notRecyclableDiv" v-if="isClient==0">
      <div class="notRecyclableIconDiv">
        <img src="../assets/notRecyclable.png" />
      </div>
      <p class="notRecyclableTitle">抱歉，您的电池不能进行环保回收 请联系当地服务商处理！</p>
    </div>
  </div>
</template>

<script>
const barChart = () => import("./eEchart/barChart.vue");

export default {
  name: "Recycling",
  components: {
    barChart
  },
  data() {
    return {
      recyclingAmount: 0,
      recyclingText: "",
      depositId: "",
      scooterId: "",
      topRecyclingPrice: "",
      recyclingDepositAmount: 0,
      recyclingScooterAmount: 0,
      recyclingPrice: [],
      recyclingTime: [],
      batteryChecked: false,
      scooterChecked: false,
      normalSrc: require("../assets/normal.png"),
      selectSrc: require("../assets/select.png"),
      refundFlag: 0, //0初始状态  1成功 2失败
      isClient: 1
    };
  },
  methods: {
    scooterCheckAction: function() {
      this.scooterChecked = !this.scooterChecked;
      this.updateRecyclingAmount();
    },
    batteryCheckAction: function() {
      this.batteryChecked = !this.batteryChecked;
      this.updateRecyclingAmount();
    },
    recyclingAction: function() {
      //调用提交接口
      var vueThis = this;
      if (vueThis.recyclingAmount == 0) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请选择回收的押金类型";
        return;
      }
      var dataParam = {};
      if (vueThis.batteryChecked) {
        dataParam.depositId = vueThis.depositId;
      }
      if (vueThis.scooterChecked) {
        dataParam.scooterId = vueThis.scooterId;
      }
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.depositRefund,
          data: dataParam,
          headers: {
            "Content-Type": "application/json",
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.code == 600) {
            vueThis.refundFlag = 1;
            vueThis.recyclingText = "";
            if (vueThis.batteryChecked) {
              vueThis.recyclingText = "电池";
            }
            if (vueThis.scooterChecked) {
              if (vueThis.recyclingText.length == 0) {
                vueThis.recyclingText = "中控";
              } else {
                vueThis.recyclingText += "和中控";
              }
            }
            vueThis.afterOpenToast();
          } else if (
            result.code == 603 ||
            result.code == 636 ||
            result.code == 647
          ) {
            vueThis.refundFlag = 2;
            vueThis.afterOpenToast();
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
    confirmAction: function() {
      this.beforeToastClose();
      window.location.href = "IMMOTOR://consumerRefundSucceed";
    },
    goSitesAction: function() {
      this.beforeToastClose();
      window.location.href =
        "https://test.ehuandian.net/immotor/h5vue/providersList/index.html";
    },
    closeAction: function() {
      this.beforeToastClose();
      this.refundFlag = 0;
    },
    afterOpenToast: function() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", mo, false); //禁止页面滑动
    },
    beforeToastClose: function() {
      var mo = function(e) {
        e.preventDefault();
      };
      document.body.style.overflow = ""; //出现滚动条
      document.removeEventListener("touchmove", mo, false);
    },
    updateRecyclingAmount: function() {
      this.recyclingAmount = 0;
      if (this.batteryChecked) {
        this.recyclingAmount += this.recyclingDepositAmount;
      }
      if (this.scooterChecked) {
        this.recyclingAmount += this.recyclingScooterAmount;
      }
    },
    getRecylingInfo: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getRecylingInfo,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.code == 600) {
            vueThis.isClient = result.result.isClient;
            if (vueThis.isClient == 1) {
              var recyclingsChartInfoXData = [];
              var recyclingsChartInfoYData = [];
              if (
                result.result.recyclings &&
                result.result.recyclings.length > 0
              ) {
                for (
                  let index = 0;
                  index < result.result.recyclings.length - 1;
                  index++
                ) {
                  const element = result.result.recyclings[index];
                  const nextElement = result.result.recyclings[index + 1];
                  let xItem =
                    element.duration / 30 + "-" + nextElement.duration / 30;
                  let yItem = element.scooterAmount + element.depositAmount;
                  recyclingsChartInfoXData.push(xItem);
                  recyclingsChartInfoYData.push(yItem);
                }
              }
              vueThis.recyclingTime = recyclingsChartInfoXData;
              vueThis.recyclingPrice = recyclingsChartInfoYData;
              vueThis.topRecyclingPrice = 0;
              if (result.result.recyclingDepositAmount) {
                vueThis.topRecyclingPrice =
                  result.result.recyclingDepositAmount;
              }
              if (result.result.recyclingScooterAmount) {
                vueThis.topRecyclingPrice +=
                  result.result.recyclingScooterAmount;
              }
              vueThis.recyclingDepositAmount =
                result.result.recyclingDepositAmount;
              vueThis.recyclingScooterAmount =
                result.result.recyclingScooterAmount;
              vueThis.depositId = result.result.depositId;
              vueThis.scooterId = result.result.scooterId;
            }
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
              vueThis.getRecylingInfo();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.getRecylingInfo();
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
      this.getRecylingInfo();
    } else {
      this.getEhdUserInfoFromBridge();
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
  width: 100%;
  background: linear-gradient(
    360deg,
    rgba(228, 247, 255, 1) 0%,
    rgba(3, 154, 242, 1) 100%
  );
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

.sectionTitleFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.remarkFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
}

.processRemarkFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.footerAmountFont {
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(243, 130, 86, 1);
}

.header {
  width: 100%;
  height: 1028px;
  position: relative;
}

.headerRemark {
  width: 100%;
  height: 36px;
  left: 0;
  top: 168px;
  position: absolute;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.headerTitle {
  width: 600px;
  height: 100px;
  left: 75px;
  top: 234px;
  position: absolute;
}

.headerRecyclingTitle {
  width: 400px;
  height: 80px;
  left: 175px;
  top: 368px;
  position: absolute;
  background: rgba(255, 141, 89, 1);
  border-radius: 40px;
  line-height: 80px;
}

.headerRecylingLeftFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.headerRecylingRightFont {
  font-size: 40px;
  font-family: PingFangSC-Semibold;
  color: rgba(255, 255, 255, 1);
}

.amountFont {
  font-size: 48px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(243, 130, 86, 1);
}

.amountUnitFont {
  font-size: 32px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(243, 130, 86, 1);
}

.contentDiv {
  width: 100%;
  background: rgba(255, 255, 255, 1);
  padding: 1px;
  border-radius: 20px 20px 8px 8px;
  position: relative;
  margin-top: -20px;
  margin-bottom: 100px;
}

.sectionTitle {
  width: 320px;
  height: 68px;
  background: rgba(3, 132, 98, 1);
  border-radius: 0px 200px 200px 0px;
  line-height: 68px;
  padding-left: 40px;
  text-align: left;
}

.sectionTop {
  margin-top: 60px;
}

.recyclingPriceChart {
  margin-top: 0px;
  margin-bottom: -24px;
}

.chartBottomRemark {
  margin-top: 36px;
  margin-right: 66px;
  text-align: right;
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 28px;
  z-index: 9999;
}

.recyclingProcessDiv {
  height: 258px;
  margin-top: 60px;
  position: relative;
}

.processIconDiv {
  width: 172px;
  height: 120px;
  top: 0;
  position: absolute;
}

.icon1Left {
  left: 55px;
}

.icon2Left {
  left: 287px;
}

.icon3Left {
  right: 55px;
}

.processArrowDiv {
  width: 16px;
  height: 28px;
  top: 46px;
  position: absolute;
}

.arrow1Left {
  left: 251px;
}

.arrow2Left {
  right: 251px;
}

.processTitle {
  width: 172px;
  height: 40px;
  top: 142px;
  position: absolute;
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
  line-height: 40px;
}

.processTitle1Left {
  left: 57px;
}

.processTitle2Left {
  left: 289px;
}

.processTitle3Left {
  right: 57px;
}

.processRemark1 {
  width: 204px;
  height: 68px;
  left: 41px;
  top: 190px;
  position: absolute;
  line-height: 34px;
}

.processRemark2 {
  width: 170px;
  height: 68px;
  left: 291px;
  top: 190px;
  position: absolute;
  line-height: 34px;
}

.processRemark3 {
  width: 148px;
  height: 68px;
  top: 190px;
  right: 56px;
  position: absolute;
  font-size: 24px;
  line-height: 34px;
}

.recyclingCommodityDiv {
  margin-top: 60px;
  margin-bottom: 60px;
}

.commodityItem {
  height: 160px;
  margin-left: 40px;
  margin-right: 40px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 10px 10px 0px rgba(0, 0, 0, 0.06);
  border-radius: 10px;
  position: relative;
}

.commodityItemIcon {
  width: 38px;
  height: 38px;
  left: 30px;
  top: 64px;
  position: absolute;
}

.commodityItemLine {
  width: 2px;
  height: 86px;
  left: 92px;
  top: 38px;
  position: absolute;
  background: #ededed;
}

.commodityItemName {
  left: 126px;
  right: 40px;
  top: 34px;
  height: 44px;
  position: absolute;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(89, 89, 89, 1);
  line-height: 44px;
  text-align: left;
}

.commodityItemRemark {
  width: 150px;
  height: 34px;
  left: 126px;
  top: 86px;
  position: absolute;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(89, 89, 89, 1);
  line-height: 34px;
  text-align: left;
}

.commodityItemAmount {
  left: 280px;
  right: 40px;
  top: 62px;
  height: 66px;
  position: absolute;
  line-height: 66px;
  text-align: right;
}

.footer {
  width: 100%;
  height: 100px;
  left: 0;
  bottom: 0;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -10px 10px 0px rgba(0, 0, 0, 0.06);
  z-index: 999;
}

.footerLeftItem {
  width: 242px;
  height: 100px;
  left: 0;
  top: 0;
  position: absolute;
  line-height: 100px;
}

.footerRightItem {
  left: 242px;
  right: 0;
  height: 100px;
  top: 0;
  position: absolute;
  background: rgba(3, 132, 98, 1);
}

.footerRecyclingText {
  height: 44px;
  margin-top: 12px;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
}

.footerRecyclingRemark {
  height: 28px;
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.5);
  line-height: 28px;
}

.notRecyclableDiv {
  width: 100%;
  height: 314px;
  margin: auto;
  position: relative;
}

.notRecyclableIconDiv {
  width: 144px;
  height: 188px;
  margin: auto;
  margin-top: 208px;
}

.notRecyclableTitle {
  width: 420px;
  height: 80px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
  line-height: 40px;
  margin: auto;
  margin-top: 45px;
  text-align: center;
}

.toastMask {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  z-index: 1000;
}

.toastBK {
  width: 598px;
  height: 634px;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  margin: auto;
  position: relative;
}

.toastClose {
  width: 28px;
  height: 28px;
  right: 40px;
  top: 40px;
  position: absolute;
}

.toastSuccessIcon {
  width: 112px;
  height: 112px;
  margin: auto;
  margin-top: 136px;
}

.toastFailureIcon {
  width: 236px;
  height: 152px;
  margin: auto;
  margin-top: 116px;
}

.promptTextFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(102, 102, 102, 1);
}

.promptAmountFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #ff761b;
}

.toastSuccessPrompt {
  width: 508px;
  height: 170px;
  margin: auto;
  margin-top: 54px;
  line-height: 48px;
}

.toastBtnTextFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.toastBtn {
  width: 508px;
  height: 88px;
  margin: auto;
  margin-bottom: 46px;
  background: rgba(248, 127, 58, 1);
  border-radius: 10px;
  line-height: 88px;
}
</style>
