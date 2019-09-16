<template>
  <div class="pageContent">
    <div class="header">
      <p class="headerTitle">新手指引</p>
      <p class="headerText">- 1分钟了解e换电 -</p>
      <div class="headerVideoDiv">
        <videoPlayer
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></videoPlayer>
      </div>
    </div>
    <div class="mainContainer">
      <p class="mainContainerTitle">- 五步助你使用e换电 -</p>
      <div class="stepBeginImgDiv">
        <img src="../assets/step_0.png" />
      </div>
      <div class="stepDiv step1Margin">
        <div class="stepTextIconDiv stepContentLeft">
          <img src="../assets/StepText_1.png" />
        </div>
        <div class="stepTextContent stepContentLeft">
          <p class="stepTitle">到线下服务网点改装车辆</p>
          <p class="stepText">支持新车购买/旧车改装</p>
        </div>
        <div class="stepGotoBtn leftBtnPos" @click="sitesAction">
          <div class="gotoImg">
            <img src="../assets/goto.png" />
          </div>
          <p class="gotoText">查看服务网点</p>
        </div>
        <div class="stepIconDiv stepContentRight">
          <img src="../assets/step_1.png" />
        </div>
      </div>
      <div class="stepDiv stepMargin">
        <div class="stepTextIconDiv stepTextIconRight">
          <img src="../assets/StepText_2.png" />
        </div>
        <div class="stepTextContent stepContentRight">
          <p class="stepTitle">租赁电池和中控</p>
          <p class="stepText">app线上缴纳押金/线下服 务网点代收押金</p>
        </div>
        <div class="stepGotoBtn rightBtnPos" @click="rentBatteryAction">
          <div class="gotoImg">
            <img src="../assets/goto.png" />
          </div>
          <p class="gotoText">去缴纳</p>
        </div>
        <div class="stepIconDiv stepContentLeft">
          <img src="../assets/step_2.png" />
        </div>
      </div>
      <div class="stepDiv stepMargin">
        <div class="stepTextIconDiv stepContentLeft">
          <img src="../assets/StepText_3.png" />
        </div>
        <div class="stepTextContent stepContentLeft">
          <p class="stepTitle">绑定超级电池</p>
          <p class="stepText">线下服务网点获取电池后 app绑定电池</p>
        </div>
        <div class="stepGotoBtn leftBtnPos" @click="bindBatteryAction">
          <div class="gotoImg">
            <img src="../assets/goto.png" />
          </div>
          <p class="gotoText">去绑定</p>
        </div>
        <div class="stepIconDiv stepContentRight">
          <img src="../assets/step_3.png" />
        </div>
      </div>
      <div class="stepDiv stepMargin">
        <div class="stepTextIconDiv stepTextIconRight">
          <img src="../assets/StepText_4.png" />
        </div>
        <div class="stepTextContent stepContentRight">
          <p class="stepTitle">购买换电套餐</p>
          <p class="stepText">APP线上购买套餐/线下服务网点收取费用</p>
        </div>
        <div class="stepGotoBtn rightBtnPos" @click="buyPackageAction">
          <div class="gotoImg">
            <img src="../assets/goto.png" />
          </div>
          <p class="gotoText">去购买</p>
        </div>
        <div class="stepIconDiv stepContentLeft">
          <img src="../assets/step_4.png" />
        </div>
      </div>
      <div class="stepDiv stepMargin">
        <div class="stepTextIconDiv stepContentLeft">
          <img src="../assets/StepText_5.png" />
        </div>
        <div class="stepTextContent stepContentLeft">
          <p class="stepTitle">开始换电</p>
          <p class="stepText">换电柜进行换电</p>
        </div>
        <div class="stepGotoBtn leftBtnPos" @click="swapBatteryAction">
          <div class="gotoImg">
            <img src="../assets/goto.png" />
          </div>
          <p class="gotoText">开始换电</p>
        </div>
        <div class="stepIconDiv stepContentRight">
          <img src="../assets/step_5.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "video.js/dist/video-js.css";

import { videoPlayer } from "vue-video-player";

