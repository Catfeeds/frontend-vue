<template>
  <div class="inviter">
    <div class="inviter_top relative">
      <img class="relative" src="../assets/images/invite-04 2@2x(1).png" alt />
      <div class="inviter_rule" @click="g_regulation()">
        <img class="absolute" src="../assets/images/分组@2x.png" alt />
      </div>
    </div>

    <div class="inviter_invitation relative">
      <img class="absolute" src="../assets/images/letter@2x.png" alt />
      <div class="charge absolute">
        <ul>
          <li class="g_separation">每邀请一位好友首次购买您将获得</li>
          <li class="g_gap">3天免费换电</li>
          <li class="g_interval">您的好友将获得20元优惠券+5天免费换电</li>
        </ul>
        <ul class="charge_ul">
          <li class="g_separation g_separation_1">最高可获得</li>
          <li class="g_gap g_gap_1">1年免费换电</li>
          <li class="g_interval g_interval_1">可叠加获取使用</li>
        </ul>
      </div>
      <div class="inviter_flow relative">
        <ul>
          <li v-for="(item,index) in flow" :key="index">
            <img :src="item.img" alt />
          </li>
        </ul>
      </div>
    </div>
    <div class="invite_immediately relative">
      <div class="immediately_bg">
        <img class="relative" src="../assets/images/invite-04 2@2x.png" alt="">
      </div>
      <div class="immediately_invitation">
        <!-- <a href=""> -->
          <img class="absolute" src="../assets/images/butter@4x 2@2x.png" alt="" @click="immediatelyinvited()">
        <!-- </a> -->
      </div>
       <div class="award_img">
          <img class="absolute" src="../assets/images/reward@2x.png" alt="">
          <div class="award_data absolute">
            <ul>
              <li class="award_data_1">{{my_reward.freeDays}}天</li>
              <li class="award_data_2">{{my_reward.invCount}}人</li>
              <li class="award_data_3">{{my_reward.sucCount}}人</li>
            </ul>
          </div>
          
      </div>
      <div class="g_invite_my invite_announcement relative" v-if="flos">
        <img class="absolute" src="../assets/images/pk@2x.png" alt="">
        <div class="invite_my absolute">
          <img src="../assets/images/my invite@2x.png" alt="">
          <img class="invite_ranking" src="../assets/images/Invitation ranking@2x.png" alt="">
        </div>
        <!-- <div class="invite_my invite_ranking absolute">
        </div> -->
      </div>

      <div class="g_invite_my relative g_invite" v-if="g_flos">
        <img class="absolute" src="../assets/images/pk@2x(1).png" alt="">
        <div class="invite_my absolute">
          <img src="../assets/images/my invite@2x.png" alt="">
          <img class="invite_ranking" src="../assets/images/Invitation ranking@2x.png" alt="" @click="btns()">
        </div>
        <!-- <div class="invite_my invite_ranking absolute">
        </div> -->
        <div class="list_arrange absolute">
          <ul v-for="(item,index) in my_arrange" :key="index">
            <li class="list_arrange_1">{{index+1}}</li>
            <li class="list_arrange_2">{{item.phone}}</li>
            <li class="list_arrange_3">{{item.statusZH}} <span><img :src="contact_img" alt="" v-if="item.status ===0? true:false" @click="callPhone(item.phone)"></span></li>
          </ul>
        </div>
      </div>

       <div class="g_invite_my relative seniority" v-if="g_seniority">
        <img class="absolute" src="../assets/images/pk@2x(2).png" alt="">
        <div class="invite_my absolute">
          <img src="../assets/images/my invite@2x.png" alt="" @click="g_btns()">
          <img class="invite_ranking" src="../assets/images/Invitation ranking@2x.png" alt="">
        </div>
        <!-- <div class="invite_my invite_ranking absolute">
        </div> -->
        <div class="list_arrange absolute">
          <ul v-for="(item,index) in seniority_data" :key="index">
            <li class="list_arrange_1">{{index+1}}</li>
            <li class="list_arrange_2">{{item.phone}}</li>
            <li class="list_arrange_3">{{item.inviteeNum}}</li>
          </ul>
        </div>
      </div>
      <div class="immediately_invitation immediately_invitation_1">
        <!-- <a href=""> -->
          <img class="absolute" src="../assets/images/butter@4x 2@2x.png" alt="" @click="immediatelyinvited()">
        <!-- </a> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "inviter",
  data() {
    return {
      flow: [
        {
          img: require("@/assets/images/share@2x.png")
        },
        {
          img: require("@/assets/images/buy@2x.png")
        },
        {
          img: require("@/assets/images/free@2x.png")
        }
      ],
      my_reward:[],
      // url_domain:'https://test.ehuandian.net/server/promotion/app/',
      invActId:'',
      userToken:'',
      my_arrange:[],
      contact_img:require("@/assets/images/call@4x copy 2@2x.png"),
      seniority_data:[],
      flos:true,
      g_seniority:false,
      g_flos:false,
      pageIndex:1,
      pageSize:1000

    };
  },
  created(){
      let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
      str=str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
      let arr=str.split("&"); //各个参数放到数组里
      // console.log(arr)
      this.invActId = arr[0];
      for(let i=0;i < arr.length;i++){
          num=arr[i].indexOf("=");
          if(num>0){
          name=arr[i].substring(0,num);
          value=arr[i].substr(num+1);
          this[name]=value;
          }
      }
  },
  mounted() {
   
    //获取token
    var token = this.getUrlParam("token");
    if (token && token.length > 0) {
      this.userToken = "bearer " + token;

    } else {
      var u = navigator.userAgent;
      //userAgent中没有token字段使用jsbridge获取
      if (u.indexOf("token=") == -1) {
        this.getEhdUserInfoFromBridge();
      } else {
        token = u.substr(u.indexOf("token=") + 6, u.length);
        token = token.substr(0, token.indexOf("&"));
        this.userToken = "bearer " + token;

      }
    }

    if(this.userToken.length>0){
      this.reward();
      this.invitelist();
      this.toptenreviews();
    }
   
  },
  methods:{
    getUrlParam: function(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(decodeURIComponent(r[2]));
      return null;
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
              vueThis.reward();
              vueThis.invitelist();
              vueThis.toptenreviews();
            }
          }
        );
      } else {
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if (isiOS) {
          vueThis.$bridge.callhandler("getEhdUserInfo", "", responseData => {
            // 处理返回数据
            vueThis.userToken = "bearer " + responseData.token;
            vueThis.reward();
            vueThis.invitelist();
            vueThis.toptenreviews();
          });
        }
      }
    },
      reward(){
        var _this = this;
        // _this.userToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IjE4NjM5MjkxNTg1IiwidUlEIjoyNiwidGltZSI6MTU2MTYwNDA2NjEyM30.x5AyEmjh2V08fRn0uySpA7BTkEzleOJGFxguqdXQ6t8';
        _this.axios({
         method:"get",
        //  url:_this.$yApi.gainMyReward +'?'+ _this.invActId,
         url:_this.$yApi.gainMyReward,
         params:{
           invActId:_this.invActId
         },
         headers: {
            Authorization: _this.userToken
          }
        }).then(res=>{
          // console.log(window.location.href)
          this.my_reward = res.data.data;
        }).catch(err=>{
          console.log('Error',error.messgae)
        })
      },
      invitelist(){
        var _this = this;
        // _this.userToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IjE4NjM5MjkxNTg1IiwidUlEIjoyNiwidGltZSI6MTU2MTYwNDA2NjEyM30.x5AyEmjh2V08fRn0uySpA7BTkEzleOJGFxguqdXQ6t8';
        _this.axios({
         method:"get",
         url:_this.$yApi.gainMyInviteList,
         params:{
           pageIndex:_this.pageIndex,
           pageSize:_this.pageSize,
           invActId:_this.invActId
         },
         headers: {
            Authorization: _this.userToken
          }
        }).then(res=>{
          // console.log(res)
          _this.my_arrange = res.data.data.pageData;
          // console.log(_this.my_arrange.length)
          if(_this.my_arrange.length===0){
            _this.flos=true;
            _this.g_flos=false;
          }else{
            _this.g_flos=true;
            _this.flos=false;
          }
        }).catch(err=>{
          console.log('Error',error.messgae)
        })
      },
      toptenreviews(){
         var _this = this;
        // _this.userToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IjE4NjM5MjkxNTg1IiwidUlEIjoyNiwidGltZSI6MTU2MTYwNDA2NjEyM30.x5AyEmjh2V08fRn0uySpA7BTkEzleOJGFxguqdXQ6t8';
        _this.axios({
         method:"get",
         url:_this.$yApi.ToptenReviews+_this.invActId,
         headers: {
            Authorization: _this.userToken
          }
        }).then(res=>{
          // console.log(res)
        _this.seniority_data = res.data.data;
        }).catch(err=>{
          console.log('Error',error.messgae)
        })
      },
      btns(){
        this.g_seniority=true;
        this.g_flos=false;
      },
      g_btns(){
        this.g_seniority=false;
        this.g_flos=true;
      },
      immediatelyinvited(){
        window.location.href="IMMOTOR://shareAction";
      },
      callPhone(Phone){
        window.location.href = 'tel://'+Phone+'';
      },
      g_regulation(){
        this.$router.push("/regulation");
      }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to _this component only -->
