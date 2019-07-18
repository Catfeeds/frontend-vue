<template>
  <div class="mainBody">
    <div class="headerImgDiv">
      <img src="../assets/header.png" />
      <div class="headerLogoIconDiv">
        <img src="../assets/headerLogo.png" />
      </div>
      <div class="textBK"></div>
      <p class="priceRemark">仅售</p>
      <p class="priceText">1680元</p>
    </div>
    <div class="firstSectionDiv sectionCommon">
      <div class="sectionTitleBKDiv">
        <img src="../assets/sectionTitle.png" />
        <p class="sectionTitle sectionTitleFont">1680元包含以下产品和服务</p>
      </div>
      <div class="firstSectionIcon firstSectionIcon1">
        <img src="../assets/times.png" />
      </div>
      <div class="firstSectionLinkIconLeft firstSectionLinkIcon">
        <img src="../assets/link.png" />
      </div>
      <div class="firstSectionIcon firstSectionIcon2">
        <img src="../assets/scooter.png" />
      </div>
      <div class="firstSectionLinkIconRight firstSectionLinkIcon">
        <img src="../assets/link.png" />
      </div>
      <div class="firstSectionIcon firstSectionIcon3">
        <img src="../assets/battery.png" />
      </div>
      <p class="firstSectionText1 firSectionTextFont">3年600次</p>
      <p class="firstSectionText2 firSectionTextFont">智慧中控</p>
      <p class="firstSectionText3 firSectionTextFont">一颗超级电池</p>
      <p class="firstSectionRemark1 firstSectionRemarkFont">免费充电</p>
      <p class="firstSectionRemark2 firstSectionRemarkFont">智慧大脑</p>
      <p class="firstSectionRemark3 firstSectionRemarkFont">绿色环保</p>
    </div>
    <div class="secondSectionDiv sectionCommon">
      <div class="sectionTitleBKDiv">
        <img src="../assets/sectionTitle.png" />
        <p class="sectionTitle sectionTitleFont">环保回收奖励</p>
        <p class="secondSectionText">
          <span class="recyclingRemarkFont">超级电池+中控回收奖励高达</span>
          <span class="recyclingMoneyFont">1300</span>
          <span class="recyclingUnitFont">元</span>
        </p>
      </div>
    </div>
    <div class="thirdSectionDiv sectionCommon">
      <div class="sectionTitleBKDiv">
        <img src="../assets/sectionTitle.png" />
        <p class="sectionTitle sectionTitleFont">两步即可完成预约 开启换电新时代</p>
      </div>
      <div class="thirdSectionIcon1">
        <img src="../assets/provider.png" />
      </div>
      <div class="thirdSectionArrowIcon">
        <img src="../assets/arrow.png" />
      </div>
      <div class="thirdSectionIcon2">
        <img src="../assets/arrivalDate.png" />
      </div>
      <p class="thirdSectionText1 firSectionTextFont">1. 选择服务商</p>
      <p class="thirdSectionText2 firSectionTextFont">2. 选择到店日期 并提交信息</p>
    </div>
    <div class="fourthSectionDiv sectionCommon">
      <div class="sectionTitleBKDiv">
        <img src="../assets/sectionTitle.png" />
        <p class="sectionTitle sectionTitleFont">为什么选择e换电超级电池包</p>
      </div>
      <p class="fourthSectionText fourSectionTextTop1">1.更安全</p>
      <p class="fourthSectionRemark">革新性的新一代动力电池，多重安全保护；智能换电系统全自助换电，告别充电难与充电安全隐患。</p>
      <p class="fourthSectionText fourSectionTextTopCommon">2.更省钱</p>
      <p class="fourthSectionRemark">一次购买，享受充电免费、1颗超级电池及智慧中控，可随时绿色回收，奖励高达1300元。</p>
      <p class="fourthSectionText fourSectionTextTopCommon">3.更高效</p>
      <p class="fourthSectionRemark">APP预约换电，智能规划寻找电池路径，随时随地满足所需；换电只需3秒，高效便捷，无需等待。</p>
      <p class="fourthSectionText fourSectionTextTopCommon">4.更环保</p>
      <p class="fourthSectionRemark">智能锂电，统一回收再利用，解决铅酸污染，绿色环保。</p>
    </div>
    <p class="bottomPrompt">* 最终解释权归深圳市易马达科技公司所有</p>
    <div class="bottomOprBtn" @click="bottomAction">
      <span v-if="hasGroup" class="bottomTitleFont">购买超级电池+智慧中控</span>
      <span v-if="hasGroup" class="bottomAmountFont">&nbsp;&nbsp;¥1680</span>
      <span v-else class="bottomTitleFont">马上预约服务商 ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConsumerGuide",
  data() {
    return {
      hasGroup: false
    };
  },
  methods: {
    bottomAction: function() {
      //有群组直接去购买电池套餐页面
      if (this.hasGroup) {
        window.location.href =
          "https://test.ehuandian.net/immotor/h5vue/buyingBatteries/index.html";
      }
      //无群组去预约
      else {
        let currentUrl = window.location.href;
        var param = "";
        if (currentUrl.indexOf("?") != -1) {
          param = currentUrl.substr(currentUrl.indexOf("?"), currentUrl.length);
        }
        if (param && param.length > 0) {
          param += "&appointment=1";
        } else {
          param = "?appointment=1";
        }
        window.location.href =
          "https://test.ehuandian.net/immotor/h5vue/providersList/index.html" +
          param;
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
    var by_client = this.getUrlParam("by_client");
    if (by_client == "1") {
      this.hasGroup = true;
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

.sectionTitleFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.firSectionTextFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(59, 59, 59, 1);
}
.firstSectionRemarkFont {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
}
.recyclingRemarkFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(59, 59, 59, 1);
}
.recyclingMoneyFont {
  font-size: 40px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #863d24;
}
.recyclingUnitFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #863d24;
}
.mainBody {
  background: linear-gradient(
    181deg,
    rgba(255, 234, 202, 1) 0%,
    rgba(255, 200, 135, 1) 47%,
    rgba(255, 198, 150, 1) 100%
  );
}
.headerImgDiv {
  width: 100%;
  height: 800px;
  position: relative;
}
.headerLogoIconDiv {
  width: 534px;
  height: 157px;
  left: 108px;
  top: 94px;
  position: absolute;
}

.sectionCommon {
  margin-left: 20px;
  margin-right: 20px;
  background: linear-gradient(
    360deg,
    rgba(253, 231, 197, 1) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  box-shadow: 0px 10px 10px 0px rgba(222, 89, 0, 0.3);
  border-radius: 10px;
  position: relative;
}

.firstSectionDiv {
  margin-top: -18px;
  height: 400px;
}
.sectionTitleBKDiv {
  height: 68px;
  margin-left: 55px;
  margin-right: 55px;
}
.sectionTitle {
  height: 40px;
  left: 100px;
  right: 100px;
  top: 10px;
  position: absolute;
  text-align: center;
  line-height: 40px;
}
.firstSectionIcon {
  width: 113px;
  height: 113px;
  top: 125px;
  position: absolute;
}
.firstSectionIcon1 {
  left: 95px;
}
.firstSectionIcon2 {
  left: 299px;
}
.firstSectionIcon3 {
  right: 95px;
}
.firstSectionLinkIcon {
  width: 17px;
  height: 17px;
  top: 173px;
  position: absolute;
}
.firstSectionLinkIconLeft {
  left: 243px;
}
.firstSectionLinkIconRight {
  right: 243px;
}

.firstSectionText1 {
  width: 129px;
  height: 40px;
  left: 87px;
  top: 258px;
  position: absolute;
  line-height: 40px;
}
.firstSectionText2 {
  width: 114px;
  height: 40px;
  left: 296px;
  top: 258px;
  position: absolute;
  line-height: 40px;
}
.firstSectionText3 {
  width: 174px;
  height: 40px;
  right: 63px;
  top: 258px;
  position: absolute;
  line-height: 40px;
}
.firstSectionRemark1 {
  width: 102px;
  height: 33px;
  top: 303px;
  left: 101px;
  position: absolute;
  line-height: 33px;
}
.firstSectionRemark2 {
  width: 102px;
  height: 33px;
  top: 303px;
  left: 304px;
  position: absolute;
  line-height: 33px;
}
.firstSectionRemark3 {
  width: 102px;
  height: 33px;
  top: 303px;
  right: 99px;
  position: absolute;
  line-height: 33px;
}

.secondSectionDiv {
  margin-top: 20px;
  height: 240px;
}

.secondSectionText {
  margin-top: 63px;
  height: 56px;
  line-height: 56px;
}

.thirdSectionDiv {
  margin-top: 20px;
  height: 448px;
}

.thirdSectionIcon1 {
  width: 161px;
  height: 157px;
  left: 101px;
  top: 113px;
  position: absolute;
}
.thirdSectionIcon2 {
  width: 178px;
  height: 150px;
  right: 107px;
  top: 127px;
  position: absolute;
}
.thirdSectionArrowIcon {
  width: 20px;
  height: 33px;
  left: 346px;
  top: 182px;
  position: absolute;
}
.thirdSectionText1 {
  width: 175px;
  height: 40px;
  left: 95px;
  top: 300px;
  position: absolute;
  line-height: 40px;
}
.thirdSectionText2 {
  width: 205px;
  height: 80px;
  right: 86px;
  top: 300px;
  position: absolute;
  line-height: 40px;
}
.fourthSectionDiv {
  margin-top: 20px;
  height: 710px;
}
.fourthSectionText{
  margin-left: 30px;
  margin-right: 24px;
  height:40px;
  line-height: 40px;
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(134, 61, 36, 1);
  text-align: left;
}
.fourthSectionRemark{
  margin-left: 30px;
  margin-right: 24px;
  margin-top: 1px;
  height:80px;
  line-height: 40px;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(59, 59, 59, 1);
  text-align: left;
}
.fourSectionTextTop1{
  margin-top: 52px;
}
.fourSectionTextTopCommon{
  margin-top: 30px;
}
.bottomPrompt {
  margin-top: 30px;
  padding-bottom: 147px;
  height: 33px;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(134, 61, 36, 1);
  line-height: 33px;
}

.interpretationText {
  width: 100%;
  height: 33px;
  left: 0;
  top: 658px;
  position: absolute;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(134, 61, 36, 1);
  line-height: 33px;
}

.bottomOprBtn {
  width: 100%;
  height: 100px;
  left: 0;
  bottom: 0;
  position: fixed;
  background: linear-gradient(
    180deg,
    rgba(254, 214, 76, 1) 0%,
    rgba(245, 171, 29, 1) 100%
  );
  box-shadow: 0px -10px 10px 0px rgba(255, 164, 120, 0.41);
  text-align: center;
  line-height: 100px;
}

.bottomTitleFont {
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(134, 61, 36, 1);
}

.bottomAmountFont {
  font-size: 36px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(223, 40, 40, 1);
}
</style>
