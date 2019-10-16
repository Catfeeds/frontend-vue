<template>
  <div class="pageContent">
    <div v-if="isEhdWebview">
      <div class="header">
        <img src="../assets/header.png" />
        <p class="headerText">已有{{collectNum}}名用户集齐</p>
        <div class="headerRules" @click="ruleAction">
          <img src="../assets/rules.png" />
        </div>
      </div>
      <div v-if="hasRunLottery" class="collect">
        <img src="../assets/cardBK.png" />
        <div class="prizeBK">
          <img src="../assets/prizeBK.png" />
          <div class="freeDayBK" v-if="prizeObj">
            <img src="../assets/freeday.png" />
            <p class="freeDayNum">{{prizeObj.days}}天</p>
            <p class="freeDayDesc">免费换电</p>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="fiveStarParent" v-if="hasFivestarCard&&fiveStarCardObj">
          <div class="fiveStarBK">
            <img src="../assets/cardBK.png" />
          </div>
          <div class="cardPedestal">
            <img src="../assets/pedestal.png" />
          </div>
          <div class="fiveStarCard">
            <img
              src="../assets/fiveStar.png"
              v-if="fiveStarCardObj.showCard"
              v-bind:class="fiveStarCardAniClass"
            />
          </div>
          <div class="light_left">
            <img
              src="../assets/light_left.png"
              v-if="fiveStarCardObj.showLight"
              v-bind:class="cardLightAniClass"
            />
          </div>
          <div class="light_right">
            <img
              src="../assets/light_right.png"
              v-if="fiveStarCardObj.showLight"
              v-bind:class="cardLightAniClass"
            />
          </div>
          <div class="lottery_btn" v-if="canRunLottery" @click="runLotteryAction">
            <img src="../assets/runLottery.png" />
          </div>
          <div class="lottery_btn" v-else>
            <img src="../assets/countDownBtn.png" />
            <p class="countText">{{countDownText}}</p>
          </div>
        </div>
        <div class="collect" v-else>
          <img src="../assets/cardBK.png" />
          <div class="cardSwiper">
            <van-swipe
              :loop="false"
              :show-indicators="false"
              :width="swiperWidth"
              :height="swiperHeight"
              ref="swiper"
            >
              <van-swipe-item v-for="(item, index) in collectCardList" :key="index">
                <div class="card">
                  <img :src="item.cardSrc" v-if="item.showCard" v-bind:class="item.aniClass" />
                  <div
                    class="getCardBtn"
                    @click="getCardAction(item, index)"
                    v-if="item.status==1&&item.showCard"
                  >
                    <img src="../assets/getCard.png" />
                  </div>
                </div>
              </van-swipe-item>
            </van-swipe>
          </div>
          <div class="collectBtn" v-if="canCompoundCard" @click="compoundCardAction">
            <img src="../assets/compound.png" />
          </div>
          <div class="collectBtn" v-else>
            <img src="../assets/collectbtn.png" />
          </div>
        </div>
      </div>
      <div class="task">
        <div class="taskBK">
          <img src="../assets/taskList.png" />
          <div class="taskContent">
            <div class="taskItem" v-for="(item, index) in taskList" :key="index">
              <div class="taskItem-icon">
                <img :src="item.iconUrl" />
              </div>
              <div class="taskItem_btn" @click="taskItemAction(item)">
                <img :src="item.statusBtnSrc" />
              </div>
              <div class="taskItem_text">
                <div class="itemText">
                  <p class="item_title">{{item.name}}</p>
                  <p class="item_desc">{{item.desc}}</p>
                </div>
              </div>
              <p class="taskItem_beginTime" v-if="item.status==0">{{item.startTimeText}}</p>
            </div>
          </div>
        </div>
      </div>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-if="showReceivedAnimation" @touchmove.prevent class="flipMask">
          <div class="flip-container">
            <div class="flipper" v-bind:class="recAniClass">
              <div class="front">
                <img src="../assets/collectCard.png" />
              </div>
              <div class="back">
                <img :src="recAniImgSrc" />
              </div>
            </div>
          </div>
          <div
            class="receiveCardBtn animated fadeIn"
            v-if="showReceivedBtn"
            @click="receivedAction"
          >
            <img src="../assets/receivedCard.png" />
          </div>
        </div>
        <div v-if="showCompoundAnimation" @touchmove.prevent class="animationMask">
          <div class="compoundBK" v-bind:class="circleAniClass">
            <img src="../assets/compoundBK.png" />
          </div>
          <div class="compoundCircle" v-if="showCompoundCircle">
            <div class="compoundStar star1 animated fadeIn" v-bind:class="roundAniClass">
              <img src="../assets/round_mercuy.png" />
            </div>
            <div class="compoundStar star2 animated fadeIn" v-bind:class="roundAniClass">
              <img src="../assets/round_venus.png" />
            </div>
            <div class="compoundStar star3 animated fadeIn" v-bind:class="roundAniClass">
              <img src="../assets/round_jupiter.png" />
            </div>
            <div class="compoundStar star4 animated fadeIn" v-bind:class="roundAniClass">
              <img src="../assets/round_mars.png" />
            </div>
            <div class="compoundStar star5 animated fadeIn" v-bind:class="roundAniClass">
              <img src="../assets/round_saturn.png" />
            </div>
          </div>
          <div class="compoundLight" v-if="showCompoundLight" v-bind:class="lightAniClass">
            <img src="../assets/compoundLight.png" />
          </div>
          <div class="compoundFiveStarCard" v-if="showCompoundCard" v-bind:class="cardAniClass">
            <img src="../assets/fiveStar.png" />
          </div>
          <div
            class="receiveFiveStarCardBtn animated fadeIn"
            v-if="showReceivedBtn"
            @click="receivedFiveStarCardAction"
          >
            <img src="../assets/receivedCard.png" />
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-if="showPrizeToast" @touchmove.prevent class="animationMask">
          <div class="toastContent">
            <div class="toastBK">
              <img src="../assets/toastBK.png" />
              <div class="toastItemDiv">
                <p class="toastTitle">恭喜您获得</p>
                <div class="toastPrizeDiv" v-if="prizeObj">
                  <img src="../assets/freeday.png" />
                  <p class="toastFreeDayNum">{{prizeObj.days}}天</p>
                  <p class="toastFreeDayDesc">免费换电</p>
                </div>
                <div class="toastBtn" @click="submitAction">确定</div>
              </div>
            </div>
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-if="showUpdateToast" @touchmove.prevent class="animationMask">
          <div class="updateBK">
            <img src="../assets/updateBK.png" />
            <div class="updateBtn" @click="updateAppAction">
              <img src="../assets/updateBtn.png" />
            </div>
          </div>
        </div>
      </transition>
      <transition enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div v-if="showInviteToast" @touchmove.prevent class="animationMask">
          <div class="inviteDiv">
            <div class="inviteBK">
              <img src="../assets/inviteBK.png" />
            </div>
            <div class="inviteBtn cancerBtn" @click="inviteCancerAciton">
              <img src="../assets/inviteCancer.png" />
            </div>
            <div class="inviteBtn goBtn" @click="inviteGoAction">
              <img src="../assets/inviteBtn.png" />
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div v-else>
      <div class="shareHeader">
        <img src="../assets/shareHeader.png" />
        <div class="downAppBtn" v-if="!isEhdWebview" @click="downAppAction">下载APP，参与点亮活动</div>
        <div class="openAppBtn" v-if="!isEhdWebview" @click="openAppAction">我已下载，打开APP</div>
      </div>
      <div @touchmove.prevent v-if="showLinkToast" class="browserToast" @click="toastClick">
        <div class="browserDiv">
          <p class="linkTitle">链接打不开？</p>
          <p class="linkText">请点击右上角，选择在“浏览器”打开</p>
          <div class="linkIcon">
            <img src="../assets/link.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activity",
  data() {
    return {
      collectNum: 0,
      swiperWidth: (4.13333 * document.body.clientWidth) / 10,
      swiperHeight: (5.73333 * document.body.clientHeight) / 10,
      taskList: [],
      fiveStarCardObj: null,
      hasFivestarCard: false, //是否拥有五星卡
      hasRunLottery: false, //是否已经开奖
      canRunLottery: false, //是否可以开奖
      canCompoundCard: false, //是否可以合成五星卡
      collectCardList: [],
      userToken: "",
      countDownTimer: null,
      countDownText: "",
      drawTime: 0,
      prizeObj: null,
      showReceivedAnimation: false,
      showCompoundAnimation: false,
      showPrizeToast: false,
      recAniClass: "",
      recAniImgSrc: "",
      showReceivedBtn: false,
      getItem: null,
      showCompoundCircle: false,
      circleAniClass: "",
      showCompoundLight: false,
      lightAniClass: "",
      showCompoundCard: false,
      cardAniClass: "",
      compoundBKAniClass: "",
      roundAniClass: "",
      fiveStarCardAniClass: "",
      cardLightAniClass: "",
      isEhdWebview: false,
      showLinkToast: false,
      showUpdateToast: false,
      showInviteToast: false,
      refreshTimer: null
    };
  },
  beforeDestroy() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  },
  mounted() {
    var u = navigator.userAgent;
    var fromParam = this.getParam(u, "from");
    if (fromParam == "ehdApp") {
      this.isEhdWebview = true;
      //判断版本号
      if (!this.isSupportBuyInsurance()) {
        this.showUpdateToast = true;
      }
    }
    //userAgent中没有token字段使用jsbridge获取
    if (u.indexOf("token=") == -1) {
      this.getEhdUserInfoFromBridge();
    } else {
      var token = u.substr(u.indexOf("token=") + 6, u.length);
      token = token.substr(0, token.indexOf("&"));
      this.userToken = "bearer " + token;
      this.getTaskList();
      this.getMyCardList();
      this.getCompletedCollectionNum();
    }

    var vueThis = this;
    vueThis.refreshTimer = setInterval(() => {
      if (vueThis.userToken && vueThis.userToken.length > 0) {
        vueThis.getCompletedCollectionNum();
      }
    }, 10000);
    //解决返回不刷新页面的问题
    if (vueThis.isEhdWebview) {
      setTimeout(() => {
        vueThis.getTaskList();
        vueThis.getMyCardList();
      }, 1000);
      window.location.href = "immotor://hiddenShareAction?status=0";
    }
  },
  methods: {
    inviteCancerAciton: function() {
      this.showInviteToast = false;
    },
    inviteGoAction: function() {
      this.showInviteToast = false;
      window.location.href = "immotor://app-links/my";
    },
    downAppAction: function() {
      window.location.href =
        "http://download.immotor.com/app/downloads/ehuandian";
    },
    openAppAction: function() {
      if (this.isQQWechatBrowser()) {
        //提示在浏览器中打开
        this.showLinkToast = true;
      } else {
        window.location.href = "immotor://app-links/homepage";
      }
    },
    updateAppAction: function() {
      window.location.href = "immotor://downloadApp";
    },
    ruleAction: function() {
      window.location.href = "immotor://hiddenShareAction?status=1";
      setTimeout(() => {
        window.location.href = "./static/rules.html";
      }, 300);
    },
    taskItemAction: function(item) {
      if (item.status == 1) {
        if (item.taskType == "invitation") {
          this.showInviteToast = true;
        } else {
          window.location.href = "immotor://hiddenShareAction?status=1";
          setTimeout(() => {
            window.location.href = item.h5Url;
          }, 300);
        }
      }
    },
    getCardAction: function(item, index) {
      this.getItem = item;
      item.showCard = false;
      this.receiveCard(item.id);
      this.recAniImgSrc = this.getCardSrcWithType(item.cardType);
      this.$refs.swiper.swipeTo(index);
    },
    runLotteryAction: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.drawLottery + vueThis.fiveStarCardObj.id,
          params: {
            activityId: vueThis.getUrlParam("lotteryID")
          },
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            vueThis.hasRunLottery = true;
            vueThis.prizeObj = result.data;
            vueThis.showPrizeToast = true;
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + result.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    receivedAction: function() {
      this.recAniClass = "";
      this.showReceivedAnimation = false;
      this.showReceivedBtn = false;
      var vueThis = this;
      setTimeout(() => {
        vueThis.getItem.aniClass = "animated fadeIn";
        vueThis.getItem.showCard = true;
        vueThis.getItem.cardSrc = vueThis.getCardSrcWithType(
          vueThis.getItem.cardType
        );
        vueThis.getItem.status = 2;
        vueThis.canCompoundCard = vueThis.canCompoundFiveStarCard(
          vueThis.collectCardList
        );
      }, 500);
    },
    compoundCardAction: function() {
      //调用合成接口
      var vueThis = this;
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.compoundCard,
          data: {
            activityId: vueThis.getUrlParam("lotteryID"),
            cardIds: vueThis.getCardIdList()
          },
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.hasFivestarCard = true;
            vueThis.fiveStarCardObj = data.data;
            vueThis.fiveStarCardObj.showCard = false;
            vueThis.fiveStarCardObj.showLight = false;
            var now = new Date().getTime();
            vueThis.canRunLottery =
              now >= vueThis.fiveStarCardObj.drawTime ? true : false;
            if (!vueThis.canRunLottery) {
              vueThis.drawTime = vueThis.fiveStarCardObj.drawTime / 1000;
              vueThis.countDownTimer = setInterval(() => {
                vueThis.onCountDownTimer();
              }, 1000);
            }
            vueThis.compoundCardAnimation();
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    submitAction: function() {
      this.showPrizeToast = false;
    },
    receivedFiveStarCardAction: function() {
      this.showCompoundAnimation = false;
      this.showReceivedBtn = false;
      this.showCompoundLight = false;
      this.showCompoundCard = false;

      if (this.fiveStarCardObj) {
        var vueThis = this;
        setTimeout(() => {
          vueThis.fiveStarCardAniClass = "animated fadeIn";
          vueThis.fiveStarCardObj.showCard = true;
        }, 200);

        setTimeout(() => {
          vueThis.cardLightAniClass = "cardLightAnimation";
          vueThis.fiveStarCardObj.showLight = true;
        }, 300);
      }
    },
    compoundCardAnimation: function() {
      this.showCompoundAnimation = true;
      var vueThis = this;
      setTimeout(() => {
        vueThis.circleAniClass = "circleAnimation";
        vueThis.showCompoundCircle = true;
        setTimeout(() => {
          vueThis.roundAniClass = "starAnimation";
          setTimeout(() => {
            vueThis.showCompoundCircle = false;
            vueThis.lightAniClass = "lightZoomAnimation";
            vueThis.showCompoundLight = true;
            setTimeout(() => {
              vueThis.circleAniClass = "animated fadeOut";
              vueThis.cardAniClass = "animated zoomIn";
              vueThis.showCompoundCard = true;
              setTimeout(() => {
                vueThis.showReceivedBtn = true;
              }, 500);
            }, 150);
            setTimeout(() => {
              vueThis.lightAniClass = "animated fadeOut";
            }, 400);
          }, 500);
        }, 500);
      }, 600);
    },
    getCardIdList: function() {
      var cardIdList = [];
      this.collectCardList.forEach(element => {
        cardIdList.push(element.id);
      });
      return cardIdList;
    },
    canCompoundFiveStarCard: function(cardList) {
      for (let index = 0; index < cardList.length; index++) {
        const element = cardList[index];
        if (element.status != 2) {
          return false;
        }
      }
      return true;
    },
    getCardSrcWithType: function(cardType) {
      var src = "";
      switch (cardType) {
        case 1:
          src = require("../assets/Venus.png");
          break;
        case 2:
          src = require("../assets/Jupiter.png");
          break;
        case 3:
          src = require("../assets/Mercury.png");
          break;
        case 4:
          src = require("../assets/Mars.png");
          break;
        case 5:
          src = require("../assets/Saturn.png");
          break;
        default:
          break;
      }
      return src;
    },
    onCountDownTimer: function() {
      var now = new Date().getTime() / 1000;
      this.canRunLottery = now >= this.drawTime ? true : false;
      if (this.canRunLottery) {
        clearInterval(this.countDownTimer);
        this.countDownTimer = null;
      } else {
        var td = this.drawTime - now;
        var hour =
          parseInt(td / 3600) < 10
            ? "0" + parseInt(td / 3600)
            : parseInt(td / 3600);
        var min =
          parseInt((td % 3600) / 60) < 10
            ? "0" + parseInt((td % 3600) / 60)
            : parseInt((td % 3600) / 60);
        var second =
          parseInt(td % 60) < 10 ? "0" + parseInt(td % 60) : parseInt(td % 60);
        this.countDownText = hour + ":" + min + ":" + second + "后开奖";
      }
    },
    receiveCard: function(cardId) {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.receiveCard + cardId,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            //领取成功
            vueThis.showReceivedAnimation = true;
            setTimeout(() => {
              vueThis.recAniClass = "receiveAnimation";
              setTimeout(() => {
                vueThis.showReceivedBtn = true;
              }, 2000);
            }, 600);
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + result.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getCompletedCollectionNum: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url:
            vueThis.$yApi.getCompletedCollectionNum +
            vueThis.getUrlParam("lotteryID"),
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            vueThis.collectNum = result.data.sucAmount;
            vueThis.collectNum = vueThis.collectNum ? vueThis.collectNum : 0;
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + result.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getMyCardList: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getMyCardList + vueThis.getUrlParam("lotteryID"),
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            var card = result.data[0];
            if (card.prize) {
              vueThis.hasRunLottery = true;
              vueThis.prizeObj = card.prize;
            } else {
              if (card.cardType == 6) {
                //已经开奖
                vueThis.fiveStarCardObj = card;
                vueThis.fiveStarCardObj.showCard = true;
                vueThis.fiveStarCardObj.showLight = true;
                vueThis.hasFivestarCard = true;
                var now = new Date().getTime();
                vueThis.canRunLottery = now >= card.drawTime ? true : false;
                if (!vueThis.canRunLottery) {
                  vueThis.drawTime = card.drawTime / 1000;
                  vueThis.countDownTimer = setInterval(() => {
                    vueThis.onCountDownTimer();
                  }, 1000);
                }
              } else {
                vueThis.canCompoundCard = vueThis.canCompoundFiveStarCard(
                  result.data
                );
                result.data.forEach(element => {
                  if (element.status == 0 || element.status == 1) {
                    element.cardSrc = require("../assets/collectCard.png");
                  } else if (element.status == 2) {
                    element.cardSrc = vueThis.getCardSrcWithType(
                      element.cardType
                    );
                  }
                  element.aniClass = "";
                  element.showCard = true;
                });
                vueThis.collectCardList = result.data;
                console.log(vueThis.collectCardList);
              }
            }
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + result.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getTaskList: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url:
            vueThis.$yApi.getActivityTaskList +
            vueThis.getUrlParam("lotteryID"),
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            result.data.forEach(element => {
              if (element.status == 0) {
                element.startTimeText = vueThis.formatDateToYYYYMMDDHHmm(
                  element.startTime
                );
                element.statusBtnSrc = require("../assets/wait.png");
              } else if (element.status == 1) {
                element.statusBtnSrc = require("../assets/toFinish.png");
              } else if (element.status == 2) {
                element.statusBtnSrc = require("../assets/finished.png");
              }
            });
            vueThis.taskList = result.data;
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + result.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getEhdUserInfoFromBridge: function() {
      var vueThis = this;
      var u = navigator.userAgent;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
      if (isAndroid) {
        vueThis.$bridge.callAndriodHandler(
          "getEhdUserInfo",
          "",
          responseData => {
            // 处理返回数据
            var dataObj = JSON.parse(responseData);
            if (dataObj && dataObj.token) {
              vueThis.userToken = "bearer " + dataObj.token;
              vueThis.getTaskList();
              vueThis.getMyCardList();
              vueThis.getCompletedCollectionNum();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.getTaskList();
            vueThis.getMyCardList();
            vueThis.getCompletedCollectionNum();
          });
        }
      }
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    },
    getParam: function(search, name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    },
    formatDateToYYYYMMDDHHmm: function(timestamp) {
      var oDate = new Date(timestamp);
      var year = oDate.getFullYear();
      var month =
        oDate.getMonth() + 1 < 10
          ? "0" + (oDate.getMonth() + 1)
          : oDate.getMonth() + 1;
      var day = oDate.getDate() < 10 ? "0" + oDate.getDate() : oDate.getDate();
      var hours =
        oDate.getHours() < 10 ? "0" + oDate.getHours() : oDate.getHours();
      var minutes =
        oDate.getMinutes() < 10 ? "0" + oDate.getMinutes() : oDate.getMinutes();
      return year + "." + month + "." + day + "  " + hours + ":" + minutes;
    },
    isQQWechatBrowser: function() {
      var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        //微信
        return true;
      } else if (ua.indexOf("mobile mqqbrowser") > -1) {
        //安卓QQ
        return true;
      } else if (ua.indexOf("iphone") > -1 || ua.indexOf("mac") > -1) {
        //iOS QQ
        if (ua.indexOf("qq") > -1) {
          return true;
        }
      }
      return false;
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
    isSupportBuyInsurance: function() {
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
  height: 100%;
  background: #51088b;
}
.header {
  height: 523px;
  position: relative;
}

.headerText {
  left: 0;
  right: 0;
  height: 14px;
  bottom: 14px;
  position: absolute;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  line-height: 14px;
  color: white;
}

.headerRules {
  width: 73px;
  height: 20px;
  right: 0;
  top: 24px;
  position: absolute;
}

.collect {
  height: 363px;
  position: relative;
}

.cardSwiper {
  top: 28px;
  left: 0;
  right: 0;
  height: 215px;
  position: absolute;
}

.collectBtn {
  width: 247px;
  left: 64px;
  height: 59px;
  bottom: 20px;
  position: absolute;
}

.card {
  width: 145px;
  height: 215px;
  margin: auto;
  margin-top: 0;
  position: relative;
}

.getCardBtn {
  width: 90px;
  height: 42px;
  left: 28px;
  bottom: 17px;
  position: absolute;
}

.fiveStarParent {
  background: #51088b;
  height: 501px;
  position: relative;
}

.fiveStarBK {
  height: 363px;
}

.cardPedestal {
  left: 10px;
  right: 10px;
  bottom: 112px;
  height: 77px;
  position: absolute;
}

.fiveStarCard {
  left: 88px;
  width: 199px;
  bottom: 171px;
  height: 302px;
  position: absolute;
}

.light_left {
  left: 0;
  top: 23px;
  width: 141px;
  height: 354px;
  position: absolute;
}

.light_right {
  right: 0;
  top: 23px;
  width: 149px;
  height: 354px;
  position: absolute;
}
.lottery_btn {
  width: 246px;
  left: 65px;
  height: 59px;
  bottom: 30px;
  position: absolute;
}
.countText {
  width: 246px;
  height: 24px;
  right: 0px;
  bottom: 23px;
  position: absolute;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: white;
  line-height: 24px;
}

.prizeBK {
  width: 352px;
  left: 12px;
  height: 345px;
  top: 15px;
  position: absolute;
}

.freeDayBK {
  width: 213px;
  height: 103px;
  left: 70px;
  top: 99px;
  position: absolute;
}

.freeDayNum {
  width: 213px;
  height: 30px;
  top: 29px;
  left: 0;
  position: absolute;
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: white;
  line-height: 30px;
}

.freeDayDesc {
  width: 213px;
  height: 18px;
  bottom: 18px;
  left: 0;
  position: absolute;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: white;
  line-height: 18px;
}

.task {
  background: #51088b;
  position: relative;
  padding: 0.1px;
}

.taskBK {
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 10px;
  margin-bottom: 58px;
  padding: 0.1px;
}

.taskContent {
  top: 85px;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
}

.taskItem {
  width: 329px;
  height: 88px;
  margin: auto;
  margin-bottom: 20px;
  position: relative;
  background: #ffeaac;
  border-radius: 5px;
}

.taskItem-icon {
  width: 50px;
  height: 50px;
  left: 6px;
  top: 19px;
  position: absolute;
}

.taskItem_btn {
  width: 90px;
  height: 42px;
  right: 10px;
  top: 23px;
  position: absolute;
}
.taskItem_text {
  top: 0;
  bottom: 0;
  left: 60px;
  right: 100px;
  position: absolute;
  display: flex;
}
.taskItem_beginTime {
  width: 100px;
  height: 14px;
  right: 10px;
  bottom: 8px;
  position: absolute;
  text-align: right;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(187, 44, 40, 1);
  line-height: 14px;
}
.itemText {
  margin: auto;
  position: relative;
}
.item_title {
  width: 172px;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: #ac172a;
  line-height: 22px;
  text-align: left;
}
.item_desc {
  width: 172px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #bb2c28;
  line-height: 16px;
  text-align: left;
}

.animationMask {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
}

.flipMask {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  z-index: 999;
  background: rgba(0, 0, 0, 0.8);
}

.flip-container {
  perspective: 1000;
  margin: auto;
  margin-top: 100px;
}

.flip-container,
.front,
.back {
  width: 222px;
  height: 330px;
  position: relative;
}
.receiveAnimation {
  transform: rotateY(540deg) translate(0px, -30px);
}
.flipper {
  transition: all 2s;
  transform-style: preserve-3d;
  position: relative;
}
.front,
.back {
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.front {
  z-index: 2;
}
.back {
  transform: rotateY(540deg);
}
.receiveCardBtn {
  width: 246px;
  height: 59px;
  margin: auto;
  margin-top: 40px;
  position: relative;
}
.compoundBK {
  width: 262px;
  height: 262px;
  margin: auto;
  margin-top: 160px;
  position: relative;
}
.compoundCircle {
  width: 320px;
  height: 320px;
  top: 117px;
  left: 28px;
  position: absolute;
}
.compoundStar {
  width: 68px;
  height: 68px;
  position: absolute;
}
.star1 {
  left: 126px;
  top: 0;
}
.star2 {
  left: 0;
  top: 98px;
}
.star3 {
  left: 250px;
  top: 98px;
}
.star4 {
  left: 42px;
  top: 252px;
}
.star5 {
  left: 210px;
  top: 252px;
}
@keyframes star-animation {
  100% {
    left: 126px;
    top: 126px;
  }
}
@-webkit-keyframes star-animation {
  100% {
    left: 126px;
    top: 126px;
  }
}
.starAnimation {
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation: star-animation 0.5s;
  animation: star-animation 0.5s;
}
@keyframes circle-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(540deg);
  }
}
@-webkit-keyframes circle-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(540deg);
  }
}
.circleAnimation {
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation: circle-animation 2s;
  animation: circle-animation 2s;
}
.compoundLight {
  width: 375px;
  height: 375px;
  left: 0px;
  top: 100px;
  position: absolute;
}
@keyframes zoom-animation {
  0% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(2);
  }
}
@-webkit-keyframes zoom-animation {
  0% {
    transform: scale(0.2);
  }
  100% {
    transform: scale(2);
  }
}
.lightZoomAnimation {
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation: zoom-animation 0.4s;
  animation: zoom-animation 0.4s;
}
.compoundFiveStarCard {
  width: 222px;
  height: 331px;
  left: 77px;
  top: 100px;
  position: absolute;
}
.receiveFiveStarCardBtn {
  width: 246px;
  height: 59px;
  left: 65px;
  top: 460px;
  position: absolute;
}

