<template>
  <div class="pageContent">
    <div class="header">
      <img src="../assets/header.png" />
    </div>
    <div class="whyDiv">
      <div class="sectionHeader">
        <p class="sectionTitle sectionTitleFont">为什么购买保障服务？</p>
        <div class="sectionLeftImg section1LeftImgPos">
          <img src="../assets/section_left.png" />
        </div>
        <div class="sectionRightImg section1RightImgPos">
          <img src="../assets/section_right.png" />
        </div>
      </div>
      <ul class="section1ImgUL">
        <li>
          <div>
            <img src="../assets/compensation.png" />
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/protection.png" />
          </div>
        </li>
        <li>
          <div>
            <img src="../assets/praise.png" />
          </div>
        </li>
      </ul>
      <ul class="section1TextUL">
        <li class="sectionTextFont">
          电池被盗
          <br />可获得赔偿
        </li>
        <li class="sectionTextFont">
          e换电
          <br />协助理赔
        </li>
        <li class="sectionTextFont">
          省心、放心
          <br />骑行无忧
        </li>
      </ul>
    </div>
    <div class="brightSpotDiv">
      <div class="sectionHeader">
        <p class="sectionTitle sectionTitleFont">保障亮点</p>
        <div class="sectionLeftImg section2LeftImgPos">
          <img src="../assets/section_left.png" />
        </div>
        <div class="sectionRightImg section2RightImgPos">
          <img src="../assets/section_right.png" />
        </div>
      </div>
      <div class="section2ContentDiv section2ContentTop">
        <div class="section2ContentDot"></div>
        <span class="section2ContentTitle sectionTextFont">专属定制：</span>
        <span class="section2ContentText sectionReamrkFont">为电动自行车专属定制</span>
      </div>
      <div class="section2ContentDiv">
        <div class="section2ContentDot"></div>
        <span class="section2ContentTitle sectionTextFont">保障内容：</span>
        <span class="section2ContentText sectionReamrkFont">
          1.车辆电池发生盗抢后的车辆定位查询服务；<br>
          2.车辆电池发生盗抢后的行驶轨迹查询服务；<br>
          3.赠送电池盗抢险30天；<br>
          4.e换电协助理赔服务。
        </span>
      </div>
    </div>
    <div class="sepDiv"></div>
    <div class="bottomDiv">
      <div class="checkProtocol" @click="checkAction">
        <img :src="checkImgSrc" />
      </div>
      <p class="protocolText">
        <span class="protocolRemarkFont">我已确认&nbsp;</span>
        <span class="protocolTextFont" @click="scooterProtocolAction">电动自行车盗抢保险条款</span>
        <span class="protocolRemarkFont">&nbsp;|&nbsp;</span>
        <span class="protocolTextFont" @click="batteryProtocolAction">电池单独盗抢保险条款</span>
        <span class="protocolRemarkFont">&nbsp;|&nbsp;</span>
        <span class="protocolTextFont" @click="usufructTransferProtocolAction">受益权转让协议</span>
      </p>
      <p class="amount">
        <span class="amountFont">{{amount}}</span>
        <span class="unitFont">元</span>
      </p>
      <div class="insureBtn" @click="insureAction">
        <span class="btnTitleFont btnTextTop">立即购买</span>
        <br />
        <span class="btnPromptFont">次日生效</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "BatteryInsurance",
  data() {
    return {
      checked: false,
      checkImgSrc: require("../assets/check_normal.png"),
      amount: this.$store.state.insuranceCost
    };
  },
  computed: {
    listenInsuranceCost() {
      return this.$store.state.insuranceCost;
    }
  },
  watch: {
    listenInsuranceCost: function(val) {
      this.amount = val;
    }
  },
  mounted() {},
  methods: {
    checkAction: function() {
      this.checked = !this.checked;
      this.checkImgSrc = this.checked
        ? require("../assets/check_select.png")
        : require("../assets/check_normal.png");
    },
    scooterProtocolAction: function() {
      window.location.href =
        "https://imgcn.immotor.com/app/protocol/bikeagreement.html";
    },
    batteryProtocolAction: function() {
      window.location.href =
        "https://imgcn.immotor.com/app/protocol/batteryagreement.html";
    },
    usufructTransferProtocolAction: function() {
      window.location.href =
        "https://imgcn.immotor.com/app/protocol/usufructtransfer.html";
    },
    insureAction: function() {
      if (!this.checked) {
        this.$dialog.setDefaultOptions({
          messageAlign: "left",
          confirmButtonText: "我知道了"
        });
        this.$dialog
          .alert({
            title: "",
            message:
              "请阅读并勾选 《电动自行车盗抢保险条款》《电池单独盗抢保险条款》《受益权转让协议》"
          })
          .then(() => {
            // on confirm
          });
      } else {
        //掉用接口 是否可以投保
        this.$router.push({
          path: "/insuranceinput"
        });
      }
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
  background: rgba(248, 248, 248, 1);
}

.header {
  width: 100%;
  height: 310px;
  position: relative;
  z-index: 1;
}

.whyDiv {
  margin: -38px 10px 10px 10px;
  height: 200px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  z-index: 2;
}

.brightSpotDiv {
  margin-left: 10px;
  margin-right: 10px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  padding-bottom: 24px;
}

.sepDiv {
  height: 144px;
}

.sectionTitleFont {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(89, 153, 255, 1);
}

.sectionTextFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
}

