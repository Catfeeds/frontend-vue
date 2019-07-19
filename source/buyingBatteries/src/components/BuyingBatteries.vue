<template>
  <div>
    <div class="mainBK">
      <div class="batteriesDiv">
        <div class="batteryDiv" v-for="(item, index) in batteryList" @click="selectPackage(index)">
          <div class="imgDiv">
            <img src="../assets/battery.png" />
          </div>
          <div class="rightBatteryDiv">
            <p class="batteryName">{{item.name}}</p>
            <p class="batteryRemark">{{item.remark}}</p>
            <p class="batteryPrice">
              <span class="unitFont">¥</span>
              <span class="priceFont">{{item.price + " "}}</span>
              <span class="originalPriceFont">{{item.original_price}}</span>
            </p>
          </div>
          <div class="selectDiv" v-if="index==selectIndex">
            <img src="../assets/batterySelect.png" />
          </div>
        </div>
      </div>
      <div class="coupuSelectDiv">
        <div class="discountImgDiv">
          <img src="../assets/discount.png" />
        </div>
        <p class="couponContent" @click="couponToastAction">
          <span class="couponRemarkFont">套餐优惠券</span>
          <span v-bind:class="couponContentClass">{{couponPrompt}}</span>
        </p>
        <div class="arrowImgDiv">
          <img src="../assets/arrow.png" />
        </div>
      </div>
      <div class="segmentationDiv"></div>
      <div class="payContentDiv">
        <div class="payTitleDiv">
          <p class="paySectionTitie">支付方式</p>
        </div>
        <div class="line"></div>
        <div class="paySelectDiv">
          <div class="payTypeSelectDiv">
            <div class="payTypeImgDiv">
              <img src="../assets/alipay.png" />
            </div>
            <p class="payTypeText">支付宝支付（支持花呗）</p>
            <div class="payTypeSelect" @click="selectAlipayAction">
              <img  :src="alipaySelectSrc" />
            </div>
          </div>
          <div class="payTypeSelectDiv">
            <div class="payTypeImgDiv">
              <img src="../assets/wechat.png" />
            </div>
            <p class="payTypeText">微信支付</p>
            <div class="payTypeSelect" @click="selectWechatAction">
              <img :src="wechatPaySelectSrc" />
            </div>
          </div>
        </div>
      </div>
      <div class="bottomPayDiv">
        <div class="bottomDiv">
          <div class="protocolSelectImgDiv" @click="checkProtocolAction">
            <img class="imgClass" :src="protocolSelectImgSrc" />
          </div>
          <p class="protocolText">
            <span class="protocolRemarkFont">勾选代表我已同意</span>
            <span>
              <a
                class="protocolFont"
                href="IMMOTOR://openWebView?url=https://test.ehuandian.net/immotor/apph5/batteryRecycling/recyclingProtocol.html"
              >《超级电池、智能中控环保回收服务协议》</a>
            </span>
          </p>
          <div class="costsText">
            <span class="payRemarkFont">共</span>
            <span class="payAmountFont">{{payAmount}}</span>
            <span class="payRemarkFont">元</span>
          </div>
          <div class="payBtn" @click="confirmPayAction">确认支付</div>
        </div>
      </div>
    </div>
    <div v-if="couponToastShow" class="toastMask">
      <div class="toastBK">
        <div class="toastContent">
          <div class="toastTitle">
            可用优惠劵
            <div class="toastDoNotUseDiscount" @click="clearCouponAction">不使用优惠</div>
            <div class="toastClose" @click="toastCloseAction">关闭</div>
          </div>
          <div class="line"></div>
          <div class="couponList">
            <div v-for="item in couponList" class="couponItem">
              <img src="../assets/couponBK.png" />
              <p class="couponItemAmount">
                <span class="couponUnitFont" v-if="item.discountType==1">¥</span>
                <span class="couponAmountFont" v-if="item.discountType==1">{{item.amount}}</span>
                <span class="couponAmountFont" v-if="item.discountType==2">{{item.discount}}</span>
                <span class="couponUnitFont" v-if="item.discountType==2">折</span>
              </p>
              <p class="couponItemName">{{item.name}}</p>
              <p class="couponItemEffectivePeriod">有效期至{{item.endTimeStr}}</p>
              <div class="couponItemUseBtn" @click="couponUseAction(item)">使用</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BuyingBatteries",
  data() {
    return {
      batteryList: [],
      couponList: [],
      selectIndex: 0,
      selectPayType: 1,
      selectCouponId: "",
      checkedProtocol: false,
      couponPrompt: "无可用优惠劵",
      couponContentClass: "couponContentUsableNoneFont",
      wechatPaySelectSrc: require("../assets/checkbox_normal.png"),
      alipaySelectSrc: require("../assets/checkbox_select.png"),
      protocolSelectImgSrc: require("../assets/checkbox_normal.png"),
      payAmount: 0,
      couponToastShow: false,
      userToken: ""
    };
  },
  methods: {
    selectPackage: function(index) {
      this.selectIndex = index;
      this.payAmount = this.batteryList[index].price;
    },
    couponToastAction: function() {
      if (this.couponList.length > 0) {
        this.couponToastShow = true;
      }
    },
    selectWechatAction: function() {
      this.selectPayType = 0;
      this.wechatPaySelectSrc = require("../assets/checkbox_select.png");
      this.alipaySelectSrc = require("../assets/checkbox_normal.png");
    },
    selectAlipayAction: function() {
      this.selectPayType = 1;
      this.wechatPaySelectSrc = require("../assets/checkbox_normal.png");
      this.alipaySelectSrc = require("../assets/checkbox_select.png");
    },
    checkProtocolAction: function() {
      this.checkedProtocol = !this.checkedProtocol;
      if (this.checkedProtocol) {
        this.protocolSelectImgSrc = require("../assets/checkbox_select.png");
      } else {
        this.protocolSelectImgSrc = require("../assets/checkbox_normal.png");
      }
    },
    clearCouponAction: function() {
      this.couponToastShow = false;
      this.selectCouponId = "";
      this.couponPrompt = "有待使用的优惠劵";
      this.couponContentClass = "couponContentFont";
      this.payAmount = this.batteryList[this.selectIndex].price;
    },
    toastCloseAction: function() {
      this.couponToastShow = false;
    },
    couponUseAction: function(item) {
      this.couponToastShow = false;
      this.selectCouponId = item.id;
      var amount = this.batteryList[this.selectIndex].price;
      if (item.discountType == 1) {
        this.payAmount = amount - item.amount;
      } else if (item.discountType == 2) {
        this.payAmount = (amount * item.discount) / 10;
      }
      this.couponPrompt = "已抵扣" + (amount - this.payAmount) + "元";
      this.couponContentClass = "couponContentFont";
    },
    confirmPayAction: function() {
      if (!this.checkedProtocol) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请阅读并同意相关协议";
        return;
      }
      var param = "type=";
      if (this.selectCouponId.length > 0) {
        param += "a";
      }
      if (this.selectPayType == 0) {
        param += "c";
      } else if (this.selectPayType == 1) {
        param += "d";
      }
      param += "&pid=" + this.batteryList[this.selectIndex].id;
      param += "&rid=";
      if (this.selectCouponId.length > 0) {
        param += this.selectCouponId;
      }
      window.location.href = "IMMOTOR://consumerBuyBattery?" + param;
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
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
              vueThis.getConsumerBatteryPackage();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.getConsumerBatteryPackage();
          });
        }
      }
    },
    formatDateToYYYYMMDD: function(timestamp) {
      var oDate = new Date(timestamp);
      var year = oDate.getFullYear();
      var month =
        oDate.getMonth() + 1 < 10
          ? "0" + (oDate.getMonth() + 1)
          : oDate.getMonth() + 1;
      var day = oDate.getDate() < 10 ? "0" + oDate.getDate() : oDate.getDate();
      return year.toString() + "-" + month.toString() + "-" + day.toString();
    },
    getCouponList: function() {
      var vueThis = this;
      var url =
        vueThis.$yApi.getUsableCouponList +
        "?goodsId=" +
        vueThis.batteryList[vueThis.selectIndex].id;
      vueThis
        .axios({
          method: "get",
          url: url,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            data.data.forEach(element => {
              element.endTimeStr = vueThis.formatDateToYYYYMMDD(
                element.endTime
              );
            });
            vueThis.couponList = data.data;
            if (vueThis.couponList.length > 0) {
              vueThis.couponPrompt = "有待使用的优惠劵";
              vueThis.couponContentClass = "couponContentFont";
            } else {
              vueThis.couponPrompt = "无可用优惠劵";
              vueThis.couponContentClass = "couponContentUsableNoneFont";
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
    getConsumerBatteryPackage: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getConsumerAvailableBatteryPackage,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            vueThis.batteryList = data.result;
            if (vueThis.batteryList.length > 0) {
              for (let index = 0; index < vueThis.batteryList.length; index++) {
                const element = vueThis.batteryList[index];
                if (element.batteryNum == 1) {
                  vueThis.selectIndex = index;
                  vueThis.payAmount = element.price;
                  vueThis.getCouponList();
                  break;
                }
              }
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
    }
  },
  mounted() {
    //获取token
    var token = this.getUrlParam("token");
    if (token && token.length > 0) {
      this.userToken = "bearer " + token;
      this.getConsumerBatteryPackage();
    } else {
      var u = navigator.userAgent;
      //userAgent中没有token字段使用jsbridge获取
      if (u.indexOf("token=") == -1) {
        this.getEhdUserInfoFromBridge();
      } else {
        token = u.substr(u.indexOf("token=") + 6, u.length);
        token = token.substr(0, token.indexOf("&"));
        this.userToken = "bearer " + token;
        this.getConsumerBatteryPackage();
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
  text-decoration: none;
}

a,
a:hover,
a:active,
a:visited,
a:link,
a:focus {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-tap-highlight-color: transparent;
  outline: none;
  background: none;
  text-decoration: none;
}
img{
  width: 100%;
  height: 100%;
  display: block;
}

.mainBK {
  width: 100%;
  padding: 1px;
}
.batteriesDiv {
  padding: 20px;
  background: #f7f7f7;
}
.batteryDiv {
  margin-bottom: 20px;
  width: 100%;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  border: 2px solid rgba(255, 141, 89, 1);
  display: flex;
}
.imgDiv {
  width: 104px;
  height: 104px;
  margin-left: 30px;
  margin-top: 33px;
  display: block;
}
.rightBatteryDiv {
  margin: 30px 0px;
  position: relative;
}

.batteryName {
  margin-left: 30px;
  width: 492px;
  margin-top: 3px;
  height: 42px;
  font-size: 30px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  line-height: 42px;
  text-align: left;
}
.batteryRemark {
  margin-left: 30px;
  width: 492px;
  margin-top: 10px;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
  line-height: 33px;
  text-align: left;
}
.batteryPrice {
  margin-left: 30px;
  width: 492px;
  margin-top: 30px;
  margin-bottom: 4px;
  height: 50px;
  text-align: left;
  line-height: 60px;
}

.selectDiv {
  width: 55px;
  height: 55px;
  right: 20px;
  top: 20px;
  position: absolute;
  border-radius: 0 10px 0 0;
  overflow: hidden;
}

.unitFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 141, 89, 1);
}
.priceFont {
  font-size: 36px;
  font-family: PingFangSC-Medium;
  font-weight: 400;
  color: rgba(255, 141, 89, 1);
}
.originalPriceFont {
  font-size: 20px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
  text-decoration: line-through;
}
.coupuSelectDiv {
  width: 100%;
  height: 100px;
  margin-top: -20px;
  background: #fff;
  position: relative;
}

.discountImgDiv {
  left: 26px;
  top: 34px;
  width: 33px;
  height: 33px;
  position: absolute;
}

.arrowImgDiv {
  right: 29px;
  bottom: 40px;
  width: 10px;
  height: 20px;
  position: absolute;
}

.couponContent {
  left: 82px;
  right: 59px;
  top: 30px;
  height: 40px;
  position: absolute;
  justify-content: space-between;
  display: flex;
}
.couponContent span {
  line-height: 40px;
}
.couponRemarkFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.couponContentUsableNoneFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
}

.couponContentFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(231, 77, 77, 1);
}

.segmentationDiv {
  width: 100%;
  height: 20px;
  background: #f7f7f7;
}
.payContentDiv {
  width: 100%;
  background: #fff;
}
.payTitleDiv {
  width: 100%;
  height: 66px;
  position: relative;
  display: flex;
}
.paySectionTitie {
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  height: 33px;
  line-height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
  text-align: left;
}
.line {
  margin-left: 30px;
  margin-right: 30px;
  height: 2px;
  background: #f7f7f7;
}
.paySelectDiv {
  width: 100%;
}

.payTypeSelectDiv {
  margin-top: 50px;
  margin-bottom: 5px;
  width: 100%;
  height: 40px;
  position: relative;
}

.payTypeImgDiv {
  left: 30px;
  top: 0;
  width: 40px;
  height: 40px;
  position: absolute;
}

.payTypeText {
  left: 90px;
  right: 40px;
  top: 0;
  height: 40px;
  line-height: 40px;
  position: absolute;
  text-align: left;
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.payTypeSelect {
  right: 30px;
  top: 4px;
  width: 31px;
  height: 31px;
  position: absolute;
}

.bottomPayDiv {
  width: 100%;
  height: 200px;
  bottom: 1px;
  left: 0;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  position: absolute;
}
.bottomDiv {
  width: 100%;
  height: 200px;
  padding: 1px;
  position: relative;
}
.protocolSelectImgDiv {
  width: 34px;
  height: 34px;
  left: 30px;
  top: 20px;
  position: absolute;
}
.protocolText {
  left: 70px;
  right: 24px;
  height: 34px;
  top: 20px;
  position: absolute;
  line-height: 34px;
  text-align: left;
}

.protocolFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #ff761b;
}

.protocolRemarkFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.costsText {
  left: 30px;
  right: 350px;
  height: 67px;
  bottom: 30px;
  position: absolute;
  line-height: 67px;
  text-align: left;
}
.payBtn {
  width: 320px;
  height: 88px;
  right: 30px;
  bottom: 30px;
  position: absolute;
  background: rgba(248, 127, 58, 1);
  border-radius: 10px;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 88px;
  text-align: center;
}
.payAmountFont {
  font-size: 48px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.payRemarkFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.toastMask {
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
}

.toastBK {
  width: 100%;
  height: 100%;
  max-height: 802px;
  left: 0;
  bottom: 0;
  position: absolute;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px 10px 0px 0px;
}

.toastContent {
  width: 100%;
  height: 100%;
  position: relative;
}

.toastDoNotUseDiscount {
  width: 140px;
  height: 40px;
  left: 40px;
  top: 28px;
  position: absolute;
  line-height: 40px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
  text-align: left;
}

.toastClose {
  width: 57px;
  height: 40px;
  right: 40px;
  top: 28px;
  position: absolute;
  line-height: 40px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
  text-align: right;
}

.toastTitle {
  width: 100%;
  height: 100px;
  line-height: 100px;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  text-align: center;
}

.couponList {
  width: 100%;
  padding: 32px 24px;
  max-height: 667px;
  overflow: scroll;
}

.couponItem {
  width: 100%;
  height: 272px;
  position: relative;
}
.couponUnitFont {
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 68, 77, 1);
}
.couponAmountFont {
  font-size: 64px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 68, 77, 1);
}
.couponItemAmount {
  left: 26px;
  width: 224px;
  top: 45px;
  height: 90px;
  position: absolute;
  line-height: 90px;
  text-align: center;
}
.couponItemName {
  left: 273px;
  right: 26px;
  top: 61px;
  height: 40px;
  position: absolute;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 40px;
  text-align: left;
}
.couponItemEffectivePeriod {
  left: 273px;
  width: 250px;
  top: 112px;
  height: 33px;
  position: absolute;
  line-height: 33px;
  text-align: left;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(165, 165, 165, 1);
}
.couponItemUseBtn {
  width: 120px;
  height: 60px;
  top: 98px;
  right: 45px;
  position: absolute;
  background: rgba(248, 127, 58, 1);
  box-shadow: 0px 2px 6px 0px rgba(255, 181, 140, 1);
  border-radius: 10px;
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 60px;
  text-align: center;
}
</style>