export default {
  name: "ExchangeGuide",
  components: {
    videoPlayer
  },
  data() {
    return {
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: false,
        preload: "auto",
        language: "zh-CN",
        aspectRatio: "16:9",
        fluid: true,
        sources: [
          {
            type: "video/mp4",
            src: "https://imgcn.immotor.com/promotion/video/invitation.mp4"
          }
        ],
        poster: require("../assets/video.png"),
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试",
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: false
        }
      }
    };
  },
  methods: {
    getParam: function(search, name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    },
    toNum: function(a) {
      var a = a.toString();
      var c = a.split(".");
      var num_place = ["", "0", "00", "000", "0000"],
        r = num_place.reverse();
      for (var i = 0; i < c.length; i++) {
        var len = c[i].length;
        c[i] = r[len] + c[i];
      }
      var res = c.join("");
      return res;
    },

    sitesAction: function() {
      var param = "";
      if (window.location.href.indexOf("?") != -1) {
        param = window.location.href.substr(
          window.location.href.indexOf("?"),
          window.location.href.length
        );
      }
      window.location.href =
        "https://imgcn.immotor.com/app/GO5/index.html" + param;
    },
    isSupportLogin: function(){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1;
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        var version = this.getParam(u, "appversion");
        if (this.toNum(version) > this.toNum("1.4.5")) {
          return true;
        }
      } else if (isiOS) {
        var version = this.getParam(u, "appversion");
        if (this.toNum(version) > this.toNum("1.5.1")) {
          return true;
        }
      }
      return false;
    },
    rentBatteryAction: function() {
      if(this.isSupportLogin()){
        window.location.href = "immotor://app-links/battery";
      }
      else{
        window.location.href = "IMMOTOR://showPrompt?code=0&message=版本过低，请升级app。";
      }
    },
    bindBatteryAction: function() {
      if(this.isSupportLogin()){
        window.location.href = "immotor://app-links/battery";
      }
      else{
        window.location.href = "IMMOTOR://showPrompt?code=0&message=版本过低，请升级app。";
      }
    },
    buyPackageAction: function() {
      if(this.isSupportLogin()){
        window.location.href = "immotor://app-links/buyPackage";
      }
      else{
        window.location.href = "IMMOTOR://showPrompt?code=0&message=版本过低，请升级app。";
      }
    },
    swapBatteryAction: function() {
      if(this.isSupportLogin()){
        window.location.href = "immotor://app-links/homepage";
      }
      else{
        window.location.href = "IMMOTOR://showPrompt?code=0&message=版本过低，请升级app。";
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
  width: 100%;
  padding: 1px;
}

.header {
  height: 428px;
  padding: 1px;
  background: linear-gradient(
    180deg,
    rgba(130, 189, 253, 1) 0%,
    rgba(127, 142, 253, 1) 100%
  );
  position: relative;
}

.mainContainer {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: -48px;
  margin-bottom: 20px;
  height: 1648px;
  padding: 1px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  position: relative;
}

.headerTitle {
  margin: auto;
  margin-top: 30px;
  height: 56px;
  font-size: 40px;
  font-family: PingFangSC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 56px;
}

.headerText {
  height: 25px;
  margin: auto;
  margin-top: 6px;
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 300;
  color: rgba(255, 255, 255, 1);
  line-height: 25px;
  letter-spacing: 5px;
}
.headerVideoDiv {
  width: 306px;
  height: 170px;
  margin: auto;
  margin-top: 38px;
  position: relative;
}
#my-video {
  widows: 100%;
  height: 100%;
}
.inviterSubscribe_phone {
  top: -695px;
  width: 100%;
  text-align: center;
  font-size: 24px;
  font-family: SourceHanSansCN-Regular;
  font-weight: 400;
  color: rgba(255, 253, 254, 1);
  opacity: 0.8;
}
.mainContainerTitle {
  height: 25px;
  margin: auto;
  margin-top: 36px;
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(130, 189, 253, 1);
  line-height: 25px;
  letter-spacing: 2px;
}
.stepBeginImgDiv {
  width: 250px;
  height: 250px;
  margin: auto;
  margin-top: 20px;
}
.stepDiv {
  height: 187px;
  position: relative;
}
.step1Margin {
  margin-top: 35px;
}
.stepMargin {
  margin-top: 70px;
}
.stepIconDiv {
  width: 136px;
  height: 136px;
  bottom: 0;
  position: absolute;
}
.stepTextIconDiv {
  width: 90px;
  height: 35px;
  top: 0;
  position: absolute;
}
.stepTextIconRight {
  right: 85px;
}
.stepContentLeft {
  left: 20px;
}
.stepContentRight {
  right: 16px;
}
.stepTextContent {
  width: 160px;
  height: 106px;
  top: 41px;
  position: absolute;
}
.stepTitle {
  width: 160px;
  position: relative;
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 500;
  color: rgba(64, 64, 64, 1);
  line-height: 25px;
  text-align: left;
}
.stepText {
  width: 160px;
  margin-top: 6px;
  position: relative;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
  text-align: left;
}
.stepGotoBtn {
  width: 140px;
  height: 40px;
  bottom: 0;
  position: absolute;
  border-radius: 22px;
  border: 1px solid rgba(255, 141, 89, 1);
  display: flex;
}
.gotoText {
  margin-top: 10px;
  margin-left: 10px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(255, 141, 89, 1);
  line-height: 20px;
  text-align: left;
}
.gotoImg {
  margin-top: 15px;
  margin-left: 18px;
  width: 10px;
  height: 10px;
}

.leftBtnPos {
  left: 20px;
}
.rightBtnPos {
  right: 35px;
}
</style>
