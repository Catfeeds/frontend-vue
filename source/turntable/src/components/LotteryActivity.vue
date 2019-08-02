<template>
  <div class="mainBK">
    <div class="header">
      <div class="headerBK">
        <img src="../assets/header.png" class="headerImgClass" />
      </div>
      <div class="headerImg">
        <img src="../assets/topTitle.png" class="headerImgClass" />
      </div>
      <div class="tableBK">
        <img src="../assets/turntableBK.png" class="headerImgClass" />
        <div class="prizeTable" :style="{transform:rotate_angle,transition:rotate_transition}">
          <div class="outerLayer"></div>
          <div class="innerLayer"></div>
          <img class="rotaryRableBK" src="../assets/rotaryTable.png" />
          <div class="prize-list">
            <div class="prize-item" v-for="item in prizeList">
              <p class="prize-content prizeContentFont">{{item.name}}</p>
              <img class="prize-pic" v-if="item.imgUrl" :src="item.imgUrl" />
            </div>
          </div>
        </div>
        <img v-for="item in dots" v-bind:class="item.className" :src="item.imgSrc" />
        <div class="selectPrize-item" v-if="selectBKShow">
          <div class="selectPrize-content">
            <img class="selectPrize-BK" src="../assets/selectBK.png" />
            <p class="selectPrize-itemText prizeContentFont">{{prizesObj.name}}</p>
            <img class="selectPrize-itemPic" v-if="prizesObj.imgUrl" :src="prizesObj.imgUrl" />
          </div>
        </div>
        <div class="beignLuckyDrawBtn" @click="luckyDrawAction">
          <img :src="luckyDrawSrc" class="imgClass" />
        </div>
        <div class="addTimeBtn" @click="addLuckDrawTime">
          <img src="../assets/addLuckyDrawTime.png" class="btnBkImg" />
          <div class="btnTitle prizeTitleFont">增加抽奖次数</div>
        </div>
        <div class="leftTimesRemark timesRemarkFont">您今天还有</div>
        <div class="times titleFont">{{luckyDrawTimes}}</div>
        <div class="rightTimesRemark timesRemarkFont">次抽奖机会</div>
        <div v-bind:class="winnerListClass" @click="winnerListAction">中奖名单</div>
        <div v-bind:class="myPrizeClass" @click="myPrizeAction">我的奖品</div>
      </div>
    </div>
    <div class="prizeBK">
    <vue-seamless-scroll :data="dataList" class="seamless-warp" v-if="dataList.length>5">
      <ul class="prizeUL">
        <li v-for="item in dataList">
          <div class="contentText">
            <span class="leftText remarkFont">{{item.leftText}}</span>
            <span class="rightText remarkFont">{{item.rightText}}</span>
          </div>
          <div class="dividerLine"></div>
        </li>
      </ul>
    </vue-seamless-scroll>
    <ul class="prizeUL" v-if="dataList.length<=5&&dataList.length>0">
        <li v-for="item in dataList">
          <div class="contentText">
            <span class="leftText remarkFont">{{item.leftText}}</span>
            <span class="rightText remarkFont">{{item.rightText}}</span>
          </div>
          <div class="dividerLine"></div>
        </li>
    </ul>
    <div v-if="dataList.length==0" class="emptyList">
      <div class="emptyImg">
        <img :src="emptySrc" class="imgClass" />
      </div>
      <p class="emptyText remarkFont">{{emptyMsg}}</p>
    </div>
    </div>
    <div class="commonLink">
      <img src="../assets/commonLink.png" class="imgClass" />
      <p class="commonTitle titleFont">活动规则</p>
    </div>
    <div class="rulesBK">
      <ul>
        <li class="remarkFont" style="margin-top: 0px">活动期间，凡购买七夕特惠套餐，即默认您已阅读并同意本次活动规则，为保障您的合法权益，请在购买前仔细阅读活动规则：</li>
        <li>
          <span class="remarkFont">1、活动期间，</span>
          <span class="prominentFont">凡购买七夕特惠套餐，可获得一次抽奖机会，可叠加获取；</span>
        </li>
        <li>
          <span class="remarkFont">2、抽奖所获实物奖励将于活动结束后</span>
          <span class="prominentFont">10个工作日内发放；</span>
        </li>
        <li >
          <span class="remarkFont">3、如抽中实物奖励，</span>
          <span class="prominentFont">请谨慎填写个人信息</span>
          <span class="remarkFont">，如有填错，奖品不予发放；</span>
        </li>
        <li class="remarkFont">4、活动所中奖品，不退、不折现、不可转让。</li>
      </ul>
    </div>
    <div class="bottom">
      <img src="../assets/bottom.png" class="imgClass" />
    </div>
    <div class="toast" @touchmove.prevent v-if="toastShow">
      <div class="toastContent">
        <div v-bind:class="toastBKClass">
          <img class="imgClass" :src="toastBKUrl" />
          <div class="toastItemDiv">
            <p class="toastTitle">{{toastTitle}}</p>
            <div class="toastPrizeImgDiv">
              <img class="imgClass" v-if="toastPrizesUrl" :src="toastPrizesUrl" />
            </div>
            <p class="toastName">{{toastText}}</p>
            <div class="recordNameDiv" v-if="showInput">
              <input type="text" maxlength="20" autocomplete="off" class="inputTextClass textFontClass" v-model="recordName" placeholder="请输入收件人姓名"></input>
            </div>
            <div class="recordPhoneDiv" v-if="showInput">
              <input type="text" maxlength="11" autocomplete="off" class="inputTextClass textFontClass" v-model="recordPhone" placeholder="请输入收件人手机号码"></input>
            </div>
            <div class="recordAddressDiv" v-if="showInput">
              <textarea
                type="text"
                maxlength="50"
                autocomplete="off"
                class="textAreaClass textFontClass"
                v-model="recordAddress"
                placeholder="请输入收件人地址"
              ></textarea>
            </div>
            <div class="toastBtn" @click="submitAction">{{toastBtnTitle}}</div>
          </div>
        </div>
        <div class="toastClose" @click="toastCloseAction">
          <img class="imgClass" src="../assets/toastClose.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LotteryActivity",
  data() {
    return {
      luckyDrawTimes: 0,
      lotteryID: "",
      userToken: "",
      prizeList: [],
      dataList: [],
      winnerListClass: "leftSectionTitle selectedBK selectedFont",
      myPrizeClass: "rightSectionTitle normalBK normalFont",
      luckyDrawSrc: require("../assets/luckyDraw.png"),
      emptySrc: require("../assets/emptyWinnerList.png"),
      emptyMsg: "暂无中奖记录",
      selectListIndex: 0,
      dots: [],
      firstIsPink: true,
      scintillationTimer: null,
      start_rotating_degree: 0, //初始旋转角度
      rotate_angle: "", //将要旋转的角度
      rotate_transition: "transform 6s ease-in-out", //初始化选中的过度属性控制
      click_flag: true, //是否可以旋转抽奖
      prizesObj: null,
      selectBKShow: false,
      toastShow: false,
      toastBKClass: "",
      toastBKUrl: require("../assets/toastBK.png"),
      toastPrizesUrl: "   ",
      toastBtnTitle: "继续抽奖",
      toastTitle: "恭喜你",
      toastText: "",
      showInput: false,
      recordName: "",
      recordPhone: "",
      recordAddress: "",
      scrollTop:0
    };
  },
  mounted() {
    this.setupDotsData();
    this.lotteryID = this.getUrlParam("lotteryID");
    this.getPrizeList();
    this.getWinnerList();
    var token =  this.getUrlParam("token");
    if (token && token.length > 0) {
      this.userToken = "bearer " + token;
      this.getLuckyDrawTimes();
    }
    //如果在参数中没有token,从userAgent中获取
    else {
      var u = navigator.userAgent;
      //userAgent中没有token字段使用jsbridge获取
      if (u.indexOf("token=") == -1) {
        this.getEhdUserInfoFromBridge();
      } else {
        var token = u.substr(u.indexOf("token=") + 6, u.length);
        token = token.substr(0, token.indexOf("&"));
        this.userToken = "bearer " + token;
        this.getLuckyDrawTimes();
      }
    }
  },
  methods: {
    setupDotsData: function() {
      for (var index = 0; index < 24; index++) {
        var Obj = {};
        Obj.className = "dot" + index + " dotCommon";
        if (index % 2 == 0) {
          Obj.imgSrc = require("../assets/pinkDot.png");
        } else {
          Obj.imgSrc = require("../assets/blueDot.png");
        }
        this.dots.push(Obj);
      }
    },
    isPhoneNumber: function(val) {
      var reg = /^1[0-9]{10}$/;
      return reg.test(val);
    },
    updateDotsData: function() {
      var vueThis = this;
      vueThis.dots.forEach(function(element, index) {
        if (index % 2 == 0) {
          element.imgSrc = vueThis.firstIsPink
            ? require("../assets/blueDot.png")
            : require("../assets/pinkDot.png");
        } else {
          element.imgSrc = vueThis.firstIsPink
            ? require("../assets/pinkDot.png")
            : require("../assets/blueDot.png");
        }
      });
      vueThis.firstIsPink = !vueThis.firstIsPink;
    },
    updateListDataAndTimes: function() {
      this.getLuckyDrawTimes();
      if (this.selectListIndex == 0) {
        this.getWinnerList();
      } else {
        this.getMyPrizeData();
      }
    },
    rotating: function(index) {
      var during_time = 5; // 默认为1s
      var random = Math.floor(Math.random() * 7);
      var result_index = index; // 最终要旋转到哪一块，对应prize_list的下标
      var result_angle = [360, 300, 240, 180, 120, 60]; //最终会旋转到下标的位置所需要的度数
      var rand_circle = 10; // 附加多转几圈，2-3
      this.click_flag = false; // 旋转结束前，不允许再次触发
      // 转动盘子
      var rotate_angle =
        this.start_rotating_degree +
        rand_circle * 360 +
        result_angle[result_index] -
        (this.start_rotating_degree % 360);
      this.start_rotating_degree = rotate_angle;
      this.rotate_angle = "rotate(" + rotate_angle + "deg)";
      var vueThis = this;
      // 旋转结束后，允许再次触发
      setTimeout(function() {
        vueThis.rotatingEnd();
      }, during_time * 1000 + 1500); // 延时，保证转盘转完
    },
    rotatingEnd: function() {
      this.click_flag = true;
      this.luckyDrawSrc = require("../assets/luckyDraw.png");
      if (this.scintillationTimer) {
        this.clearTimer(this.scintillationTimer);
      }
      this.selectBKShow = true;
      //更新列表数据
      this.updateListDataAndTimes();
      var that = this;
      setTimeout(() => {
        that.toastShow = true;
      }, 1000)
    },
    onLuckyDrawException: function() {
      this.click_flag = true;
      this.luckyDrawSrc = require("../assets/luckyDraw.png");
      if (this.scintillationTimer) {
        this.clearTimer(this.scintillationTimer);
      }
    },
    clearTimer: function(timer) {
      clearInterval(timer);
      timer = null;
    },
    toastCloseAction: function() {
      this.selectBKShow = false;
      this.toastShow = false;
    },
    submitAction: function() {
      //实物 判断是否已经输入了姓名 手机号 和姓名
      if (this.prizesObj.prizeType == "entity") {
        if (this.recordName.length == 0) {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=请输入您的姓名";
          return;
        }
        if (this.recordPhone.length == 0) {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=请输入您的手机号码";
          return;
        }
        if (!this.isPhoneNumber(this.recordPhone)) {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=请输入正确的手机号码";
          return;
        }
        if (this.recordAddress.length == 0) {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=请输入您的地址";
          return;
        }
        this.recordEntityInfo();
      }
      this.selectBKShow = false;
      this.toastShow = false;
    },
    luckyDrawAction: function() {
      var vueThis = this;
      if (vueThis.luckyDrawTimes == 0) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=没有抽奖次数";
        return;
      }
      if (vueThis.userToken.length == 0) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=没有获取到用户信息";
        return;
      }
      if (!vueThis.click_flag) {
        return;
      }
      vueThis.click_flag = false;
      if (vueThis.scintillationTimer) {
        vueThis.clearTimer(vueThis.scintillationTimer);
      }
      vueThis.luckyDrawSrc = require("../assets/luckyDrawing.png");
      vueThis.scintillationTimer = setInterval(() => {
        vueThis.updateDotsData();
      }, 300);
      this.luckyDraw();
    },
    addLuckDrawTime: function() {
      window.location.href = "IMMOTOR://app-links/buyPackage";
    },
    winnerListAction: function() {
      this.winnerListClass = "leftSectionTitle selectedBK selectedFont";
      this.myPrizeClass = "rightSectionTitle normalBK normalFont";
      this.selectListIndex = 0;
      this.getWinnerList();
    },
    myPrizeAction: function() {
      this.winnerListClass = "leftSectionTitle normalBK normalFont";
      this.myPrizeClass = "rightSectionTitle selectedBK selectedFont";
      this.selectListIndex = 1;
      this.getMyPrizeData();
    },
    getPrizeList: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getLotteryData + vueThis.lotteryID
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.prizeList = data.data.prizes;
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
    getWinnerList: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getRecentwinnerlist + vueThis.lotteryID
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            if (data.data.length > 20) {
              data.data = data.data.slice(0, 20);
            }
            data.data.forEach(function(el) {
              el.leftText = el.phone;
              el.rightText = el.prizeName;
            });
            vueThis.dataList = data.data;
          } else {
            vueThis.dataList = [];
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.resultMsg;
          }
          if (vueThis.dataList.length == 0) {
            vueThis.emptyMsg = "暂无中奖记录";
          }
        })
        .catch(resp => {
          vueThis.dataList = [];
          vueThis.emptyMsg = "暂无中奖记录";
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getMyPrizeData: function() {
      if(this.userToken.length == 0){
        this.dataList = [];
        this.emptyMsg = "暂无奖品";
        return;
      }
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getMyPrizeList + vueThis.lotteryID,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            data.data.forEach(function(el) {
              el.leftText = el.prizeName;
              el.rightText = vueThis.formatDateToYYYYMMDDHHmm(el.winningTime);
            });
            vueThis.dataList = data.data;
          } else {
            vueThis.dataList = [];
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.resultMsg;
          }
          if (vueThis.dataList.length == 0) {
            vueThis.emptyMsg = "暂无奖品";
          }
        })
        .catch(resp => {
          vueThis.dataList = [];
          vueThis.emptyMsg = "暂无奖品";
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    getLuckyDrawTimes: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getUserLotteryTimes + vueThis.lotteryID,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.luckyDrawTimes = data.data.times;
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
    luckyDraw: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.luckyDraw + vueThis.lotteryID,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.prizesObj = data.data;
            let index = vueThis.getPrizesIndex(vueThis.prizesObj.id);
            if (index < 0) {
              vueThis.click_flag = true;
              window.location.href =
                "IMMOTOR://showPrompt?code=0&message=没有找到对应奖品";
            } else {
              vueThis.rotating(index);
            }
            if (vueThis.prizesObj.prizeType == "none") {
              vueThis.toastBKUrl = require("../assets/toastBK.png");
              vueThis.toastBKClass = "toastOtherBK";
              vueThis.toastText = "你离奖品还差一丢丢";
              vueThis.toastTitle = "很遗憾";
              vueThis.toastBtnTitle = "再试一次";
              vueThis.toastPrizesUrl = require("../assets/prizesNone.png");
              vueThis.showInput = false;
            } else {
              vueThis.toastText = "获得" + vueThis.prizesObj.name;
              vueThis.toastTitle = "恭喜你";
              vueThis.toastPrizesUrl = vueThis.prizesObj.imgUrl;
              if (vueThis.prizesObj.prizeType == "entity") {
                vueThis.toastBKUrl = require("../assets/toastEntityBK.png");
                vueThis.toastBKClass = "toastEntityBK";
                vueThis.toastBtnTitle = "提交";
                vueThis.showInput = true;
              } else {
                vueThis.toastBKUrl = require("../assets/toastBK.png");
                vueThis.toastBKClass = "toastOtherBK";
                vueThis.toastBtnTitle = "继续抽奖";
                vueThis.showInput = false;
              }
            }
          } else {
            vueThis.onLuckyDrawException();
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + data.resultMsg;
          }
        })
        .catch(resp => {
          vueThis.onLuckyDrawException();
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    },
    recordEntityInfo: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.recordEntityWinnerInfo,
          data: {
            entityId: vueThis.prizesObj.entityId,
            name: vueThis.recordName,
            phone: vueThis.recordPhone,
            address: vueThis.recordAddress
          },
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            window.location.href =
              "IMMOTOR://showPrompt?code=1&message=登记中奖信息成功";
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
    getPrizesIndex: function(prizeId) {
      for (let index = 0; index < this.prizeList.length; index++) {
        const element = this.prizeList[index];
        if (element.id == prizeId) {
          return index;
        }
      }
      return -1;
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
              vueThis.getLuckyDrawTimes();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.getPrizeList();
            vueThis.getWinnerList();
            vueThis.getLuckyDrawTimes();
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
      return (
        year +
        "/" +
        month +
        "/" +
        day +
        "  " +
        hours +
        ":" +
        minutes
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
    .seamless-warp {
      height: 230px;
      overflow: hidden;
      border-radius: 4px;
    }
.mainBK {
  width: 100%;
}

.header {
  width: 100%;
  height: 769px;

}

.headerBK {
  width: 100%;
  height: 601.5px;
}

.headerImg {
  width: 100%;
  height: 143px;
  position: absolute;
  top: 0px;
  left: 0;
}

.tableBK {
  width: 100%;
  height: 602px;
  position: absolute;
  left: 0;
  top: 147px;
}

.beignLuckyDrawBtn {
  width: 86px;
  height: 103px;
  left: 145px;
  top: 142px;
  position: absolute;
}

.prizeBK {
  margin-left: 34px;
  margin-right: 34px;
  margin-top: -56px;
  background: linear-gradient(
    181deg,
    rgba(169, 41, 159, 1) 0%,
    rgba(94, 69, 235, 1) 37%,
    rgba(102, 95, 249, 1) 67%,
    rgba(84, 86, 249, 1) 100%
  );
  border-radius: 8px;
  padding: 6px;
  position: relative;
  z-index: 1000;
}

.prizeUL {
  padding-left: 17px;
  padding-right: 17px;
  min-height: 200px;
  background: rgba(6, 0, 136, 1);
}

.contentText {
  height: 37px;
  display: flex;
  justify-content: space-between;
}

.leftText {
  width: 120px;
  height: 36px;
  line-height: 36px;
  text-align: left;
  margin-left: 5px;
}

.rightText {
  width: 120px;
  height: 36px;
  line-height: 36px;
  text-align: right;
  margin-right: 5px;
}

.dividerLine {
  height: 1px;
  background: rgba(107, 96, 129, 0.8);
}

.commonLink {
  width: 100%;
  height: 164px;
  margin-top: -53px;
  position: relative;
  z-index: 100;
}

.commonTitle {
  top: 73px;
  width: 134px;
  height: 54px;
  left: 120px;
  position: absolute;
  line-height: 54px;
  text-align: center;
}

.rulesBK {
  margin-top: -26px;
  margin-left: 34px;
  margin-right: 34px;
  background: linear-gradient(
    181deg,
    rgba(169, 41, 159, 1) 0%,
    rgba(94, 69, 235, 1) 37%,
    rgba(102, 95, 249, 1) 67%,
    rgba(84, 86, 249, 1) 100%
  );
  border-radius: 8px;
  padding: 6px;
  position: relative;
  z-index: 1001;
}

.rulesBK ul {
  background: linear-gradient(
    180deg,
    rgba(6, 0, 136, 1) 0%,
    rgba(43, 23, 132, 1) 43%,
    rgba(42, 23, 132, 1) 100%
  );
  border-radius: 5px;
  padding: 20px;
}

.rulesBK ul li {
  margin-top: 15px;
  text-align: left;
}

.tipsBK {
  margin-left: 34px;
  margin-right: 34px;
  margin-top: -26px;
  background: linear-gradient(
    181deg,
    rgba(169, 41, 159, 1) 0%,
    rgba(94, 69, 235, 1) 37%,
    rgba(102, 95, 249, 1) 67%,
    rgba(84, 86, 249, 1) 100%
  );
  border-radius: 8px;
  padding: 6px;
  z-index: 1002;
  position: relative;
}

.tipsBK p {
  background: linear-gradient(
    180deg,
    rgba(6, 0, 136, 1) 0%,
    rgba(43, 23, 132, 1) 43%,
    rgba(42, 23, 132, 1) 100%
  );
  border-radius: 5px;
  padding: 20px;
  text-align: left;
}

.bottom {
  margin-top: -27px;
  width: 100%;
  height: 57px;
  z-index: 101;
  position: relative;
}

.addTimeBtn {
  width: 156px;
  height: 39px;
  left: 110px;
  top: 448px;
  position: absolute;
  line-height: 39px;
}

.headerImgClass {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
}

.imgClass {
  width: 100%;
  height: 100%;
  display: block;
}

.btnBkImg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
}

.btnTitle {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 36px;
  line-height: 36px;
}

.leftTimesRemark {
  width: 80px;
  height: 21px;
  left: 96px;
  top: 403px;
  position: absolute;
  line-height: 21px;
  text-align: left;
}

.times {
  width: 24px;
  height: 23px;
  left: 175px;
  top: 403px;
  position: absolute;
  line-height: 23px;
}

.rightTimesRemark {
  width: 80px;
  height: 21px;
  right: 96px;
  top: 403px;
  position: absolute;
  line-height: 21px;
  text-align: right;
}

.leftSectionTitle {
  width: 122px;
  height: 44px;
  left: 66px;
  top: 502px;
  position: absolute;
  border-radius: 10px 0px 0px 10px;
  line-height: 44px;
}

.rightSectionTitle {
  width: 122px;
  height: 44px;
  right: 62px;
  top: 502px;
  position: absolute;
  border-radius: 0px 10px 10px 0px;
  line-height: 44px;
}

.selectedBK {
  background: linear-gradient(
    90deg,
    rgba(34, 0, 97, 0.9586) 0%,
    rgba(35, 1, 94, 0.9586) 100%
  );
}

.selectedFont {
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}

.normalBK {
  background: transparent;
}

.normalFont {
  font-size: 16px;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
}

.firstSection {
  position: absolute;
  left: 63px;
  top: 501px;
  width: 252px;
  height: 45px;
}

.remarkFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(228, 222, 247, 1);
}
.remarkFont {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(228, 222, 247, 1);
}

.prominentFont{
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #ED0093;
}

.timesRemarkFont {
  font-size: 15px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 249, 243, 1);
}

