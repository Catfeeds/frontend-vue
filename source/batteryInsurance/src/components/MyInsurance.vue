<template>
  <div class="pageContent">
    <div class="header headerHeight1" v-if="status==0">
      <div class="unPurchasedImg">
        <img src="../assets/unPurchased.png" />
      </div>
      <p class="insuraneName headerTitleFont">电池盗抢险30天</p>
      <p class="insuranePrompt headerPromptFont">{{insuranceCost}}元起享电池丢失高额理赔</p>
      <p class="amount">
        <span class="amountFont">{{insuranceCost}}</span>
        <span class="unitFont">元</span>
      </p>
      <div class="buyBtn" @click="buyAction">立即购买</div>
    </div>
    <div class="header headerHeight2" @click="headerAction" v-if="status>0">
      <p class="effectName headerTitleFont">电池盗抢险30天（{{batteryNumText}}颗电池）</p>
      <div class="headerItem headerItemTop">
        <span class="headerItemTitle headerItemTitleFont">被保人</span>
        <span class="headerItemContent headerItemContentFont">{{name}}</span>
      </div>
      <div class="headerItem">
        <span class="headerItemTitle headerItemTitleFont" v-if="status==2">保障期限</span>
        <span
          class="headerItemContent headerItemContentFont"
          v-if="status==2"
        >{{startDateText}}-{{endDateText}}</span>
        <span class="headerItemTitle headerItemTitleFont" v-if="status==1">生效时间</span>
        <span class="headerItemContent headerItemContentFont" v-if="status==1">{{startDateText}}</span>
      </div>
      <div class="headerItem headerItemTop">
        <div class="effectStatusImg">
          <img :src="statusImgSrc" />
        </div>
        <span :class="statusClass">{{statusText}}</span>
      </div>
      <div class="arrowIcon" v-if="status==2">
        <img src="../assets/arrow.png" />
      </div>
    </div>
    <div class="content">
      <p class="promptSectionTitle">保险须知</p>
      <div class="contentItem contentTop">
        <div class="contentItemDot"></div>
        <p class="contentItemText">
          <span class="contentTextFont">理赔咨询：</span>
          <span>
            <a class="contentPhoneFont" href="immotor://tel:95518">95518</a>
          </span>
        </p>
      </div>
      <div class="contentItem">
        <div class="contentItemDot"></div>
        <p class="contentItemText contentTextFont">保险服务由中国人民财产保险股份有限公司提供</p>
      </div>
      <div class="contentItem">
        <div class="contentItemDot"></div>
        <p class="contentItemText contentTextFont">购买后保单受中华人民共和国司法管辖</p>
      </div>
      <div class="contentItem contentBottom">
        <div class="contentItemDot"></div>
        <p
          class="contentItemText contentTextFont"
        >换电功能承租人或骑行人应为年龄18—60周岁，身体健康，能正常生活或正常生活的非机动车辆合法使用者 每颗电池限投一份，多份无效。</p>
      </div>
      <div class="contentLine contentLeftLine"></div>
      <div class="contentLine contentRightLine"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyInsurance",
  data() {
    return {
      status: -1, //0未购买 1待生效 2已生效
      insuranceCost: 0,
      statusImgSrc: require("../assets/unEffect.png"),
      statusText: "保单待生效",
      statusClass: "headerItemContent unEffectFont",
      batteryNumText: "",
      startDateText: "",
      endDateText: "",
      name: "",
      idcard: ""
    };
  },
  mounted() {
    this.getUserInsuranceInfo();
    this.getUserInsuranceOrder();
  },
  methods: {
    buyAction: function() {
      if (this.idcard && this.idcard.length > 0) {
        this.$router.push({
          path: "/batteryinsurance"
        });
      } else {
        window.location.href = "IMMOTOR://app-links/authentication";
      }
    },
    headerAction: function() {
      if (this.status == 2) {
        this.$router.push({
          path: "/policyorder"
        });
      }
    },
    updateUI: function() {
      if (this.status == 1) {
        this.statusImgSrc = require("../assets/unEffect.png");
        this.statusText = "保单待生效";
        this.statusClass = "headerItemContent unEffectFont";
      } else if (this.status == 2) {
        this.statusImgSrc = require("../assets/effect.png");
        this.statusText = "电池保障中";
        this.statusClass = "headerItemContent effectFont";
      }
    },
    formatDateToYYYYMMDD: function(oDate) {
      return (
        oDate.getFullYear() +
        "." +
        (oDate.getMonth() + 1) +
        "." +
        oDate.getDate()
      );
    },
    getUserInsuranceInfo: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.userInsurancePreInfo,
          headers: {
            Authorization: vueThis.$store.state.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            vueThis.name = data.result.name;
            vueThis.idcard = data.result.idcard;
            vueThis.insuranceCost = data.result.insurance;
            var num = data.result.num;
            vueThis.batteryNumText = num == 2 ? "二" : "一";
            vueThis.$store.commit("setUserName", vueThis.name);
            vueThis.$store.commit("setInsuranceCosts", vueThis.insuranceCost);
            vueThis.$store.commit("setBatteryNum", num);
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
    getUserInsuranceOrder: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getUserInsuranceOrder,
          headers: {
            Authorization: vueThis.$store.state.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.code == 600) {
            var insuranceOrder = data.result[0];
            vueThis.startDateText = vueThis.formatDateToYYYYMMDD(
              new Date(insuranceOrder.startDate)
            );
            vueThis.endDateText = vueThis.formatDateToYYYYMMDD(
              new Date(insuranceOrder.endDate)
            );
            vueThis.$store.commit("setInsuranceOrder", insuranceOrder);
            if (insuranceOrder.status == 3) {
              vueThis.status = 2;
            } else {
              vueThis.status = 1;
            }
            vueThis.updateUI();
          } else if (data.code == 640) {
            vueThis.status = 0;
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
.pageContent {
  background: #f8f8f8;
  padding: 0.1px;
}
.header {
  margin: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  padding: 0.1px;
}
.headerHeight1 {
  height: 112px;
}
.headerHeight2 {
  height: 132px;
}
.content {
  position: relative;
  background: rgba(255, 255, 255, 1);
  padding: 1px;
}
.headerTitleFont {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.headerPromptFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(149, 149, 149, 1);
}

.amountFont {
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.unitFont {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}

.unPurchasedImg {
  width: 38px;
  height: 38px;
  left: 14px;
  top: 20px;
  position: absolute;
}

.effectStatusImg {
  width: 14px;
  height: 14px;
  margin-left: 15px;
  margin-right: 6px;
  margin-top: 3px;
}

.insuraneName {
  left: 64px;
  right: 14px;
  top: 16px;
  height: 22px;
  position: absolute;
  line-height: 22px;
  text-align: left;
}

.insuranePrompt {
  left: 64px;
  right: 14px;
  top: 40px;
  height: 20px;
  position: absolute;
  line-height: 20px;
  text-align: left;
}

.effectName {
  margin-left: 14px;
  margin-top: 14px;
  height: 22px;
  position: relative;
  text-align: left;
}

.headerItemTitleFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(149, 149, 149, 1);
}

.headerItemContentFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.unEffectFont {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(89, 153, 255, 1);
}

.effectFont {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(68, 192, 162, 1);
}

.headerItem {
  height: 20px;
  position: relative;
  display: flex;
}

.headerItemTop {
  margin-top: 10px;
}
.headerItemTitle {
  width: 87px;
  height: 20px;
  margin-left: 14px;
  text-align: left;
}

.headerItemContent {
  height: 20px;
  text-align: left;
}

.amount {
  left: 64px;
  width: 100px;
  top: 70px;
  height: 28px;
  position: absolute;
  line-height: 28px;
  text-align: left;
}

.contentLine {
  height: 1px;
  width: 100px;
  top: 30px;
  position: absolute;
  background: rgba(240, 240, 240, 1);
}

.contentItemDot {
  margin-left: 20px;
  margin-top: 10px;
  width: 4px;
  height: 4px;
  background: rgba(149, 149, 149, 1);
  border-radius: 50%;
  overflow: hidden;
}

.contentItemText {
  width: 327px;
  margin-left: 4px;
  line-height: 23px;
  text-align: left;
}

.contentLeftLine {
  left: 36px;
}
.contentRightLine {
  right: 36px;
}

.contentTop {
  margin-top: 20px;
}

.contentBottom {
  margin-bottom: 20px;
}

.contentItem {
  position: relative;
  display: flex;
}

.contentTextFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(149, 149, 149, 1);
}
.contentPhoneFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #5999ff;
}

.buyBtn {
  width: 80px;
  height: 28px;
  right: 14px;
  bottom: 14px;
  position: absolute;
  background: rgba(255, 141, 89, 1);
  border-radius: 14px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 28px;
}

.promptSectionTitle {
  margin: auto;
  margin-top: 20px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 500;
  color: rgba(149, 149, 149, 1);
  line-height: 20px;
}
.arrowIcon {
  width: 14px;
  height: 14px;
  right: 10px;
  top: 20px;
  position: absolute;
}
</style>
