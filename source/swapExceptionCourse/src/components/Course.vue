<template>
  <div>
    <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>
    <!-- <videoPlayer
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></videoPlayer> -->
  </div>
</template>

<script>

export default {
  name: "Course",
  data() {
    return {
      playerOptions: {
        autoplay: false,
        muted: false,
        loop: false,
        preload: "auto",
        language: "zh-CN",
        aspectRatio: "9:16",
        fluid: true,
        sources: [
          {
            type: "video/mp4",
            src: "https://imgcn.immotor.com/promotion/video/tutorial.mp4"
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
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
