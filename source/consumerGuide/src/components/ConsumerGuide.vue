<template>
  <div>
    <div class="firstDiv">
      <img class="imgClass" src="../assets/H1.png" />
      <div class="textBK"></div>
      <p class="priceRemark">仅售</p>
      <p class="priceText">1680元</p>
    </div>
    <div class="secondDiv">
      <img class="imgClass" src="../assets/H2.png" />
      <p class="secondSectionTitle sectionTitle">1680元包含以下产品和服务</p>
    </div>
    <div class="thirdDiv">
      <img class="imgClass" src="../assets/H3.png" />
      <p class="thirdSection1Text1 section1Font">3年600次</p>
      <p class="thirdSection1Text2 section1Font">智能中控</p>
      <p class="thirdSection1Text3 section1Font">一颗超级电池</p>
      <p class="thirdSection2Text1 section2Font">免费充电</p>
      <p class="thirdSection2Text2 section2Font">智慧大脑</p>
      <p class="thirdSection2Text3 section2Font">绿色环保</p>
      <p class="thirdSectionTitle sectionTitle">环保回收奖励</p>
    </div>
    <div class="forthDiv">
      <img class="imgClass" src="../assets/H4.png" />
      <p class="forthText1">
        <span class="recyclingRemarkFont">超级电池+中控最高回收奖励</span>
        <span class="recyclingMoneyFont">1300</span>
        <span class="recyclingUnitFont">元</span>
      </p>
      <p class="forthSectionTitle sectionTitle">两步即可完成预约 开启换电新时代</p>
      <p class="forthSectionText1 recyclingRemarkFont">1. 选择服务商</p>
      <p class="forthSectionText2 recyclingRemarkFont">2. 选择到店日期 并提交信息</p>
      <p class="fifthSectionTitle sectionTitle">为什么选择e换电超级电池</p>
    </div>
    <div class="fifthDiv">
      <img class="imgClass" src="../assets/H5.png" />
      <p class="fifthTitle fifthTitle1Top">1.更安全</p>
      <p class="fifthText fifthText1Top">革新性的新一代动力电池，多重安全保护；智能换电系统全自助换电，告别充电难与充电安全隐患。</p>
      <p class="fifthTitle fifthTitle2Top">2.更省钱</p>
      <p class="fifthText fifthText2Top">一次购买，享受充电免费、1颗超级电池及智能中控，可随时绿色回收，奖励高达1300元。</p>
      <p class="fifthTitle fifthTitle3Top">3.更高效</p>
      <p class="fifthText fifthText3Top">APP预约换电，智能规划寻找电池路径，随时随地满足所需；换电只需3秒，高效便捷，无需等待。</p>
      <p class="fifthTitle fifthTitle4Top">4.更环保</p>
      <p class="fifthText fifthText4Top">智能锂电，统一回收再利用，解决铅酸污染，绿色环保。</p>
      <p class="interpretationText">* 最终解释权归深圳市易马达科技公司所有</p>
    </div>
    <div class="bottomOprBtn" @click="bottomAction" >
      <span v-if="hasGroup" class="bottomTitleFont">购买超级电池+智慧中控</span>
      <span v-if="hasGroup" class="bottomAmountFont" >&nbsp;&nbsp;¥1680</span>
      <span v-else class="bottomTitleFont">马上预约服务商 ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConsumerGuide",
  data() {
    return {
      hasGroup: true
    };
  },
  methods:{
    bottomAction: function(){
      //有群组直接去购买电池套餐页面
      if(this.hasGroup){
        window.location.href = "https://test.ehuandian.net/immotor/h5vue/buyingBatteries/index.html";
      }
      //无群组去预约
      else{

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
}
.firstDiv {
  width: 100%;
  height: 397px;
  position: relative;
}
.secondDiv {
  width: 100%;
  height: 480px;
  position: relative;
}
.thirdDiv {
  width: 100%;
  height: 419px;
  position: relative;
}
.forthDiv {
  width: 100%;
  height: 717px;
  position: relative;
}
.fifthDiv {
  width: 100%;
  height: 838px;
  position: relative;
}

.textBK {
  width: 230px;
  height: 18px;
  left: 296px;
  top: 354px;
  position: absolute;
  background: rgba(253, 204, 156, 1);
}
.priceText {
  width: 212px;
  height: 92px;
  left: 302px;
  top: 288px;
  position: absolute;
  text-align: center;
  font-size: 66px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(249, 107, 14, 1);
  line-height: 92px;
  -webkit-text-stroke: 2px rgba(249, 107, 14, 1);
  text-stroke: 2px rgba(249, 107, 14, 1);
}
.priceRemark {
  width: 57px;
  height: 40px;
  left: 225px;
  top: 327px;
  position: absolute;
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(134, 61, 36, 1);
  line-height: 40px;
}

.sectionTitle {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.secondSectionTitle {
  width: 100%;
  height: 40px;
  left: 0;
  top: 396px;
  position: absolute;
  text-align: center;
  line-height: 40px;
}

.section1Font {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(59, 59, 59, 1);
}

.thirdSection1Text1 {
  width: 125px;
  height: 40px;
  left: 109px;
  top: 164px;
  position: absolute;
  line-height: 40px;
  text-align: center;
}
.thirdSection1Text2 {
  width: 114px;
  height: 40px;
  left: 318px;
  top: 164px;
  position: absolute;
  line-height: 40px;
  text-align: center;
}
.thirdSection1Text3 {
  width: 170px;
  height: 40px;
  left: 495px;
  top: 164px;
  position: absolute;
  line-height: 40px;
  text-align: center;
}

.section2Font {
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
}

.thirdSection2Text1 {
  width: 98px;
  height: 33px;
  left: 123px;
  top: 219px;
  position: absolute;
  line-height: 33px;
  text-align: center;
}

.thirdSection2Text2 {
  width: 98px;
  height: 33px;
  left: 326px;
  top: 219px;
  position: absolute;
  line-height: 33px;
  text-align: center;
}

.thirdSection2Text3 {
  width: 98px;
  height: 33px;
  left: 531px;
  top: 219px;
  position: absolute;
  line-height: 33px;
  text-align: center;
}
.thirdSectionTitle {
  width: 100%;
  height: 40px;
  left: 0;
  top: 336px;
  position: absolute;
  text-align: center;
  line-height: 40px;
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

.forthText1 {
  width: 100%;
  height: 56px;
  left: 0;
  top: 30px;
  position: absolute;
  text-align: center;
  line-height: 40px;
}

.forthSectionTitle {
  width: 100%;
  height: 40px;
  left: 0;
  top: 177px;
  position: absolute;
  line-height: 40px;
  text-align: center;
}

.forthSectionText1 {
  width: 171px;
  height: 40px;
  left: 117px;
  top: 467px;
  position: absolute;
  line-height: 40px;
}

.forthSectionText2 {
  width: 205px;
  height: 80px;
  left: 437px;
  top: 467px;
  position: absolute;
  line-height: 40px;
}

.fifthSectionTitle {
  width: 100%;
  height: 40px;
  left: 0;
  top: 645px;
  position: absolute;
  line-height: 40px;
  text-align: center;
}
.fifthTitle {
  left: 50px;
  right: 50px;
  height: 40px;
  position: absolute;
  text-align: left;
  line-height: 40px;
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #863d24;
}

.fifthText {
  left: 50px;
  right: 50px;
  height: 80px;
  position: absolute;
  text-align: left;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #3b3b3b;
}

.fifthTitle1Top {
  top: 30px;
}

.fifthText1Top {
  top: 70px;
}

.fifthTitle2Top {
  top: 180px;
}

.fifthText2Top {
  top: 220px;
}

.fifthTitle3Top {
  top: 330px;
}

.fifthText3Top {
  top: 370px;
}

.fifthTitle4Top {
  top: 480px;
}

.fifthText4Top {
  top: 520px;
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
