<template>
  <div>
    <div class="serviceHeader">
      <img src="../assets/serviceHeader.png" />
    </div>
    <p class="sectionTitle">常见问题</p>
    <van-tabs
      :swipeable="true"
      :border="false"
      :swipe-threshold="5"
      color="#FF8D59"
      title-active-color="#333"
      title-inactive-color="#999"
    >
      <van-tab v-for="item in questions" :title="item.type" :key="item.type">
        <div v-for="question in item.questions" class="questionContentDiv" :key="question.text">
          <p class="questionText textFont" @click="gotoAction(question)">{{question.text}}</p>
          <div class="qustionLine"></div>
        </div>
      </van-tab>
    </van-tabs>
    <div class="bottomDiv">
      <div class="telImgDiv">
        <img src="../assets/tel.png" />
      </div>
      <p class="telText" @click="customServiceAction">联系客服</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomerService",
  data() {
    return {
      questions: [
        {
          type: "换电池",
          questions: [
            {
              text: "如何换电池",
              link: "./static/frame/pages/swapBattery.html"
            },
            {
              text: "如何应对换电池失败的情况",
              link: "./static/frame/pages/swapFail.html"
            }
          ]
        },
        {
          type: "退电池",
          questions: [
            {
              text: "怎么退电池？",
              link: "./static/frame/pages/returnBattery.html"
            }
          ]
        },
        {
          type: "租电池",
          questions: [
            {
              text: "押金充值",
              link: "./static/frame/pages/depositCharge.html"
            },
            {
              text: "取电池",
              link: "./static/frame/pages/getBattery.html"
            }
          ]
        },
        {
          type: "客服",
          questions: [
            {
              text: "人工客服",
              link: "./static/frame/pages/service.html"
            }
          ]
        },
        {
          type: "充值",
          questions: [
            {
              text: "充值在余额的钱能否退或提现或缴纳押金",
              link: "./static/frame/pages/returnCharge.html"
            },
            {
              text: "如何充值",
              link: "./static/frame/pages/charge.html"
            },
            {
              text: "充值类别",
              link: "./static/frame/pages/chargeType.html"
            }
          ]
        },
        {
          type: "换电异常",
          questions: [
            {
              text: "拿错电池/电池不属于你，怎么办？",
              link: "./static/frame/pages/swapWrongBattery.html"
            },
            {
              text: "app提示系统繁忙，怎么办？",
              link: "./static/frame/pages/swapSystemError.html"
            },
            {
              text: "电池被吞怎么办？",
              link: "./static/frame/pages/swallowBattery.html"
            },
            {
              text: "离线换电怎么操作？",
              link: "./static/frame/pages/swapBatteryOffline.html"
            }
          ]
        },
        {
          type: "中控",
          questions: [
            {
              text: "定位/电量不更新",
              link: "./static/frame/pages/scooterLocationIssues.html"
            },
            {
              text: "车喇叭一直叫怎么办？",
              link: "./static/frame/pages/scooteHorn.html"
            },
            {
              text: "车（中控）固件升级方法？",
              link: "./static/frame/pages/fwUpgrade.html"
            },
            {
              text: "升级时连接不上，连接超时，蓝牙数据返回。",
              link: "./static/frame/pages/bleIssues.html"
            },
            {
              text: "绑定车辆",
              link: "./static/frame/pages/bind.html"
            },
            {
              text: "维修指引",
              link: "./static/frame/pages/maintainIssues.html"
            }
          ]
        },
        {
          type: "押金",
          questions: [
            {
              text: "押金怎么退已经到账时间？",
              link: "./static/frame/pages/returnDeposit.html"
            }
          ]
        },
        {
          type: "套餐",
          questions: [
            {
              text: "套餐相关问题",
              link: "./static/frame/pages/package.html"
            }
          ]
        },
        {
          type: "新用户",
          questions: [
            {
              text: "刚注册e换电用户怎么加入？",
              link: "./static/frame/pages/newUser.html"
            }
          ]
        },
      ]
    };
  },
  methods: {
    gotoAction: function(item) {
      window.location.href = item.link;
    },
    customServiceAction: function(){
      window.location.href = 'IMMOTOR://tel:0755-27787220';   
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
.serviceHeader {
  height: 100px;
}
.sectionTitle {
  height: 60px;
  margin-top: 20px;
  margin-left: 16px;
  font-size: 20px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(72, 72, 72, 1);
  line-height: 60px;
  text-align: left;
}

.textFont {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(72, 72, 72, 1);
}

.questionContentDiv {
  height: 54px;
}
.questionText {
  height: 53px;
  margin: 0 16px;
  text-align: left;
  line-height: 53px;
}
.qustionLine {
  height: 1px;
  margin: 0 16px;
  background: rgba(240, 240, 240, 1);
}

.bottomDiv {
  width: 100%;
  height: 80px;
  left: 0;
  bottom: 0;
  position: fixed;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.08);
  z-index: 999;
}

.telImgDiv {
  width: 16px;
  height: 16px;
  left: 148px;
  top: 19px;
  position: absolute;
}

.telText {
  width: 100px;
  height: 18px;
  left: 174px;
  top: 18px;
  position: absolute;
  font-size: 13px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(72, 72, 72, 1);
  line-height: 18px;
  text-align: left;
}
</style>
