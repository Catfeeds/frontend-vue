<template>
  <div class="answer">
    <!-- <form action=""> -->
    <div v-if="!skip">
      <div class="header relative">
        <img src="../assets/images/分组 10@2x.png" alt />
        <div class="rule absolute" @click="rule()">活动规则</div>
      </div>
      <div class="answer_common absolute">
        <div class="answer_doubt">
          <div class="title">1、您是通过哪些渠道加入e换电的</div>
          <ul>
            <!-- <li><input type="radio" name="ditch">A、朋友推荐</li>
                <li><input type="radio" name="ditch">B、招聘网站（如58同城）</li>
                <li><input type="radio" name="ditch">C、外卖站点推荐</li>
            <li><input type="radio" name="ditch">D、电动车车行推荐</li>-->
            <li v-for="(item,index) in ditch" :key="index" class="relative">
              <input
                type="radio"
                name="ditch"
                :id="'ditch'+index"
                :value="index"
                v-model="checkedValue"
                class="relative"
              />
              <label :for="'ditch'+index">{{item.name}}</label>
              <div class="icon_radio relative">
                <img :src="checkedValue ==index?icon_radio:icon_radio_1" alt class="absolute" />
              </div>
            </li>
          </ul>
        </div>
        <div class="right_answers" v-if="right_answers">请选择选项</div>
        <div class="answer_doubt">
          <div class="title">2、如换电柜没有网络，无法换电，应该采取以下什么动作，方可正常换电？</div>
          <ul>
            <!-- <li><input type="radio" name="electric">A、离线换电</li>
                <li><input type="radio" name="electric">B、预约换电</li>
            <li><input type="radio" name="electric">C、直接扫码</li>-->
            <li v-for="(item,index) in electric" :key="index">
              <input
                type="radio"
                name="electric"
                :id="'electric'+index"
                :value="index"
                v-model="checkedValue_1"
                class="relative"
              />
              <label :for="'electric'+index">{{item.name}}</label>
              <div class="icon_radio relative">
                <img :src="checkedValue_1 ==index?icon_radio:icon_radio_1" alt class="absolute" />
              </div>
            </li>
          </ul>
        </div>
        <div class="right_answers" v-if="right_option1">请选择选项</div>
        <div class="right_answers" v-if="right_answers1">正确答案：A</div>
        <div class="answer_doubt">
          <div class="title">3、如换电过程中，遇到问题，下列做法正确的是？</div>
          <ul>
            <!-- <li><input type="radio" name="course">A、暴力、强行更换电池</li>
                <li><input type="radio" name="course">B、非法盗取电池</li>
            <li><input type="radio" name="course">C、打开e换电APP，联系客服</li>-->
            <li v-for="(item,index) in course" :key="index">
              <input
                type="radio"
                name="course"
                :id="'course'+index"
                :value="index"
                v-model="checkedValue_2"
                class="relative"
              />
              <label :for="'course'+index">{{item.name}}</label>
              <div class="icon_radio relative">
                <img :src="checkedValue_2 ==index?icon_radio:icon_radio_1" alt class="absolute" />
              </div>
            </li>
          </ul>
        </div>
        <div class="right_answers" v-if="right_option2">请选择选项</div>
        <div class="right_answers" v-if="right_answers2">正确答案：C</div>
        <div class="answer_doubt">
          <div class="title">4、如发现有人非法盗用、变卖电池、下列做法正确的是？</div>
          <ul>
            <!-- <li><input type="radio" name="embezzle">A、及时制止，并通知e换电工作人员</li>
            <li><input type="radio" name="embezzle">B、事不关己、放任不管</li>-->
            <li v-for="(item,index) in embezzle" :key="index">
              <input
                type="radio"
                name="embezzle"
                :id="'embezzle'+index"
                :value="index"
                v-model="checkedValue_3"
                class="relative"
              />
              <label :for="'embezzle'+index">{{item.name}}</label>
              <div class="icon_radio relative">
                <img :src="checkedValue_3 ==index?icon_radio:icon_radio_1" alt class="absolute" />
              </div>
            </li>
          </ul>
        </div>
        <div class="right_answers" v-if="right_option3">请选择选项</div>
        <div class="right_answers" v-if="right_answers3">正确答案：A</div>
        <div class="answer_doubt">
          <div class="title">5、当不在使用e换电了，下列争取做法是？</div>
          <ul>
            <!-- <li><input type="radio" name="striveFor">A、私自改装，留作私用</li>
                <li><input type="radio" name="striveFor">B、随意丢弃、变卖电池，不再使用</li>
            <li><input type="radio" name="striveFor">C、到达指定服务网点归还电池，申请退押</li>-->
            <li v-for="(item,index) in striveFor" :key="index">
              <input
                type="radio"
                name="striveFor"
                :id="'striveFor'+index"
                :value="index"
                v-model="checkedValue_4"
                class="relative"
              />
              <label :for="'striveFor'+index">{{item.name}}</label>
              <div class="icon_radio relative">
                <img :src="checkedValue_4 ==index?icon_radio:icon_radio_1" alt class="absolute" />
              </div>
            </li>
          </ul>
        </div>
        <div class="right_answers" v-if="right_option4">请选择选项</div>
        <div class="right_answers" v-if="right_answers4">正确答案：C</div>
        <div class="btn relative" @click="btnAnswer()">确认提交</div>
        <!-- </form> -->
      </div>
    </div>
    <div v-else>
      <div class="response relative">
        <img src="../assets/images/分组 5@2x.png" alt class="absolute" />
        <div class="backtrack absolute">返回</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "answer",
  data() {
    return {
      id: "",
      userToken: "",
      skip: false,
      checkedValue: "暂无",
      checkedValue_1: "暂无",
      checkedValue_2: "暂无",
      checkedValue_3: "暂无",
      checkedValue_4: "暂无",
      right_answers: false,
      right_answers1: false,
      right_answers2: false,
      right_answers3: false,
      right_answers4: false,
      right_option1: false,
      right_option2: false,
      right_option3: false,
      right_option4: false,
      icon_radio: require("@/assets/images/分组 3@2x.png"),
      icon_radio_1: require("@/assets/images/椭圆形 copy 4@2x.png"),
      ditch: [
        {
          name: "A、朋友推荐"
        },
        {
          name: "B、招聘网站（如58同城）"
        },
        {
          name: "C、外卖站点推荐"
        },
        {
          name: "D、电动车车行推荐"
        }
      ],
      electric: [
        {
          name: "A、离线换电"
        },
        {
          name: "B、预约换电"
        },
        {
          name: "C、直接扫码"
        }
      ],
      course: [
        {
          name: "A、暴力、强行更换电池"
        },
        {
          name: "B、非法盗取电池"
        },
        {
          name: "C、打开e换电APP，联系客服"
        }
      ],
      embezzle: [
        {
          name: "A、及时制止，并通知e换电工作人员"
        },
        {
          name: "B、事不关己、放任不管"
        }
      ],
      striveFor: [
        {
          name: "A、私自改装，留作私用"
        },
        {
          name: "B、随意丢弃、变卖电池，不再使用"
        },
        {
          name: "C、到达指定服务网点归还电池，申请退押"
        }
      ]
    };
  },
  mounted() {
    var token = this.getUrlParam("token");
    if (token && token.length > 0) {
      this.userToken = "bearer " + token;
    }
    //如果在参数中没有token,从userAgent中获取
    else {
      var u = navigator.userAgent;
      //userAgent中没有token字段使用jsbridge获取
      if (u.indexOf("token=") != -1) {
        token = u.substr(u.indexOf("token=") + 6, u.length);
        token = token.substr(0, token.indexOf("&"));
        this.userToken = "bearer " + token;
      }
    }
    if (this.userToken.length > 0) {
      this.getEhdUserInfoFromBridge();
    } else {
      this.getEhdUserInfoFromBridge();
    }
    //
    var lotteryID = this.getUrlParam("lotteryID");
    if (lotteryID) {
      this.skip = false;
    }
  },
  methods: {
    btnAnswer() {
      // 第一题
      if (this.checkedValue == "暂无") {
        this.right_answers = true;
      } else {
        this.right_answers = false;
      }

      // 第二题
      if (this.checkedValue_1 == "暂无") {
        this.right_option1 = true;
      } else if (this.checkedValue_1 != "0") {
        this.right_answers1 = true;
        this.right_option1 = false;
      } else {
        this.right_answers1 = false;
        this.right_option1 = false;
      }

      // 第三题
      if (this.checkedValue_2 == "暂无") {
        this.right_option2 = true;
      } else if (this.checkedValue_2 != "2") {
        this.right_answers2 = true;
        this.right_option2 = false;
      } else {
        this.right_answers2 = false;
        this.right_option2 = false;
      }

      // 第四题
      if (this.checkedValue_3 == "暂无") {
        this.right_option3 = true;
      } else if (this.checkedValue_3 != "0") {
        this.right_answers3 = true;
        this.right_option3 = false;
      } else {
        this.right_answers3 = false;
        this.right_option3 = false;
      }

      // 第五题
      if (this.checkedValue_4 == "暂无") {
        this.right_option4 = true;
      } else if (this.checkedValue_4 != "2") {
        this.right_answers4 = true;
        this.right_option4 = false;
      } else {
        this.right_answers4 = false;
        this.right_option4 = false;
      }

      if (
        this.right_answers == false &&
        this.checkedValue_1 == "0" &&
        this.checkedValue_2 == "2" &&
        this.checkedValue_3 == "0" &&
        this.checkedValue_4 == "2"
      ) {
        this.skip = false;
        var _this = this;
        _this
          .axios({
            method: "get",
            //  url:_this.$yApi.gainMyReward +'?'+ _this.invActId,
            url: _this.$yApi.gainMyReward,
            params: {
              lotteryID: '5d9c5c0fae2d47000117f004'
            },
            headers: {
              Authorization: _this.userToken
            }
          })
          .then(res => {
            // console.log(window.location.href)
            console.log(res);
            // console.log( this.my_reward)
          })
          .catch(err => {
            console.log("Error", error.messgae);
          });
      }
    },
    rule() {
      this.$router.push("/activityRules");
    },
    getEhdUserInfoFromBridge() {
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
              vueThis.btnAnswer();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.btnAnswer();
          });
        }
      }
    },
    getUrlParam(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to _this component only -->
<style scoped>
.relative {
  position: relative;
}
.absolute {
  position: absolute;
}
.answer {
  width: 100%;
  max-width: 750px;
  margin: 0 auto;
}
img {
  display: block;
  width: 100%;
}
.rule {
  top: 20px;
  right: 20px;
}
.answer_common {
  width: 750px;
  background: #f8f8f8;
  font-size: 28px;
}
.answer_doubt {
  position: relative;
  width: 686px;
  left: 50%;
  margin-left: -343px;
  background: rgba(255, 255, 255, 1);
  border-radius: 8px;
  font-family: PingFangSC-Regular, PingFangSC;
  font-weight: 400;
  color: rgba(72, 72, 72, 1);
  margin-top: 40px;
  padding-left: 32px;
  padding-bottom: 20px;
}
.answer_doubt:first-child {
  margin-top: -60px;
}
.answer_doubt .title {
  padding-bottom: 10px;
  padding-top: 30px;
  padding-left: 8px;
}
.answer_doubt ul li {
  line-height: 80px;
}
.answer_doubt input {
  z-index: 100;
  margin-right: 10px;
  opacity: 0;
}
.icon_radio img {
  width: 36px;
  height: 36px;
  top: -62px;
  left: -6px;
  z-index: 1;
}
.right_answers {
  margin-left: 72px;
  margin-top: 20px;
  height: 40px;
  font-size: 28px;
  font-family: PingFangSC-Semibold, PingFangSC;
  font-weight: 600;
  color: rgba(255, 141, 89, 1);
}
.btn {
  width: 686px;
  left: 50%;
  margin-left: -343px;
  height: 88px;
  line-height: 88px;
  text-align: center;
  background: rgba(255, 141, 89, 1);
  border-radius: 8px 8px 8px 0px;
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFangSC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  margin-top: 60px;
  margin-bottom: 100px;
}
.response {
  background: #f8f8f8;
  height: 100vh;
}
.response img {
  width: 520px;
  height: 412px;
  left: 50%;
  top: 158px;
  margin-left: -260px;
}
.response .backtrack {
  top: 630px;
  width: 320px;
  height: 88px;
  left: 50%;
  margin-left: -160px;
  background: rgba(255, 141, 89, 1);
  border-radius: 8px 8px 8px 0px;
  line-height: 88px;
  font-size: 28px;
  font-family: PingFangSC-Medium, PingFangSC;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}
</style>
