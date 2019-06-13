<template>
  <div>
    <div v-for="item in data">
      <div class="rowDiv">
        <span class="rowTitle">{{item.text}}</span>
        <img class="rowImg" :src="item.src" @click="checkQuest(item)">
      </div>
      <div class="lineClass"></div>
    </div>
    <div class="submitButton" @click="submitQuestionnaire()">提交</div>
  </div>
</template>

<script>
export default {
  name: "questionnaire",
  data() {
    return {
      data: []
    };
  },
  methods: {
    checkQuest: function(item) {
      item.checked = !item.checked;
      item.src = item.checked
        ? require("./../assets/select.png")
        : require("./../assets/normal.png");
    },
    submitQuestionnaire: function(){
       window.location.href = "IMMOTOR://submitQuestionnaireSuccess";
    }
  },
  mounted() {
    this.data = [
      {
        text: "最近没有使用需求",
        id: 1,
        checked: false,
        src: require("./../assets/normal.png")
      },
      {
        text: "改换其他公司产品",
        id: 2,
        checked: false,
        src: require("./../assets/normal.png")
      },
      {
        text: "押金贵",
        id: 3,
        checked: false,
        src: require("./../assets/normal.png")
      },
      {
        text: "骑行费用高，不划算",
        id: 4,
        checked: false,
        src: require("./../assets/normal.png")
      },
      {
        text: "电池续航能力稍差",
        id: 5,
        checked: false,
        src: require("./../assets/normal.png")
      },
      {
        text: "换电柜站点分布太少",
        id: 6,
        checked: false,
        src: require("./../assets/normal.png")
      },
      {
        text: "其他",
        id: 7,
        checked: false,
        src: require("./../assets/normal.png")
      }
    ];
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rowDiv {
  height: 60px;
  padding: 0 18px;
  line-height: 60px;
  position: relative;
  display: flex;
  justify-content: space-between;
}

.rowTitle {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
  text-align: left;
  line-height: 60px;
}

.rowImg {
  margin: 20px 0;
  width: 20px;
  height: 20px;
  display: block;
}

.lineClass {
  width: 100%;
  height: 1px;
  background: rgba(235, 235, 235, 1);
}

.submitButton {
  position: absolute;
  left: 10px;
  right: 10px;
  bottom: 40px;
  height: 50px;
  background: rgba(252, 145, 83, 1);
  border-radius: 2px;
  font-size: 16px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 50px;
}
</style>