.titleFont {
  font-size: 16px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
}

.prizeTitleFont {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(237, 198, 245, 1);
}

.dot0 {
  left: 181.5px;
  top: 19.5px;
}

.dot1 {
  left: 224.5px;
  top: 25.5px;
}

.dot2 {
  left: 264.5px;
  top: 41.5px;
}

.dot3 {
  left: 300.5px;
  top: 69.5px;
}

.dot4 {
  left: 326.5px;
  top: 103.5px;
}

.dot5 {
  left: 343.5px;
  top: 143.5px;
}

.dot6 {
  left: 349.5px;
  top: 187.5px;
}

.dot7 {
  left: 343.5px;
  top: 230.5px;
}

.dot8 {
  left: 326.5px;
  top: 271.5px;
}

.dot9 {
  left: 300.5px;
  top: 306.5px;
}

.dot10 {
  left: 265.5px;
  top: 332.5px;
}

.dot11 {
  left: 224.5px;
  top: 349.5px;
}

.dot12 {
  left: 181.5px;
  top: 355.5px;
}

.dot13 {
  left: 137.5px;
  top: 349.5px;
}

.dot14 {
  left: 97.5px;
  top: 332.5px;
}

.dot15 {
  left: 63.5px;
  top: 306.5px;
}

.dot16 {
  left: 35.5px;
  top: 271.5px;
}

