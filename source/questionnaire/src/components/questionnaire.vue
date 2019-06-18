<template>
  <div>
    <div v-for="item in data">
      <div class="rowDiv">
        <span class="rowTitle">{{item.cause}}</span>
        <img src="../assets/normal.png" class="rowImg" @click="checkQuest(item, $event)">
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
      userToken:
        "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IjEzNTM0MDQwMzU5IiwidUlEIjo0NDk1LCJ0aW1lIjoxNTYwODM5ODAzNzAxfQ.ZxIldKWryO5wSygjHWIpLm3RTj8443hXu3od1WkbYDs",
      data: []
    };
  },
  methods: {
    fetchData: function() {
      var vueThis = this;
      vueThis
        .axios({
          method: "get",
          url: vueThis.$yApi.getQuestionnaireData,
          headers: {
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            vueThis.data = result.data.pageData;
            result.data.pageData.forEach(function(el) {
              el.checked = false;
            });
            vueThis.data = result.data.pageData;
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
    checkQuest: function(item, event) {
      item.checked = !item.checked;
      var imgSrc = item.checked
        ? require("../assets/select.png")
        : require("../assets/normal.png");
      event.target.src = imgSrc;
    },
    submitQuestionnaire: function() {
      var selectIds = [];
      var vueThis = this;
      vueThis.data.forEach(function(el) {
        if (el.checked) {
          selectIds.push(el.id);
        }
      });
      if (selectIds.length === 0) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请选择押金退还原因";
        return;
      }
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.recordQuestionnaire,
          data: {
            ids: selectIds
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            window.location.href = "IMMOTOR://submitQuestionnaireSuccess";
          } else {
            window.location.href =
              "IMMOTOR://showPrompt?code=0&message=" + result.resultMsg;
          }
        })
        .catch(resp => {
          window.location.href =
            "IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置";
        });
    }
  },
  mounted() {
    var vueThis = this;
    var u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    if (isAndroid) {
      vueThis.$bridge.callAndriodHandler("getEhdUserInfo", "", responseData => {
        // 处理返回数据
        var dataObj = JSON.parse(responseData);
        if (dataObj && dataObj.token) {
          vueThis.userToken = "bearer " + dataObj.token;
          vueThis.fetchData();
        }
      });
    } else {
      var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isiOS) {
        vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
          // 处理返回数据
          vueThis.userToken = "bearer " + responseData.token;
          vueThis.fetchData();
        });
      }
    }
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