<style scoped>
.inviter {
  height: 3182px;
  overflow: hidden;
}
img{
  outline-width:0px;
  vertical-align:top;
}
.relative{
  position: relative;
}
.absolute{
  position: absolute;
}
.inviter_top img {
  width: 750px;
  height: 1083px;
  left: 50%;
  margin-left: -375px;
}

.inviter_top .inviter_rule img {
  width: 125px;
  height: 27px;
  top: 47px;
  left: 50%;
  margin-left: 220px;
}

.inviter_invitation {
  width: 698px;
  height: 1004px;
  top: -600px;
  left: 50%;
  margin-left: -349px;
  z-index: 100;
}
.inviter_invitation img {
  width: 698px;
  height: 1004px;
}
.charge{
  top: 120px;
}
.charge .g_separation{
  margin-top: 13px;
  font-size: 21px;
  margin-left: 17px;
  color: #fefefeff;
  opacity: 0.8;
}
.charge .g_gap{
  margin-top: 12px;
  font-size: 42px;
  color: #fefefeff;
  text-align: center;
}
.charge .g_interval{
  margin-top: 30px;
  font-size: 21px;
  color: #413a3aff;
  text-align: center;
}
.charge ul{
  display: flex;
  flex-direction: column;
  width: 441px;
  height: 192px;
  margin-left: 130px;
  margin-bottom: 35px;
}
.charge .charge_ul{
  height: 182px;
}
.g_separation_1{
  margin-top: 10px!important;
}
.g_gap_1{
  margin-top: 8px!important;
}
.g_interval_1{
  margin-top: 28px!important;
}
.inviter_flow {
  top: 776px;
}
.inviter_flow ul{
  display: flex;
  justify-content: space-around;
  margin-top:255px;
  margin-left: -18px;
}
.inviter_flow ul li{
  width: 105px;
  height: 105px;
}
.inviter_flow ul li img {
  width: 105px;
  height: 105px;
}
.invite_immediately{
  top: -1259px
}
.invite_immediately .immediately_bg img{
  width: 750px;
  height: 2101px;
  left: 50%;
  margin-left:-375px;
}
.invite_immediately .immediately_invitation img{
  width: 400px;
  height: 91px;
  top: 682px;
  left: 50%;
  margin-left:-200px;
}
.award_img img{
  width:664px;
  height:389px; 
  top: 810px;
  left: 50%;
  margin-left:-332px;
}
.award_data{
  width: 750px;
  top: 1000px;
  left: 50%;
  margin-left:-395px;
}
.award_data ul{
  display: flex;
  justify-content: space-around;
  font-size: 30px;
  color: #F6335BFF;
  margin-top: 20px;
}
.award_data ul .award_data_1{
  margin-left: 70px;
  /* margin-top: 20px; */
}
.award_data ul .award_data_2{
  /* margin-top: 20px; */
  margin-left: 110px
}
.award_data ul .award_data_3{
  /* margin-top: 20px; */
  margin-right: 60px
}
.g_invite_my{
  width:664px;
  height:707px;
  top:-867px;
  left: 50%;
  margin-left:-332px;
}
.g_invite_my img{
  width:664px;
  height:707px;
}
.g_invite_my .invite_my img{
  width:284px;
  height:69px;
  margin-top: 144px;
  margin-left: 32px;
}
.g_invite_my .invite_ranking img{
  margin-left: 138px;
}
.g_invite_my .invite_ranking{
  margin-left: -6px!important;
}
.immediately_invitation_1 img{
  /* bottom: 0; */
  top: 1969px!important;
}
.list_arrange{
  width: 570px;
  height: 350px;
  overflow-x:hidden;
  overflow-y: auto;
  margin-top: 290px;
  margin-left: 32px;
  -webkit-overflow-scrolling: touch;

}
.list_arrange ul{
  display: flex;
  height: 69px;
  line-height: 69px;
  justify-content: space-around;
  text-align: center;
}
.list_arrange ul .list_arrange_1{
  width: 119px;
  /* margin-left: 41px; */
}
.list_arrange ul .list_arrange_2{
  width: 231px;
  /* margin-left: 38px; */
}
.list_arrange ul .list_arrange_3{
  width: 217px;
  margin-right: -15px;
}
.list_arrange_3 span img{
  width: 75px;
  height: 30px;
  margin-top: 20px;
}
/*定义了滚动条整体样式；*/ 
	/* .list_arrange::-webkit-scrollbar{
  position: absolute;
  height: 28px !important;
	width: 22px !important;
  margin-left: 15px;
} */
/*定义了滚动条滑块的样式*/
	/* .list_arrange::-webkit-scrollbar-thumb {
      background:url('~@/assets/images/butter up@2x.png') no-repeat center;
      border-radius: 10px;
} */
		
		/*定义了轨道的样式*/ 
		
/* .list_arrange::-webkit-scrollbar-track {
    background:url('~@/assets/images/up down@2x.png') no-repeat center;
    }	 */
</style>