.dot17 {
  left: 19.5px;
  top: 230.5px;
}

.dot18 {
  left: 13.5px;
  top: 187.5px;
}

.dot19 {
  left: 19.5px;
  top: 143.5px;
}

.dot20 {
  left: 35.5px;
  top: 103.5px;
}

.dot21 {
  left: 63.5px;
  top: 69.5px;
}

.dot22 {
  left: 97.5px;
  top: 41.5px;
}

.dot23 {
  left: 137.5px;
  top: 25.5px;
}

.dotCommon {
  width: 14px;
  height: 14px;
  position: absolute;
}

.prizeTable {
  width: 355px;
  height: 355px;
  border-radius: 50%;
  position: absolute;
  left: 10px;
  top: 17px;
}

.prize-list {
  width: 100%;
  height: 100%;
  position: relative;
}

.prize-item {
  width: 120px;
  height: 178px;
  position: absolute;
}

.selectPrize-item {
  width: 178px;
  height: 178px;
  position: absolute;
  left: 100px;
  top: 50px;
}

.selectPrize-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.selectPrize-BK {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.selectPrize-itemText {
  width: 100%;
  height: 18px;
  position: absolute;
  top: 20px;
  line-height: 18px;
  text-align: center;
}

.selectPrize-itemPic {
  width: 50px;
  height: 50px;
  position: absolute;
  left: 64px;
  top: 43px;
}

.prize-list .prize-item:first-child {
  left: 119px;
  top: 0px;
  transform: rotate(0deg);
}

.prize-list .prize-item:nth-child(2) {
  top: 43px;
  left: 192px;
  transform: rotate(60deg);
}

.prize-list .prize-item:nth-child(3) {
  top: 126px;
  left: 192px;
  transform: rotate(120deg);
}

.prize-list .prize-item:nth-child(4) {
  top: 178px;
  left: 119px;
  transform: rotate(180deg);
}

.prize-list .prize-item:nth-child(5) {
  top: 126px;
  left: 40px;
  transform: rotate(-120deg);
}

.prize-list .prize-item:nth-child(6) {
  top: 43px;
  left: 40px;
  transform: rotate(-60deg);
}

.prize-content {
  width: 120px;
  height: 18px;
  margin-top: 50px;
  line-height: 18px;
}

.prize-pic {
  width: 50px;
  height: 50px;
  margin: auto;
  margin-top: 5px;
}

.prizeContentFont {
  font-size: 12px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 249, 243, 1);
}

