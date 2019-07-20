<template>
  <div>
    <div class="datePickerDiv" @click="datePickerAction">
      <span class="leftItem titleFont">预计到店日期</span>
      <span>
        <div class="rightItem">
          <p class="rightDate textFont">{{selectDate}}</p>
          <div class="arrowIcon">
            <img class="imgClass" src="../assets/arrow.png" />
          </div>
        </div>
      </span>
    </div>
    <div class="timeSelectDiv">
      <p class="timeSelectTitle titleFont">预计到店时段</p>
      <div class="lineClass"></div>
      <ul class="timeSelectUL">
        <li v-for="(item, index) in sliceData">
          <div class="leftTimeText timeTextFont">{{item}}</div>
          <div class="rightSelectIcon" @click="selectTimeAction(index)">
            <img class="imgClass" :src="[index==selectIndex?selectImgSrc:normalImgSrc]" />
          </div>
        </li>
      </ul>
    </div>
    <div class="nameInputDiv">
      <span class="leftItem titleFont">你的姓名</span>
      <input class="textFont nameIuputClass" maxlength="10" autocomplete="off" placeholder="请输入您的姓名" v-model="username"></input>
    </div>
    <div class="submitBtn"  v-show="hidshow" @click="submitAction">完成</div>
    <mt-datetime-picker
      ref="picker"
      v-model="pickerValue"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      :startDate="startDate"
      @confirm="handleConfirm"
    ></mt-datetime-picker>
    <div class="toastMask" v-if="toastShow">
      <div class="toastBK">
        <div class="toastSuccessIcon">
          <img class="imgClass" src="../assets/success.png" />
        </div>
        <p class="toastSucessPrompt">预约成功</p>
        <p class="toastAppointmentInfo">
          <span class="infoRemarkFont">你已成功预约“</span>
          <span class="infoNameFont">{{siteName}}</span>
          <span class="infoRemarkFont">”</span>
        </p>
        <div class="toastFinishBtn" @click="finishAction">完成</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Appointment",
  data() {
    return {
      sliceData: [
        "9:00 - 11:00",
        "11:00 - 13:00",
        "13:00 - 15:00",
        "15:00 - 18:00"
      ],
      username: "",
      selectDate: "请选择到店日期",
      selectIndex: 0,
      pickerValue: "",
      showPicker: false,
      normalImgSrc: require("../assets/normal.png"),
      selectImgSrc: require("../assets/select.png"),
      startDate: new Date(),
      siteId: "",
      siteName: "宝安车行",
      toastShow: false,
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hidshow:true  //显示或者隐藏footer
    };
  },
  watch: {
    showHeight:function() {
        if(this.docmHeight > this.showHeight){
            this.hidshow=false
        }else{
            this.hidshow=true
        }
    }
  },
  methods: {
    selectTimeAction: function(index) {
      this.selectIndex = index;
    },
    datePickerAction: function() {
      this.showPicker = true;
      this.$refs.picker.open();
    },
    handleConfirm: function() {
      this.selectDate = this.formatDateToYYYYMMDD(this.pickerValue);
    },
    submitAction: function() {
      if ( !this.userToken || this.userToken.length == 0) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=没有获取到用户信息";
      }
      if (this.username.length == 0) {
        window.location.href = "IMMOTOR://showPrompt?code=0&message=请输入姓名";
        return;
      }
      if (this.selectDate == "请选择到店日期") {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=请选择到店日期";
        return;
      }
      let selectTimestamp = this.pickerValue.getTime();
      var todayDate = new Date();
      todayDate.setHours(0);
      todayDate.setMinutes(0);
      todayDate.setSeconds(0);
      let todayTimestamp = new Date().getTime();
      console.log(selectTimestamp - todayTimestamp);
      if (selectTimestamp - todayTimestamp > (3600 * 24 * 7 * 1000)) {
        window.location.href =
          "IMMOTOR://showPrompt?code=0&message=只能预约一周内的日期";
        return;
      }
      var vueThis = this;
      var time = vueThis.sliceData[vueThis.selectIndex];
      let startTime = time.substr(0, time.indexOf("-") - 1);
      let endTime = time.substr(time.indexOf("-") + 2, time.length);

      //调用提交接口
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.siteAppointment,
          data: {
            siteId: this.siteId,
            date: selectTimestamp,
            name: this.username,
            startTime: startTime,
            endTime: endTime
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: vueThis.userToken
          }
        })
        .then(function(resp) {
          var result = resp.data;
          if (result.resultCode == 1) {
            vueThis.siteName = result.data.siteInfo.name;
            vueThis.toastShow = true;
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
    finishAction: function() {
      window.location.href =
        "https://test.ehuandian.net/immotor/h5vue/appointmentSuccess/index.html";
    },
    formatDateToYYYYMMDD: function(oDate) {
      var year = oDate.getFullYear();
      var month =
        oDate.getMonth() + 1 < 10
          ? "0" + (oDate.getMonth() + 1)
          : oDate.getMonth() + 1;
      var day = oDate.getDate() < 10 ? "0" + oDate.getDate() : oDate.getDate();
      return year + "-" + month + "-" + day;
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
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
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
    var ODate = new Date();
    ODate.setDate(ODate.getDate() + 1);
    this.startDate = ODate;
    this.pickerValue = ODate;
    this.siteId = this.getUrlParam("siteId");
    var token = this.getUrlParam("token");
    if (token && token.length > 0) {
      this.userToken = "bearer " + token;
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
      }
    }
    var vueThis = this;
    window.onresize = ()=>{
        return(()=>{
            vueThis.showHeight = document.body.clientHeight;
        })()
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.imgClass {
  width: 100%;
  height: 100%;
  display: block;
}

.titleFont {
  font-size: 28px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
}

.textFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(118, 118, 118, 1);
}

.timeTextFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(69, 69, 69, 1);
}

.datePickerDiv {
  width: 100%;
  height: 100px;
  margin-top: 20px;
  background: #fff;
  justify-content: space-between;
  display: flex;
}

.leftItem {
  margin-left: 30px;
  height: 100px;
  line-height: 100px;
  text-align: left;
}

.rightItem {
  margin-left: 30px;
  margin-right: 30px;
  height: 100px;
  line-height: 100px;
  text-align: right;
  position: relative;
}

.rightDate {
  width: 200px;
  right: 30px;
  height: 100px;
  top: 0;
  position: absolute;
  line-height: 100px;
  text-align: right;
}

.arrowIcon {
  width: 10px;
  height: 20px;
  top: 40px;
  right: 0;
  position: absolute;
}

.timeSelectDiv {
  width: 100%;
  height: 420px;
  margin-top: 20px;
  background: #fff;
}

.timeSelectTitle {
  margin-left: 30px;
  height: 98px;
  line-height: 98px;
  text-align: left;
  justify-content: space-between;
  display: flex;
}

.timeSelectUL {
  margin-top: 30px;
  margin-bottom: 40px;
  padding: 1px;
}

.timeSelectUL li {
  height: 40px;
  margin-top: 0;
  margin-bottom: 30px;
  margin-left: 50px;
  margin-right: 50px;
  justify-content: space-between;
  display: flex;
}

.leftTimeText {
  height: 40px;
  margin-right: 10px;
  text-align: left;
}

.rightSelectIcon {
  width: 34px;
  height: 34px;
  margin: auto;
  margin-right: 0;
}

.lineClass {
  height: 2px;
  margin-left: 30px;
  margin-right: 30px;
  background-color: #f7f7f7;
}

.nameInputDiv {
  width: 100%;
  height: 100px;
  margin-top: 20px;
  background: #fff;
  justify-content: space-between;
  display: flex;
}

.nameIuputClass {
  width: 400px;
  height: 100px;
  margin-right: 30px;
  text-align: right;
  line-height: 100px;
  background-color: transparent;
	border: 0;
	-webkit-tap-highlight-color:rgba(255,0,0,0);
}

.submitBtn {
  left: 40px;
  right: 40px;
  bottom: 30px;
  height: 88px;
  position: absolute;
  background: rgba(248, 127, 58, 1);
  border-radius: 10px;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 88px;
}

.pickerDiv {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
}

.toastMask {
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
}

.toastBK {
  width: 600px;
  height: 637px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 10px;
  position: relative;
}

.toastSuccessIcon {
  width: 134px;
  height: 124px;
  margin: auto;
  margin-top: 132px;
}

.toastSucessPrompt {
  width: 200px;
  height: 50px;
  margin: auto;
  margin-top: 60px;
  font-size: 36px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(69, 69, 69, 1);
  line-height: 50px;
}

.toastAppointmentInfo {
  width: 100%;
  height: 40px;
  margin: auto;
  margin-top: 20px;
  line-height: 40px;
}

.infoRemarkFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(165, 165, 165, 1);
}

.infoNameFont {
  font-size: 28px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: #454545;
}

.toastFinishBtn {
  width: 510px;
  height: 88px;
  margin: auto;
  margin-top: 74px;
  background: rgba(248, 127, 58, 1);
  border-radius: 10px;
  font-size: 32px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 88px;
}
</style>
