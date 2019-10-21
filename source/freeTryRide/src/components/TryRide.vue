<template>
  <div>
    <div class="header1">
      <img src="../assets/header-1.png" />
    </div>
    <div class="header2">
      <img src="../assets/header-2.png" />
    </div>
    <div class="header3">
      <img src="../assets/header-3.png" />
      <van-field
        class="filed nameField"
        v-model="name"
        placeholder="请输入姓名"
        type="text"
        maxlength="20"
        clearable
      ></van-field>
      <van-field
        class="filed phoneField"
        v-model="phone"
        placeholder="请输入手机号码"
        type="tel"
        maxlength="11"
        clearable
      ></van-field>
      <div class="submit" @click="sumitAction">立即报名</div>
    </div>
    <div class="header4">
      <img src="../assets/header-4.png" />
    </div>
    <div class="header5">
      <img src="../assets/header-5.png" />
    </div>
    <div class="header6">
      <img src="../assets/header-6.png" />
    </div>
  </div>
</template>

<script>
export default {
  name: "TryRide",
  data() {
    return {
      name: "",
      phone: ""
    };
  },
  methods: {
    sumitAction: function() {
      if (this.name.trim().length == 0) {
        this.showAlter("请输入姓名");
        return;
      }
      if (this.phone.length == 0) {
        this.showAlter("请输入手机号码");
        return;
      }
      if (!this.isPhoneNumber(this.phone)) {
        this.showAlter("请输入正确手机号码");
        return;
      }
      var vueThis = this;
      vueThis
        .axios({
          method: "post",
          url: vueThis.$yApi.addUserInfo,
          data: {
            name: vueThis.name.trim(),
            phone: vueThis.phone
          },
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then(function(resp) {
          var data = resp.data;
          if (data.resultCode == 1) {
            vueThis.showAlter("提交成功");
            vueThis.name="";
            vueThis.phone="";
          } else {
            vueThis.showAlter(data.resultMsg);
          }
        })
        .catch(resp => {
          vueThis.showAlter("网络连接似乎已断开，请检查您的网络设置");
        });
    },
    isPhoneNumber: function(val) {
      var reg = /^1[0-9]{10}$/;
      return reg.test(val);
    },
    showAlter: function(msg) {
      this.$dialog
        .alert({
          message: msg
        })
        .then(() => {
          // on close
        });
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

.header1 {
  height: 393px;
  position: relative;
}

.header2 {
  height: 270px;
  position: relative;
}

.header3 {
  height: 478px;
  position: relative;
}

.header4 {
  height: 804px;
  position: relative;
}
.header5 {
  height: 694px;
  position: relative;
}
.header6 {
  height: 313px;
  position: relative;
}
.filed {
  left: 30px;
  width: 315px;
  height: 44px;
  position: absolute;
  background: rgba(239, 239, 239, 1);
  border-radius: 5px;
}
.nameField {
  top: 105px;
}
.phoneField {
  top: 163px;
}
.submit {
  left: 30px;
  top: 227px;
  width: 315px;
  height: 44px;
  position: absolute;
  background: linear-gradient(
    180deg,
    rgba(255, 193, 75, 1) 0%,
    rgba(255, 106, 21, 1) 100%
  );
  border-radius: 10px;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 44px;
}
</style>