.outerLayer {
  left: 0;
  top: 0;
  width: 355px;
  height: 355px;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    59deg,
    rgba(72, 19, 214, 1) 0%,
    rgba(111, 4, 183, 1) 37%,
    rgba(121, 0, 174, 1) 59%,
    rgba(93, 10, 195, 1) 100%
  );
}

.innerLayer {
  left: 20px;
  top: 20px;
  width: 315px;
  height: 315px;
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(
    59deg,
    rgba(123, 0, 170, 1) 0%,
    rgba(135, 23, 215, 1) 37%,
    rgba(142, 43, 247, 1) 59%,
    rgba(186, 70, 192, 1) 100%
  );
}

.rotaryRableBK {
  left: 40px;
  top: 40px;
  width: 275px;
  height: 275px;
  position: absolute;
  border-radius: 50%;
}

.emptyList{
  height: 230px;
  padding: 1px;
  padding-left: 17px;
  padding-right: 17px;
  background: rgba(6, 0, 136, 1);
}

.emptyImg {
  width: 137.5px;
  height: 87.5px;
  margin: auto;
 margin-top: 50px;
}

.emptyText {
  width: 100%;
  height: 16px;
  margin-top: 6px;
  line-height: 16px;
  text-align: center;
}

.toast {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}

.toastContent {
  width: 100%;
  height: 100%;
  position: relative;
}

