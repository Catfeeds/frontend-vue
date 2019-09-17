<template>
  <div class="pageContent">
    <p class="headerTitle headerTop">下列原因造成的损失、费用，保险人不负责赔偿:</p>
    <div class="content">
      <div class="contentItem headerTop">
        <span class="contentItemLeftText contentFont">(一)</span>
        <span class="contentItemRightText contentFont">利用保险标的从事违法活动;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(二)</span>
        <span class="contentItemRightText contentFont">投保人、被保险人的故意或重大过失行为;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(三)</span>
        <span class="contentItemRightText contentFont">被保险人或其家庭成员饮酒、吸食或注射毒品、被药物麻醉后使用保险标的;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(四)</span>
        <span class="contentItemRightText contentFont">保险标的在竞赛或在营业性维修场所修理期间;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(五)</span>
        <span class="contentItemRightText contentFont">非被保险人允许的驾驶人使用保险标的;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(六)</span>
        <span class="contentItemRightText contentFont">保险标的停放时未上锁;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(七)</span>
        <span class="contentItemRightText contentFont">被保险人索赔时，未能提供出险当地公安机关出具的盗抢或报案证明。</span>
      </div>
    </div>
    <p class="headerTitle headerTop">下列损失、费用，保险人也不负责赔偿:</p>
    <div class="content contentBottom">
      <div class="contentItem headerTop">
        <span class="contentItemLeftText contentFont">(一)</span>
        <span class="contentItemRightText contentFont">保险标的因私自改装、加装致使整车性能不符合国家规定的标准;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(二)</span>
        <span class="contentItemRightText contentFont">保险标的非全车被盗抢，仅车上零部件或附属设备被盗抢或损坏;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(三)</span>
        <span class="contentItemRightText contentFont">被保险人因民事、经济纠纷而导致保险标的被抢劫、抢夺;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(四)</span>
        <span class="contentItemRightText contentFont">被保险人及其家庭成员、被保险人允许的驾驶人的故意行为或违法行为造成的损失;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(五)</span>
        <span class="contentItemRightText contentFont">被保险人知道保险标的被盗后二十四小时内未报案，或自事故发生之日起十日内未发现失窃;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(六)</span>
        <span class="contentItemRightText contentFont">被保险人的间接损失;</span>
      </div>
      <div class="contentItem">
        <span class="contentItemLeftText contentFont">(七)</span>
        <span class="contentItemRightText contentFont">本保险单中载明的免赔额。</span>
      </div>
    </div>
    <div class="bottomDiv">
      <div class="refuseBtn" @click="refuseAction">有部分问题</div>
      <div class="confirmBtn" @click="confirmAction">确认无以上问题</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Instructions",
  data() {
    return {};
  },
  mounted() {},
  methods: {
    refuseAction: function() {
      this.$dialog
        .confirm({
          message: "非常抱歉你暂时无法投保"
        })
        .then(() => {
          // on confirm
          this.$router.push({
            path: "/"
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    confirmAction: function() {
      this.$router.push({
        path: "/pay"
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

.headerTop {
  margin-top: 10px;
}
.headerTitle {
  height: 50px;
  background: rgba(255, 255, 255, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 50px;
  padding-left: 20px;
  text-align: left;
}
.contentBottom {
  margin-bottom: 100px;
}
.content {
  margin-top: 1px;
  padding: 0.1px;
  background: #fff;
  padding-bottom: 10px;
}
.contentItem {
  display: flex;
}
.contentItemLeftText {
  width: 42px;
  height: 26px;
  line-height: 26px;
  margin-left: 10px;
}
.contentItemRightText {
  width: 303px;
  line-height: 26px;
  text-align: left;
}
.contentFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(149, 149, 149, 1);
}
.bottomDiv {
  height: 91px;
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  z-index: 99;
  display: flex;
}
.refuseBtn {
  width: 160px;
  height: 44px;
  margin-left: 20px;
  margin-top: 13px;
  margin-right: 15px;
  border-radius: 5px;
  border: 1px solid rgba(240, 240, 240, 1);
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(149, 149, 149, 1);
  line-height: 44px;
}
.confirmBtn {
  width: 160px;
  height: 44px;
  margin: auto;
  margin-top: 13px;
  margin-right: 20px;
  background: rgba(255, 141, 89, 1);
  border-radius: 5px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
}
</style>
