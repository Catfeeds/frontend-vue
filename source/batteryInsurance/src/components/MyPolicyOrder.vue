<template>
  <div class="pageContent" v-if="isGetInsuranceOrder">
    <div class="header">
      <div class="headerIcon">
        <img src="../assets/guarantee.png" />
      </div>
      <p class="headerName boldTextFont">电池盗抢险（{{batteryNum}}颗电池）</p>
      <p class="headerOrder remarkFont">保单号：{{orderNO}}</p>
      <div class="piccIcon">
        <img src="../assets/picc.png" />
      </div>
      <p class="piccText smallTextFont">由中国人保在线承保</p>
    </div>
    <div class="orderInfoDiv">
      <p class="orderHeader titleFont">保障内容</p>
      <div class="line"></div>
      <div class="contentItem">
        <span class="leftText remarkFont">保额</span>
        <span class="rightText textFont">{{coverage}}元</span>
      </div>
      <div class="contentItem">
        <span class="leftText remarkFont">生效日期</span>
        <span class="rightText textFont">{{startDateText}}</span>
      </div>
      <div class="contentItem">
        <span class="leftText remarkFont">终止日期</span>
        <span class="rightText textFont">{{endDateText}}</span>
      </div>
      <div class="contentItem">
        <span class="leftText remarkFont">被保人</span>
        <span class="rightText textFont" v-if="name">{{name}}</span>
      </div>
    </div>
    <div class="protocolItem" @click="clarimAction">
      <div class="protocolLeftText textFont">理赔流程</div>
      <div class="arrowIcon">
        <img src="../assets/arrow.png" />
      </div>
    </div>
    <div class="protocolItem" @click="scooterAction">
      <div class="protocolLeftText textFont">电动自行车盗抢保险条款</div>
      <div class="arrowIcon">
        <img src="../assets/arrow.png" />
      </div>
    </div>
    <div class="protocolItem" @click="batteryAction">
      <div class="protocolLeftText textFont">电池单独盗抢保险条款</div>
      <div class="arrowIcon">
        <img src="../assets/arrow.png" />
      </div>
    </div>
    <div class="protocolItem" @click="rightTransferAction">
      <div class="protocolLeftText textFont">受益权转让协议</div>
      <div class="arrowIcon">
        <img src="../assets/arrow.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyPolicyOrder",
  data() {
    return {
      orderNO: "",
      coverage: "",
      startDateText: "",
      endDateText: "",
      money: "",
      batteryNum: "",
      name: this.$store.state.userName,
      isGetInsuranceOrder: false
    };
  },
  computed: {
    listenUsername() {
      return this.$store.state.userName;
    },
    listenInsuranceOrder() {
      return this.$store.state.insuranceOrder;
    }
  },
  watch: {
    listenUsername: function(val) {
      this.name = val;
    },
    listenInsuranceOrder: function(val) {
      if (val) {
        this.isGetInsuranceOrder = true;
        this.updateData(val);
      } else {
        this.isGetInsuranceOrder = false;
      }
    }
  },
  mounted() {
    if (this.$store.state.insuranceOrder) {
      this.isGetInsuranceOrder = true;
      this.updateData(this.$store.state.insuranceOrder);
    }
  },
  methods: {
    clarimAction: function() {
      window.location.href =
        "https://imgcn.immotor.com/app/insurance/claim.html";
    },
    scooterAction: function() {
      window.location.href =
        "https://imgcn.immotor.com/app/protocol/bikeagreement.html";
    },
    batteryAction: function() {
      window.location.href =
        "https://imgcn.immotor.com/app/protocol/batteryagreement.html";
    },
    rightTransferAction: function() {
      window.location.href =
        "https://imgcn.immotor.com/app/protocol/usufructtransfer.html";
    },
    updateData: function(val) {
      this.orderNO = val.policyNo;
      this.coverage = val.sumamount;
      this.startDateText = this.formatDateToYYYYMMDD(new Date(val.startDate));
      this.endDateText = this.formatDateToYYYYMMDD(new Date(val.endDate));
      this.money = val.pmoney;
      this.batteryNum = val.num == 2 ? "两" : "一";
    },
    formatDateToYYYYMMDD: function(oDate) {
      var month =
        oDate.getMonth() + 1 < 10
          ? "0" + (oDate.getMonth() + 1)
          : oDate.getMonth() + 1;
      var day = oDate.getDate() < 10 ? "0" + oDate.getDate() : oDate.getDate();
      return oDate.getFullYear() + "年" + month + "月" + day + "日";
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
  width: 100%;
  height: 126px;
  background: rgba(255, 255, 255, 1);
  position: relative;
}
.headerIcon {
  width: 62px;
  height: 62px;
  right: 12px;
  top: 12px;
  position: absolute;
}
.remarkFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(149, 149, 149, 1);
}
.titleFont {
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.boldTextFont {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
}
.textFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.smallTextFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}
.headerName {
  left: 20px;
  right: 100px;
  top: 20px;
  height: 22px;
  position: absolute;
  text-align: left;
  line-height: 22px;
}
.headerOrder {
  left: 20px;
  right: 100px;
  top: 45px;
  height: 20px;
  position: absolute;
  text-align: left;
  line-height: 20px;
}
.piccIcon {
  width: 30px;
  height: 13px;
  left: 20px;
  bottom: 18px;
  position: absolute;
}
.piccText {
  width: 140px;
  height: 17px;
  left: 56px;
  bottom: 16px;
  position: absolute;
  text-align: left;
}
.orderInfoDiv {
  margin-top: 10px;
  margin-bottom: 10px;
  position: relative;
  background: #fff;
  padding-bottom: 10px;
}
.orderHeader {
  height: 50px;
  margin-left: 20px;
  line-height: 50px;
  text-align: left;
}
.protocolItem {
  margin-bottom: 1px;
  background: #fff;
  justify-content: space-between;
  display: flex;
}
.line {
  height: 1px;
  background: #f8f8f8;
}
.contentItem {
  justify-content: space-between;
  display: flex;
}
.leftText {
  margin-left: 20px;
  width: 60px;
  height: 35px;
  line-height: 35px;
  text-align: left;
}
.rightText {
  margin-right: 20px;
  width: 260px;
  height: 35px;
  line-height: 35px;
  text-align: right;
}
.protocolLeftText {
  margin-left: 20px;
  width: 200px;
  height: 50px;
  line-height: 50px;
  text-align: left;
}
.arrowIcon {
  width: 14px;
  height: 14px;
  margin-right: 20px;
  margin-top: 18px;
}
</style>
