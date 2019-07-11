<template>
  <div>
    <div v-for="item in data">
      <div class="rowDiv">
        <span class="rowTitle">{{item.cause}}</span>
        <img src="../assets/normal.png" class="rowImg" @click="checkQuest(item, $event)" />
      </div>
      <textarea
        type="text"
        maxlength="50"
        autocomplete="off"
        v-if="item.levelCause"
        class="textAreaClass textFontClass"
        placeholder="请输入"
        v-model="item.extension"
      ></textarea>
      <div class="lineClass"></div>
    </div>
    <div class="bottom"></div>
    <div class="submitButton" @click="submitQuestionnaire()">提交</div>
  </div>
</template>

<script>
export default {
  name: "questionnaire",
  data() {
    return {
      userToken: "",
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
              if(el.levelCause && el.levelCause.length > 0){
                el.extension = "";
              }
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
          var id = el.id;
          if(el.levelCause && el.extension.length > 0){
            id += ("&" + el.extension); 
          }
          selectIds.push(id);
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
              vueThis.fetchData();
            }
          }
        );
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
    },
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
    }
  },
  mounted() {
    this.userToken = this.getUrlParam("token");
    if (this.userToken && this.userToken.length > 0) {
      this.userToken = "bearer " + this.userToken;
      this.fetchData();
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
        this.fetchData();
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

.bottom{
  height: 100px;
}

.submitButton {
  position: fixed;
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

.textAreaClass {
  padding: 6px;
  width: 90%;
  height: 45px;
  background: rgba(247, 247, 247, 1);
  border: 0;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}

.textFontClass {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333;
}
</style>
