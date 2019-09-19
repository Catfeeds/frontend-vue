<template>
  <div class="pageContent"> 
    <div class="header">
      <p class="amountRemark remarkFont">应付金额</p>
      <p class="amount">
        <span class="amountFont">{{payAmount.toFixed(2)}}</span>
        <span class="unitFont">元</span>
      </p>
      <div class="couponItem" @click="couponAction">
        <p class="couponLeftText titleFont">优惠券</p>
        <p v-bind:class="[hasCoupon?'couponFont':'titleFont', 'couponRightText']">{{couponPrompt}}</p>
        <div class="arrowIcon">
          <img src="../assets/arrow.png" />
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="paySelectDiv">
      <div class="payTypeSelectDiv" v-if="balance>0">
        <div class="payTypeImgDiv">
          <img src="../assets/balance.png" />
        </div>
        <p class="payTypeText titleFont">余额支付（{{balance}}元）</p>
        <div class="payTypeSelect" @click="selectBalanceAction">
          <img :src="[balancePay?selectSrc:normalSrc]" />
        </div>
      </div>
      <div class="payTypeSelectDiv">
        <div class="payTypeImgDiv">
          <img src="../assets/alipay.png" />
        </div>
        <p class="payTypeText titleFont">支付宝支付（支持花呗）</p>
        <div class="payTypeSelect" @click="selectAlipayAction">
          <img :src="[aiPay?selectSrc:normalSrc]" />
        </div>
      </div>
      <div class="payTypeSelectDiv">
        <div class="payTypeImgDiv">
          <img src="../assets/wechat.png" />
        </div>
        <p class="payTypeText titleFont">微信支付</p>
        <div class="payTypeSelect" @click="selectWechatAction">
          <img :src="[wechatPay?selectSrc:normalSrc]" />
        </div>
      </div>
    </div>
    <div class="payBtn" @click="payAction">确定支付</div>
  </div>
</template>

<script>
export default {
  name: "PayInsurance",
  data() {
    return {
      balance: 0,
      insuranceCosts: this.$store.state.insuranceCost,
      payAmount: this.$store.state.insuranceCost,
      hasCoupon: false,
      couponPrompt: "无可用优惠劵",
      balancePay: false,
      aiPay: false,
      wechatPay: false,
      normalSrc: require("../assets/pay_normal.png"),
      selectSrc: require("../assets/pay_select.png")
    };
  },
  mounted() {
    if (this.$store.state.selectCoupon) {
      this.hasCoupon = true;
      this.updateCouponText();
    } else {
      this.getUsableCouponList();
    }
    this.getUserBalance();
  },
  methods: {
    selectBalanceAction: function() {
      this.balancePay = !this.balancePay;
    },
    selectAlipayAction: function() {
      this.aiPay = !this.aiPay;
      if (this.aiPay) {
        this.wechatPay = false;
      }
    },
    selectWechatAction: function() {
      this.wechatPay = !this.wechatPay;
      if (this.wechatPay) {
        this.aiPay = false;
      }
    },
    couponAction: function() {
      if (this.hasCoupon) {
        this.$router.push({
          path: "/coupon"
        });
      }
    },
    payAction: function() {
      var type = "";
      if (this.$store.state.selectCoupon) {
        type += "a";
      }
      if (this.balancePay) {
        type += "b";
      }
      if (this.wechatPay) {
        type += "c";
      }
      if (this.aiPay) {
        type += "d";
      }
      if (type.length == 0) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请选择支付方式";
      } else {
        var url = "immotor://insurancePay?type=" + type;
        if (this.$store.state.selectCoupon) {
          url += "&rid=" + this.$store.state.selectCoupon.id;
        }
        window.location.href = url;
      }
    },
    updateSelectStatus: function() {
      this.balancePay = this.balance > 0 ? true : false;
      this.aiPay = this.balance < this.payAmount ? true : false;
    },
    updateCouponText: function() {
      if (this.hasCoupon) {
        if (this.$store.state.selectCoupon) {
          if (this.$store.state.selectCoupon.discountType == 1) {
            this.payAmount =
              this.insuranceCosts - this.$store.state.selectCoupon.amount;
            this.payAmount = this.payAmount < 0 ? 0 : this.payAmount;
            this.couponPrompt =
              "已抵扣" +
              (this.insuranceCosts - this.payAmount).toFixed(2) +
              "元";
          } else if (this.$store.state.selectCoupon.discountType == 2) {
            this.payAmount =
              (this.insuranceCosts * this.$store.state.selectCoupon.discount) /
              10;
            this.payAmount = this.payAmount < 0 ? 0 : this.payAmount;
            this.couponPrompt =
              "已抵扣" +
              (this.insuranceCosts - this.payAmount).toFixed(2) +
              "元";
          }
        } else {
          this.couponPrompt = "有待使用的优惠劵";
        }
      } else {
        this.couponPrompt = "暂无可用优惠劵";
      }
    },
    getUserBalance: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getUserBalance,
          headers: {
            Authorization: vueThis.$store.state.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            vueThis.balance = data.result.amount;
            vueThis.updateSelectStatus();
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
    getUsableCouponList: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getUsableCouponList,
          headers: {
            Authorization: vueThis.$store.state.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            if (data.data.length > 0) {
              vueThis.hasCoupon = true;
              vueThis.updateCouponText();
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
.pageContent{
  height: 100%;
  padding: 0.1px;
  z-index: 1;
}
.remarkFont {
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(0, 0, 0, 1);
}
.titleFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.discountFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 141, 89, 1);
}
.amountFont {
  font-size: 40px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.unitFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.couponFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 141, 89, 1);
}
.header {
  position: relative;
}
.amountRemark {
  margin: auto;
  margin-top: 45px;
  height: 18px;
  line-height: 18px;
}
.amount {
  margin: auto;
  margin-top: 5px;
  height: 56px;
  line-height: 56px;
}
.couponItem {
  height: 50px;
  margin-top: 20px;
  position: relative;
}
.couponLeftText {
  left: 20px;
  top: 0;
  width: 44px;
  height: 50px;
  position: absolute;
  text-align: left;
  line-height: 50px;
}
.couponRightText {
  left: 80px;
  right: 60px;
  height: 50px;
  top: 0;
  position: absolute;
  text-align: right;
  line-height: 50px;
}
.arrowIcon {
  width: 14px;
  height: 14px;
  right: 20px;
  top: 18px;
  position: absolute;
}
.line {
  height: 10px;
  background: #f8f8f8;
}
.paySelectDiv {
  position: relative;
}
.payTypeSelectDiv {
  margin-top: 30px;
  height: 20px;
  position: relative;
}
.payTypeImgDiv {
  left: 20px;
  top: 1px;
  width: 18px;
  height: 18px;
  position: absolute;
}
.payTypeText {
  left: 44px;
  right: 50px;
  top: 0;
  height: 20px;
  line-height: 20px;
  position: absolute;
  text-align: left;
}
.payTypeSelect {
  right: 20px;
  top: 0;
  width: 20px;
  height: 20px;
  position: absolute;
}
.payBtn {
  left: 20px;
  right: 20px;
  height: 44px;
  bottom: 40px;
  background: rgba(255, 141, 89, 1);
  border-radius: 4px;
  position: fixed;
  z-index: 99px;
  font-size: 13px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
}
</style>
