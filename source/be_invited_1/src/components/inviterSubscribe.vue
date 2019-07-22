<template>
  <div class="inviterSubscribe">
      <div class="inviterSubscribe_top relative">
        <img class="relative" src="../assets/images/invited-04 2@2x(1).png" alt="">
        <div class="inviterSubscribe_rule relative">
          <img class="absolute" src="../assets/images/join@2x.png" alt="">
          <dl class="absolute">
            <dt>您可按以下方式加入e换电，领取奖励！</dt>
            <dd><span>方法1、</span>工作人员将主动与您取得联系，告知附近车行服务网点，请注意接听。</dd>
            <dd><span>方法2、</span>邀请人告知您最近的车行服务网点。</dd>
            <dd><span>方法3、</span>下载并打开e换电APP，点击【服务网点】，前往最近的车行服务网点。</dd>
            <dd>若您已在指定车行服务网点，请在工作人员指导下购买或租用e换电认证的电动车P，即可使用换电服务。</dd>
          </dl>
        </div>
        <div class="inviterSubscribe_guide relative">
          <img class="absolute" src="../assets/images/use@2x.png" alt="">
          <ul class="absolute">
            <li class="guide_1"><img src="../assets/images/register@2x.png" alt=""></li>
            <li class="guide_2"><img src="../assets/images/deposit@2x.png" alt=""></li>
            <li class="guide_3"><img src="../assets/images/buy@2x.png" alt=""></li>
          </ul>
          <ol class="absolute">
            <li class="guide_1"><img src="../assets/images/d@2x.png" alt=""></li>
            <li class="guide_2"><img src="../assets/images/d@2x.png" alt=""></li>
          </ol>
        </div>
      </div>
      <div class="inviterSubscribe_bottom relative">
        <img class="relative" src="../assets/images/invited-04 2@2x.png" alt="">
        <div class="inviterSubscribe_download relative">
          <img class="absolute" src="../assets/images/download@4x 2@2x.png" alt="" @click="e_download()">
        </div>
        <div class="inviterSubscribe_enjoy relative">
          <img class="absolute" src="../assets/images/enjoy@2x.png" alt="">
          <ul class="absolute">
            <li>1、远离电动车充电安全隐患。</li>
            <li>2、购买或租赁，多模式任您挑选，还可免费换电。</li>
            <li>3、超级电池，超长续航。</li>
            <li>4、3秒换电，随时随地，无限续航。</li>
            <li>5、智能锂电，有效解决铅酸污染。</li>
            <li>6、智能中控，实时监控、精准定位、异动报警。</li>
          </ul>
        </div>
        <div class="inviterSubscribe_video relative">
          <img class="absolute" src="../assets/images/guide@2x.png" alt="">
           <div class="video_img absolute">
             <video id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" poster="../assets/images/video2@2x.png"
                data-setup="{}">
                <source src="https://imgcn.immotor.com/promotion/video/exchanging.mp4" type="video/mp4">
                <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">
                <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">
                <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser
                    that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p>
            </video>
          </div>
        </div>
        <div class="inviterSubscribe_phone relative">官方客服热线：0755-27787220</div>
      </div>
  </div>
</template>

<script>
export default {
  name: "inviterSubscribe",
  data() {
    return {
     
    };
  },
  mounted() {
  
  },
  methods:{
      e_download(){
         window.location.href="http://download.immotor.com/app/downloads/ehuandian";
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to _this component only -->
<style scoped>
.inviterSubscribe{
  height: 3012px;
  overflow: hidden;
}
.relative{
  position: relative;
}
.absolute{
  position: absolute;
}
.inviterSubscribe_top{
  width: 750px;
  height: 1465px;
  left: 50%;
  margin-left: -375px;
}
.inviterSubscribe_top img{
  width: 750px;
  height: 1465px;
}
.inviterSubscribe_top .inviterSubscribe_rule{
  top: -1318px;
  width: 665px;
  height: 656px;
  left: 50%;
  margin-left: -332.5px;
}
.inviterSubscribe_top .inviterSubscribe_rule img{
  width: 665px;
  height: 656px;
}
.inviterSubscribe_rule dl{
  width:665px;
  height:24px;
  font-size:24px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(255,253,254,1);
  line-height:36px;
  /* opacity: 0.8; */
  padding-left: 29px;
  padding-right: 31px;
}
.inviterSubscribe_rule dl dt{
  font-family:SourceHanSansCN-Bold;
  font-weight:bold;
  margin-top: 136px;
  opacity: 1!important;
}
.inviterSubscribe_rule dl dd{
  opacity: 0.8;
  margin-top: 36px;
  padding-left: 100px;
}
.inviterSubscribe_rule dl dd span{
  margin-left: -100px;
}
.inviterSubscribe_rule dl dd:last-child{
  margin-top: 48px;
  padding-left: 40px;
}
.inviterSubscribe_top .inviterSubscribe_guide{
  top: -1262px;
  width: 664px;
  height: 641px;
  left: 50%;
  margin-left: -332px;
}
.inviterSubscribe_top .inviterSubscribe_guide img{
  width: 664px;
  height: 641px;
}
.inviterSubscribe_guide ul{
  display: flex;
  width: 664px;
  height: 641px;
  margin-top: 175px;
}
.inviterSubscribe_guide ol{
  display: flex;
  margin-top: 416px;
  width: 664px;
  height: 641px;
}
.inviterSubscribe_guide ul li img{
  width: 106px!important;
  height: 106px!important;
}
.inviterSubscribe_guide ol li img{
  width: 106px!important;
  height: 106px!important;
}
.inviterSubscribe_guide .guide_1{
  padding-left: 43px;
}
.inviterSubscribe_guide .guide_2{
  padding-left: 130px;
}
.inviterSubscribe_guide .guide_3{
  padding-left: 137px;
}
.inviterSubscribe_bottom{
  width: 750px;
  height: 1547px;
  left: 50%;
  margin-left: -375px;
}
.inviterSubscribe_bottom img{
  width: 750px;
  height: 1547px;
}
.inviterSubscribe_download{
  top: -1482px;
  width:433px;
  height:90px;
  left: 50%;
  margin-left: -216.5px;
}
.inviterSubscribe_download img{
  width:433px;
  height:90px;
}
.inviterSubscribe_enjoy{
  top: -1409px;
  width: 665px;
  height: 505px;
  left: 50%;
  margin-left: -332.5px;
}
.inviterSubscribe_enjoy img{
  width: 665px;
  height: 505px;
}
.inviterSubscribe_enjoy ul{
  width:664px;
  height:504px;
  padding-top: 146px;
  padding-left: 85px;
}
.inviterSubscribe_enjoy ul li{
  font-size:24px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(255,253,254,1);
  opacity: 0.8;
  line-height: 48px;
}
.inviterSubscribe_video{
  top: -1333px;
  width: 665px;
  height: 663px;
  left: 50%;
  margin-left: -332.5px;
}
.inviterSubscribe_video img{
  width: 665px;
  height: 663px;
}
.g_video{
  top: -1856px;
  width: 665px;
  height: 554px;
  left: 50%;
  margin-left: -332.5px;
}
.g_video img{
  width: 665px;
  height: 781px;
}
.g_video .video_img{
  top: 0;
}
#my-video{
  width: 602px;
  height: 338px;
  margin-top: 142px;
  margin-left: 26px;
}
.video-js .vjs-big-play-button{
  width: 115px;
  height: 115px;
}
.inviterSubscribe_phone{
  top: -1389px;
  width: 750px;
  text-align: center;
  font-size:24px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(255,253,254,1);
  opacity: 0.8;
}
</style>
