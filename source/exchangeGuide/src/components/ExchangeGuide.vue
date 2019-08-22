<template>
  <div class="pageContent">
    <div class="header">
      <p class="headerTitle">1分钟了解e换电</p>
      <p class="headerText">- 换电使用指南 -</p>
      <div class="headerVideoDiv">
        <!-- <video
          id="my-video"
          class="video-js vjs-big-play-centered"
          preload="auto"
          poster="../assets/video.png"
          data-setup="{}"
        >
          <source src="https://imgcn.immotor.com/promotion/video/invitation.mp4" type="video/mp4" />
          <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm" />
          <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg" />
          <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser
            that
            <a
              href="http://videojs.com/html5-video-support/"
              target="_blank"
            >supports HTML5 video</a>
          </p>
        </video>-->
        <videoPlayer
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        ></videoPlayer>
      </div>
    </div>
    <div class="mainContainer">
      <p class="mainContainerTitle">- 四部助你使用e换电 -</p>
      <div class="stepBeginImgDiv">
        <img src="../assets/step_0.png" />
      </div>
      <div class="stepDiv step1Margin">
        <div class="stepTextIconDiv stepContentLeft">
          <img src="../assets/StepText_1.png" />
        </div>
        <p class="stepTitle stepTextLeft">获取升级电动车</p>
        <p class="stepText stepText1 stepTextLeft">支持新车购买</p>
        <p class="stepText stepText2 stepTextLeft">/ 旧车改装</p>
        <div class="stepIconDiv stepContentRight">
          <img src="../assets/step_1.png" />
        </div>
      </div>
      <div class="stepDiv stepMargin">
        <div class="stepTextIconDiv stepTextIconRight">
          <img src="../assets/StepText_2.png" />
        </div>
        <p class="stepTitle stepTextRight">租赁超级电池</p>
        <p class="stepText stepText1 stepTextRight">app线上缴纳押金</p>
        <p class="stepText stepText2 stepTextRight">/ 线下代理商代收押金</p>
        <div class="stepIconDiv stepContentLeft">
          <img src="../assets/step_2.png" />
        </div>
      </div>
      <div class="stepDiv stepMargin">
        <div class="stepTextIconDiv stepContentLeft">
          <img src="../assets/StepText_3.png" />
        </div>
        <p class="stepTitle stepTextLeft">购买换电套餐</p>
        <p class="stepText stepText1 stepTextLeft">App线上购买套餐</p>
        <p class="stepText stepText2 stepTextLeft">/ 线下代理商代收费用</p>
        <div class="stepIconDiv stepContentRight">
          <img src="../assets/step_3.png" />
        </div>
      </div>
      <div class="stepDiv stepMargin">
        <div class="stepTextIconDiv stepTextIconRight">
          <img src="../assets/StepText_4.png" />
        </div>
        <p class="stepTitle stepTextRight">开始换电</p>
        <p class="stepText stepText1 stepTextRight">服务网点绑定电池</p>
        <p class="stepText stepText2 stepTextRight">/ 换电柜进行换电</p>
        <div class="stepIconDiv stepContentLeft">
          <img src="../assets/step_4.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'

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
        poster:  require('../assets/video_bk.png'),
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" ,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: false 
         }
      }
    };
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
  margin-left: 20px;
  margin-right: 20px;
  margin-top: -48px;
  margin-bottom: 48px;
  height: 1134px;
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

.video-js .vjs-big-play-button {
  width: 115px;
  height: 115px;
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
  height: 136px;
  position: relative;
}

.step1Margin {
  margin-top: 40px;
}

.stepMargin {
  margin-top: 60px;
}

.stepIconDiv {
  width: 136px;
  height: 136px;
  top: 0;
  position: absolute;
}

.stepTextIconDiv {
  width: 85px;
  height: 37px;
  top: 12px;
  position: absolute;
}

.stepTextIconRight {
  right: 64px;
}

.stepContentLeft {
  left: 20px;
}

.stepContentRight {
  right: 20px;
}

.stepTitle {
  width: 150px;
  height: 25px;
  top: 55px;
  position: absolute;
  font-size: 18px;
  font-family: PingFangSC;
  font-weight: 500;
  color: rgba(64, 64, 64, 1);
  line-height: 25px;
  text-align: left;
}

.stepText {
  width: 150px;
  height: 20px;
  position: absolute;
  font-size: 14px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  line-height: 20px;
  text-align: left;
}
.stepText1 {
  top: 86px;
}
.stepText2 {
  top: 106px;
}
.stepTextLeft {
  left: 20px;
}

.stepTextRight {
  right: 0;
}
</style>
