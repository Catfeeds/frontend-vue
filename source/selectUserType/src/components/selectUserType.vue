<template>
  <div class="mainWrap">
    <p class="mainTitle">请选择你的换电用途？</p>
    <p class="remarkTitle">帮你找寻最适合的产品</p>
    <div class="selectDiv household" @click="householdClick" >
      <img class="imgClass" src="../assets/household.png" />
      <div class="arrowDiv">
        <img class="imgClass" src="../assets/arrow.png" />
      </div>
      <p class="selectTitle">家用生活工作代步</p>
    </div>
    <div class="selectDiv commercial" @click="commercialClick">
      <img class="imgClass" src="../assets/commercial.png" />
      <div class="arrowDiv">
        <img class="imgClass" src="../assets/arrow.png" />
      </div>
      <p class="selectTitle">外卖快递配送</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "SelectUserType",
  data() {
    return {
    };
  },
  methods:{
    householdClick: function(){
      //去C端页面
      let currentUrl =  window.location.href;
      var param = currentUrl.substr(currentUrl.indexOf("?"), currentUrl.length); 
      window.location.href = "https://test.ehuandian.net/immotor/h5vue/consumerGuide/index.html" + param;
    },
    commercialClick: function(){
      //去B端服务网点
      let currentUrl =  window.location.href;
      var param = currentUrl.substr(currentUrl.indexOf("?"), currentUrl.length); 
      window.location.href = "http://imgcn.immotor.com/app/GO5/index.html" + param;
    }
  },
  mounted() {
    document
      .querySelector("body")
      .setAttribute("style", "background-color:#f7f7f7");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("style");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgClass {
  width: 100%;
  height: 100%;
}
.mainTitle {
  margin-top: 37px;
  margin-left: 40px;
  margin-right: 40px;
  height: 67px;
  line-height: 67px;
  text-align: left;
  font-size: 48px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(3, 3, 3, 1);
}

.remarkTitle {
  margin-top: 8px;
  margin-left: 40px;
  margin-right: 40px;
  height: 33px;
  line-height: 33px;
  text-align: left;
  font-size: 24px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
}

.household{
  margin-top: 72px;
}

.commercial{
  margin-top: 20px;
}

.selectDiv {
  margin-left: 30px;
  margin-right: 30px;
  position: relative;
}

.selectTitle {
  left: 207px;
  right: 60px;
  top: 62px;
  height: 45px;
  position: absolute;
  text-align: left;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(3, 3, 3, 1);
  line-height: 45px;
}

.arrowDiv {
  top: 76px;
  right: 40px;
  width: 10px;
  height: 20px;
  position: absolute;
}
</style>