.toastEntityBK {
  width: 295px;
  height: 482px;
  margin: auto;
  margin-top: 30px;
  position: relative;
}

.toastOtherBK {
  width: 295px;
  height: 354px;
  margin: auto;
  margin-top: 100px;
  position: relative;
}

.toastClose {
  width: 33px;
  height: 33px;
  margin: auto;
  margin-top: 10px;
}

.toastItemDiv {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
}

.toastTitle {
  width: 100%;
  height: 30px;
  margin-top: 16px;
  text-align: center;
  line-height: 30px;
  font-size: 25px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}

.toastPrizeImgDiv {
  width: 100px;
  height: 100px;
  margin: auto;
  margin-top: 35px;
}

.toastName {
  width: 100%;
  height: 24px;
  margin-top: 18px;
  text-align: center;
  line-height: 24px;
  font-size: 17px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 244, 243, 1);
}

.inputTextClass {
  height: 20px;
  width: 235px;
  margin-top: 6px;
  margin-left: 10px;
  text-align: left;
  line-height: 20px;
  text-align: left;
  background-color: transparent;
  border: 0;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}

.textFontClass {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333;
}

.recordNameDiv {
  width: 255px;
  height: 32px;
  background: rgba(255, 229, 222, 1);
  box-shadow: 0px -1px 5px 0px rgba(255, 0, 13, 1);
  border-radius: 5px;
  margin: auto;
  margin-top: 20px;
}

.recordPhoneDiv {
  width: 255px;
  height: 32px;
  background: rgba(255, 229, 222, 1);
  box-shadow: 0px -1px 5px 0px rgba(255, 0, 13, 1);
  border-radius: 5px;
  margin: auto;
  margin-top: 10px;
}

.recordAddressDiv {
  width: 255px;
  height: 58px;
  background: rgba(255, 229, 222, 1);
  box-shadow: 0px -1px 5px 0px rgba(255, 0, 13, 1);
  border-radius: 5px;
  margin: auto;
  margin-top: 10px;
}

.textAreaClass {
  height: 46px;
  width: 235px;
  margin-top: 6px;
  margin-left: 10px;
  text-align: left;
  background-color: transparent;
  border: 0;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
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
  margin-top: 20px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(225, 47, 23, 1);
}

</style>
