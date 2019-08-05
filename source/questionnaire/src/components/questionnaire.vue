<template>
  <div>
    <div class="pageTitle">押金退还原因（可多选）</div>
    <div v-for="item in data">
      <div class="rowDiv">
        <span class="rowTitle">{{item.cause}}</span>
        <img
          :id="item.id"
          src="../assets/normal.png"
          class="rowImg"
          @click="checkQuest(item, $event)"
        />
      </div>
      <textarea
        :id="item.textId"
        type="text"
        maxlength="200"
        autocomplete="off"
        v-show="item.checked"
        class="textAreaClass textFontClass"
        :placeholder="item.placeholder"
        v-model="item.extension"
        @input="descInput(item)"
      ></textarea>
      <div class="waringDiv" :id="item.warningId">
        <div class="waringIcon">
          <img src="../assets/warning.png" />
        </div>
        <p class="waringText">文本框内容必须填写！</p>
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
      userToken: "",
      submitState: false,
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
              el.textId = "text" + el.id;
              el.warningId = "warning" + el.id;
              if (el.levelCause && el.levelCause.length > 0) {
                el.extension = "";
              }
              el.placeholder = "请输入内容";
              if (el.desc == "其他") {
                el.placeholder = "请输入原因和建议，我们将为您不断改进！";
              } else if (el.desc == "改换其他公司产品") {
                el.placeholder = "请填写产品名称";
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
      if (item.checked && item.levelCause) {
        document.getElementById(item.textId).style.display = "";
      } else {
        document.getElementById(item.textId).style.display = "none";
      }
      let imgSrc = item.checked
        ? require("../assets/select.png")
        : require("../assets/normal.png");
      event.target.src = imgSrc;

      if(!item.checked){
        document.getElementById(item.warningId).style.display = "none";
      }
    },
    descInput: function(item) {
      if (item.extension.length > 0) {
        item.checked = true;
        let imgSrc = require("../assets/select.png");
        document.getElementById(item.id).src = imgSrc;
      }
    },
    submitQuestionnaire: function() {
      var selectIds = [];
      var isExtensionEmpty = false;
      var vueThis = this;
      vueThis.data.forEach(function(el) {
        if (el.checked) {
          var id = el.id;
          if (el.levelCause) {
            if (el.extension.length > 0) {
              id += "&" + el.extension;
              document.getElementById(el.warningId).style.display = "none";
            } else {
               document.getElementById(el.warningId).style.display = "flex";
              isExtensionEmpty = true;
            }
          }
          selectIds.push(id);
        }
      });
      if (selectIds.length === 0) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请选择押金退还原因";
        return;
      }
      if (isExtensionEmpty) {
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
input:focus,
textarea:focus {
  outline: none;
}
input,
textarea {
  text-shadow: 0px 0px 0px #000;
  -webkit-text-fill-color: transparent;
  caret-color: #333;
  resize: none;
  font-size: 12px;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  text-shadow: none;
  -webkit-text-fill-color: initial;
}

img{
  width: 100%;
  height: 100%;
  display: block;
}

.pageTitle {
  height: 44px;
  padding-left: 15px;
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
  line-height: 44px;
  text-align: left;
  background: rgba(247, 247, 247, 1);
}

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
  color: rgba(69, 69, 69, 1);
  text-align: left;
  line-height: 60px;
}

.rowImg {
  margin: 20px 0;
  width: 20px;
  height: 20px;
  display: block;
}

.waringDiv {
  height: 44px;
  display: none;
}

.waringIcon {
  height: 10px;
  width: 10px;
  margin-top: 13px;
  margin-left: 15px;
}

.waringText {
  width: 200px;
  height: 17px;
  margin-left: 5px;
  margin-top: 10px;
  font-size: 12px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 85, 85, 1);
  line-height: 17px;
  text-align: left;
}

.lineClass {
  width: 100%;
  height: 1px;
  background: rgba(235, 235, 235, 1);
}

.submitButton {
  margin: 30px 15px 15px 15px;
  height: 50px;
  background: rgba(252, 145, 83, 1);
  border-radius: 5px;
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
  border: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
  line-height: 16px;
}

.textFontClass {
  font-size: 14px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #333;
}
</style>
