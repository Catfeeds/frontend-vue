<template>
  <div>
    <div class="couponList">
      <div v-for="item in couponList" class="couponItem" :key="item.id">
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
        <p class="couponRemark">{{item.desc}}</p>
      </div>
    </div>
    <div class="bottomDiv" @click="clearCouponAction">
      <p class="couponNoneText">不使用优惠劵</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Coupon",
  data() {
    return {
      couponList: []
    };
  },
  mounted() {
    this.getUsableCouponList();
  },
  methods: {
    couponUseAction: function(item) {
      this.$store.commit("selectCoupon", item); //总数
      // this.$router.push({
      //   path: "/pay"
      // });
      //调用返回 回到支付页面
      this.$router.back(-1);
    },
    clearCouponAction: function() {
      this.$store.commit("clearCoupon");
      // this.$router.push({
      //   path: "/pay"
      // });
      //调用返回 回到支付页面
      this.$router.back(-1);
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
            vueThis.couponList =[];
            data.data.forEach(element => {
              element.endTimeStr = vueThis.formatDateToYYYYMMDD(
                new Date(element.endTime)
              );
              if(!(element.moneyOff && element.moneyOff > vueThis.$store.state.insuranceCost )){
                vueThis.couponList.push(element);
              }
            });
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
    formatDateToYYYYMMDD: function(oDate) {
      var month =
        oDate.getMonth() + 1 < 10
          ? "0" + (oDate.getMonth() + 1)
          : oDate.getMonth() + 1;
      var day = oDate.getDate() < 10 ? "0" + oDate.getDate() : oDate.getDate();
      return oDate.getFullYear() + "-" + month + "-" + day;
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
.couponList {
  padding: 16px 12px;
  margin-bottom: 80px;
}

.couponItem {
  height: 136px;
  position: relative;
}
.couponUnitFont {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 68, 77, 1);
}
.couponAmountFont {
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 68, 77, 1);
}
.couponItemAmount {
  left: 13px;
  width: 112px;
  top: 22px;
  height: 45px;
  position: absolute;
  line-height: 45px;
  text-align: center;
}
.couponItemName {
  left: 137px;
  right: 13px;
  top: 30px;
  height: 20px;
  position: absolute;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  text-align: left;
}
.couponItemEffectivePeriod {
  left: 137px;
  width: 125px;
  top: 56px;
  height: 17px;
  position: absolute;
  line-height: 17px;
  text-align: left;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(165, 165, 165, 1);
}
.couponItemUseBtn {
  width: 60px;
  height: 30px;
  top: 49px;
  right: 22px;
  position: absolute;
  background: rgba(248, 127, 58, 1);
  box-shadow: 0px 2px 6px 0px rgba(255, 181, 140, 1);
  border-radius: 5px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 30px;
  text-align: center;
}
.couponRemark {
  height: 20px;
  left: 22px;
  right: 22px;
  bottom: 14px;
  position: absolute;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(165, 165, 165, 1);
  line-height: 20px;
  text-align: left;
}
.bottomDiv {
  height: 84px;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  z-index: 99;
}
.couponNoneText {
  margin: auto;
  margin-top: 15px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
</style>