@keyframes cardLight-animation {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes cardLight-animation {
  0% {
    opacity: 0;
  }
  25% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.cardLightAnimation {
  animation-fill-mode: forwards;
  -webkit-animation-fill-mode: forwards;
  -webkit-animation: cardLight-animation 1s;
  animation: cardLight-animation 1s;
}

.toastContent {
  width: 100%;
  height: 100%;
  position: relative;
}

.toastBK {
  width: 296px;
  height: 317px;
  margin: auto;
  position: relative;
}

.toastItemDiv {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
}

.toastTitle {
  height: 30px;
  margin: auto;
  margin-top: 16px;
  line-height: 30px;
  font-size: 25px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.toastPrizeDiv {
  width: 159px;
  height: 77px;
  margin: auto;
  margin-top: 42px;
  position: relative;
}

.textFontClass {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333;
}

.toastBtn {
  width: 255px;
  height: 40px;
  background: linear-gradient(
    180deg,
    rgba(246, 240, 209, 1) 0%,
    rgba(255, 191, 114, 1) 100%
  );
  border-radius: 5px;
  margin: auto;
  margin-top: 76px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(225, 47, 23, 1);
}

.toastFreeDayNum {
  width: 159px;
  height: 30px;
  top: 20px;
  left: 0;
  position: absolute;
  font-size: 24px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: white;
  line-height: 30px;
}

.toastFreeDayDesc {
  width: 159px;
  height: 18px;
  bottom: 13px;
  left: 0;
  position: absolute;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: white;
  line-height: 18px;
}

.shareHeader {
  height: 724px;
  position: relative;
}

.downAppBtn {
  left: 60px;
  right: 60px;
  top: 522px;
  height: 38px;
  position: absolute;
  background: linear-gradient(
    90deg,
    rgba(255, 176, 49, 1) 0%,
    rgba(255, 111, 31, 1) 100%
  );
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  border-radius: 100px;
  line-height: 38px;
}
.openAppBtn {
  left: 60px;
  right: 60px;
  top: 584px;
  height: 38px;
  position: absolute;
  border-radius: 100px;
  border: 1px solid;
  border-color: rgba(255, 113, 31, 1);
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  background: linear-gradient(
    90deg,
    rgba(255, 176, 49, 1) 0%,
    rgba(255, 133, 65, 1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 38px;
}

.browserToast {
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.6);
  z-index: 99;
}
.browserDiv {
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  height: 98px;
  background: rgba(255, 255, 255, 1);
  border-radius: 5px;
  position: relative;
  padding: 0.1px;
}
.linkIcon {
  width: 190px;
  height: 30px;
  right: 15px;
  top: 10px;
  position: absolute;
}
.linkTitle {
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 27px;
  height: 25px;
  font-size: 18px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 25px;
  text-align: left;
}
.linkText {
  margin-left: 20px;
  margin-right: 20px;
  height: 20px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  text-align: left;
}
.updateBK {
  width: 295px;
  height: 284px;
  position: relative;
  margin: auto;
}
.updateBtn {
  width: 141px;
  height: 36px;
  left: 77px;
  bottom: 40px;
  position: absolute;
}
.inviteDiv {
  width: 295px;
  height: 404px;
  position: relative;
  margin: auto;
}
.inviteBK {
  width: 295px;
  height: 353px;
  position: relative;
}
.inviteBtn {
  width: 125px;
  height: 42px;
  bottom: 0;
  position: absolute;
}
.cancerBtn {
  left: 12px;
}
.goBtn {
  right: 12px;
}
</style>