.sectionReamrkFont {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(149, 149, 149, 1);
}

.sectionTitle {
  height: 22px;
  margin: auto;
  margin-top: 18px;
  line-height: 22px;
}

.sectionHeader {
  height: 40px;
  padding: 1px;
  position: relative;
}

.sectionLeftImg {
  width: 38px;
  height: 9px;
  top: 27px;
  position: absolute;
}

.sectionRightImg {
  width: 38px;
  height: 9px;
  top: 27px;
  position: absolute;
}

.section1LeftImgPos {
  left: 43px;
}

.section1RightImgPos {
  right: 43px;
}

.section2LeftImgPos {
  left: 90px;
}

.section2RightImgPos {
  right: 90px;
}

.section1ImgUL {
  height: 56px;
  margin-top: 25px;
  display: flex;
}

.section1ImgUL li {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(240, 246, 255, 1);
  margin: auto;
  display: flex;
}

.section1ImgUL li div {
  width: 40px;
  height: 40px;
  margin: auto;
}

.section1TextUL {
  height: 40px;
  margin-top: 10px;
  display: flex;
}

.section1TextUL li {
  width: 72px;
  height: 40px;
  line-height: 20px;
  margin: auto;
}

.section2ContentDiv {
  display: flex;
}

.section2ContentTop {
  margin-top: 14px;
}

.section2ContentDot {
  width: 4px;
  height: 4px;
  margin-top: 14px;
  margin-left: 14px;
  background: rgba(89, 153, 255, 1);
}

.section2ContentTitle {
  width: 72px;
  height: 32px;
  margin-left: 14px;
  line-height: 32px;
  text-align: left;
}

.section2ContentText {
  width: 240px;
  line-height: 24px;
  text-align: left;
  margin-top: 4px;
}

.bottomDiv {
  height: 120px;
  width: 100%;
  left: 0;
  bottom: 0;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
}

.checkProtocol {
  width: 14px;
  height: 14px;
  left: 20px;
  top: 12px;
  position: absolute;
}

.protocolTextFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #ff854a;
}
.protocolRemarkFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #999;
}
.protocolText {
  left: 40px;
  right: 20px;
  height: 36px;
  top: 11px;
  position: absolute;
  line-height: 18px;
  text-align: left;
}
.btnTitleFont {
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
}
.btnPromptFont {
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.6);
  line-height: 17px;
}
.btnTextTop {
  margin-top: 4px;
}
.insureBtn {
  width: 160px;
  height: 44px;
  right: 20px;
  bottom: 24px;
  position: absolute;
  background: rgba(255, 141, 89, 1);
  border-radius: 5px;
  z-index: 99;
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

.amount {
  left: 30px;
  right: 200px;
  height: 33px;
  bottom: 28px;
  position: absolute;
  line-height: 33px;
  text-align: left;
}
</style>
