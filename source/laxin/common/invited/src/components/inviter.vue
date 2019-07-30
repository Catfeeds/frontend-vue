<template>
  <div class="inviter">
    <div class="inviter_top relative">
      <img class="relative" src="../assets/images/invite-04 2@2x(1).png" alt />
      <div class="inviter_rule" @click="g_regulation()">
        <img class="absolute" src="../assets/images/分组@2x.png" alt />
      </div>
      <div class="inviter_time absolute">活动时间：2019.07.22-2019.09.30</div>
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
          <li class="g_separation_1">最高可获得</li>
          <li class="g_gap_1">1年免费换电</li>
          <li class="g_interval_1">可叠加获取使用</li>
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
            <ul class="awarad_data_all" v-if="data_judge">
              <li class="award_data_1">{{my_reward.freeDays}}天</li>
              <li class="award_data_2">{{my_reward.invCount}}人</li>
              <li class="award_data_3">{{my_reward.sucCount}}人</li>
            </ul>
             <ul v-if="!data_judge">
              <li class="award_data_1">{{my_reward.freeDays}}天</li>
              <li class="award_data_2">{{my_reward.invCount}}人</li>
              <li class="award_data_3">{{my_reward.sucCount}}人</li>
            </ul>
          </div>
          
      </div>
      <div class="g_invite_my invite_announcement relative" v-if="flos">
        <img class="absolute" src="../assets/images/pk@2x.png" alt="">
        <div class="invite_my absolute" v-for="(item,index) in invite_show" :key="index">
          <span class="g_my_invite01 r_s">{{item.my}}</span>
          <span class="g_my_invite01 invite_ranking s_r" @click="btns(index)">{{item.ranking}}</span>
        </div>
        <!-- <div class="invite_my invite_ranking absolute">
        </div> -->
      </div>
       <div class="g_invite_my invite_announcement relative" v-if="flos_seniority">
        <img class="absolute" src="../assets/images/pk@2x.png" alt="">
        <div class="invite_my absolute" v-for="(item,index) in invite_show" :key="index">
          <span class="g_my_invite01 s_r" @click="g_btns()">{{item.my}}</span>
          <span class="g_my_invite01 invite_ranking r_s" @click="btns(index)">{{item.ranking}}</span>
        </div>
        <!-- <div class="invite_my invite_ranking absolute">
        </div> -->
      </div>

      <div class="g_invite_my relative g_invite" v-if="g_flos">
        <img class="absolute" src="../assets/images/pk@2x(3).png" alt="">
        <div class="invite_my absolute" v-for="(item,index) in invite_show" :key="index">
          <span class="g_my_invite01 r_s">{{item.my}}</span>
          <span class="g_my_invite01 invite_ranking s_r" @click="btns()">{{item.ranking}}</span>
        </div>
        <!-- <div class="invite_my invite_ranking absolute">
        </div> -->
        <div class="table_data absolute">
           <table border="1" width="100%" style="border-collapse: collapse;" bordercolor="#FFE4C0">
              <tr>
                <th class="list_arrange_1">序号</th>
                <th class="list_arrange_2">手机号</th>
                <th class="list_arrange_3">状态</th>
              </tr>
           </table>
        </div>
        <div class="list_arrange absolute">
          <table border="1" width="100%" style="border-collapse: collapse;" bordercolor="#FFE4C0">
            <tbody>
              <tr v-for="(item,index) in my_arrange" :key="index">
                <td class="list_arrange_1">{{index+1}}</td>
                <td class="list_arrange_2">{{item.phone}}</td>
                <td class="list_arrange_3">{{item.statusZH}} <span><img :src="contact_img" alt="" v-if="item.status ===0? true:false" @click="callPhone(item.phone)"></span></td>
              </tr>
            </tbody>
            
          </table>
          
        </div>
      </div>

       <div class="g_invite_my relative seniority" v-if="g_seniority">
        <img class="absolute" src="../assets/images/pk@2x(3).png" alt="">
        <div class="invite_my absolute" v-for="(item,index) in invite_show" :key="index">
          <span class="g_my_invite01" @click="g_btns()">{{item.my}}</span>
          <span class="g_my_invite01 invite_ranking r_s" @click="btns()">{{item.ranking}}</span>
        </div>
        <!-- <div class="invite_my invite_ranking absolute">
        </div> -->
        <div class="table_data absolute">
           <table border="1" width="100%" style="border-collapse: collapse;" bordercolor="#FFE4C0">
              <tr>
                <th class="list_arrange_1">序号</th>
                <th class="list_arrange_2">手机号</th>
                <th class="list_arrange_3">邀请成功人数</th>
              </tr>
           </table>
        </div>
        <div class="list_arrange absolute">
          <table border="1" width="100%" style="border-collapse: collapse;" bordercolor="#FFE4C0">
            <tbody>
              <tr v-for="(item,index) in seniority_data" :key="index">
                <td class="list_arrange_1">{{index+1}}</td>
                <td class="list_arrange_2">{{item.phone}}</td>
                <td class="list_arrange_3">{{item.inviteeNum}}</td>
              </tr>
            </tbody>
          </table>
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
import $ from 'jquery'
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
      flos_seniority:false,
      pageIndex:1,
      pageSize:1000,
      invite_show:[
        {
          my:'我的邀请',
          ranking:'邀请排行'
        }
      ],
      awarad_data_all:'awarad_data_all',
      data_judge:true

    };
  },
  created(){
      // let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
      // str=str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
      // let arr=str.split("&"); //各个参数放到数组里
      // // console.log(arr)
      // this.invActId = arr[1];
      // for(let i=0;i < arr.length;i++){
      //     num=arr[i].indexOf("=");
      //     if(num>0){
      //     name=arr[i].substring(0,num);
      //     value=arr[i].substr(num+1);
      //     this[name]=value;
      //     }
      // }
    let name,value,str=location.href,num=str.indexOf("?"); //取得整个地址栏
      str=str.substr(num+1); //取得所有参数 stringvar.substr(start [, length ]
      let arr=str.split("?"); //各个参数放到数组里
      let arr_s=arr[0].split("&"); //各个参数放到数组里
      this.invActId = arr_s[0];
    //   for(let i=0;i < arr.length;i++){
    //       num=arr[i].indexOf("=");
    //       if(num>0){
    //       name=arr[i].substring(0,num);
    //       value=arr[i].substr(num+1);
    //       this[name]=value;
    //       }
    // }
    // let city_arr = location.search;
    // let city_str=city_arr.split("&"); //各个参数放到数组里
    // for(let i=0;i<city_str.length;i++){
    //   let city_name = city_str[i].split('=');
    //   city_name = city_name[city_name.length-1]
    //   if(city_name==="4403"){
    //     // console.log(123)
    //     this.city_tab=false;
    //   }
    // }
  },
  mounted() {
    
    //获取id
    // if(this.getUrlParam("lotteryID")){
    //   this.invActId = this.getUrlParam("lotteryID");
    // }{
    //   this.invActId = 'lotteryID=5d2fd94d848dea0001234271';
    // }
    //获取token
    var token = this.getUrlParam("token");
    // this.reward();
    // this.invitelist();
    // this.toptenreviews();
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
        // _this.userToken = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJwaG9uZSI6IjE4MTM4ODE5NDk1IiwidUlEIjoxMSwidGltZSI6MTU2MzU5Njk1MjYwNn0.dTHfl-EB4Yh3nZWT40UCwyON_e7MoUcfFV4YPQ-f4uU';
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
          if(this.my_reward===undefined){
              this.data_judge=true;
          }else{
            this.data_judge=false;
          }
         
          // console.log( this.my_reward)
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
          // if(_this.my_arrange.length<5){
          //   $('.list_arrange tr').append('')
          // }
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
          console.log(res)
        _this.seniority_data = res.data.data;
        }).catch(err=>{
          console.log('Error',error.messgae)
        })
      },
      btns(){
        if(this.seniority_data.length ===0){
          this.flos_seniority =true
          this.flos=false;
          this.g_flos=false;
        }else{
          this.g_seniority=true;
          this.flos=false;
          this.g_flos=false;
        }
       
      },
      g_btns(){
        if(this.my_arrange.length===0){
          this.flos_seniority =false
          this.flos=true;
          this.g_seniority=false;
        }else{
          this.g_flos=true;
          this.g_seniority=false;
        }
        // console.log(index)
       
       
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
.s_r{
  color:#F8A136FF!important;
}
.r_s{
  background-color: #F8A136FF!important;
  color: #413A3A!important;
}
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
.inviter_time{
  top: 312px;
  /* left: 195px; */
  left: 50%;
  margin-left: -175px;
  height:21px;
  font-size:24px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(254,254,254,1);
  line-height:36px;
  opacity: 0.8;
}
.inviter_time_1{
  top: 270px;
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
  height:21px;
  font-size:21px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(254,254,254,1);
  margin-left: 17px;
  line-height:32px;
}
.charge .g_gap{
  margin-top: 28px;
  height:42px;
  font-size:42px;
  font-family:SourceHanSansCN-Bold;
  text-align: center;
  font-weight:bold;
  color:rgba(254,254,254,1);
  line-height:63px;
}
.charge .g_interval{
  margin-top: 45px;
  height:21px;
  font-size:21px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  text-align: center;
  color:rgba(65,58,58,1);
  line-height:32px;
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
  margin-top: 13px;
  height:20px;
  font-size:20px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  margin-left: 17px;
  color:rgba(254,254,254,1);
  line-height:30px;
}
.g_gap_1{
  margin-top: 23px;
  height:42px;
  font-size:42px;
  font-family:SourceHanSansCN-Bold;
  font-weight:bold;
  text-align: center;
  color:rgba(254,254,254,1);
  line-height:63px;
}
.g_interval_1{
  margin-top: 43px;
  height:21px;
  font-size:21px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  text-align: center;
  color:rgba(65,58,58,1);
  line-height:32px;
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
  width:664px;
  height:389px; 
  top: 1000px;
  left: 50%;
  margin-left:-332px;
}
.award_data ul{
  display: flex;
  justify-content: flex-end;
  font-size: 30px;
  width:664px;
  color: #F6335BFF;
  margin-top: 20px;
}

.award_data ul .award_data_1{
  margin-right: 220px;
}
.award_data ul .award_data_2{
  margin-right: 115px;
}
.award_data ul .award_data_3{
  margin-right: 96px;
}
.awarad_data_all .award_data_1{
  margin-right: 235px!important;
}
.awarad_data_all .award_data_2{
  margin-right: 135px!important;
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
  margin-left: 45px;
}
.g_invite_my .invite_my .g_my_invite01{
  display: inline-block;
  width:285px;
  height:69px;
  line-height: 69px;
  text-align: center;
  margin-top: 144px;
  margin-left: 32px;
  background-color: #FAE6ACFF;
  color: #F8A136FF;
  /* border-radius: 5px; */
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
.g_invite_my .invite_my .invite_ranking{
  margin-left: 138px;
  /* background-color: #FDB257FF; */
  color: #413A3AFF;
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
  min-height:350px;
  max-height:350px;
  overflow-x:hidden;
  overflow-y: auto;
  margin-top: 282px;
  margin-left: 32px;
  -webkit-overflow-scrolling: touch;
  background: #ffffff;
}
.table_data{
  width: 570px;
  margin-top: 213px;
  margin-left: 32px;
}
.list_arrange tr{
  /* display: flex; */
  height: 69px;
  line-height: 69px;
  justify-content: space-around;
  text-align: center;
}
.table_data tr{
  height: 69px;
  line-height: 69px;
  justify-content: space-around;
  text-align: center;
  background: #FFFFFFFF;
}
.list_arrange tr:nth-child(2n){
  background: #FFFFFFFF;
}
.list_arrange tr:nth-child(2n-1){
  background: #FFF4E9;
}
.list_arrange_1{
  width: 119px;
  /* margin-left: 41px; */
}
.list_arrange_2{
  width: 231px;
  /* margin-left: 38px; */
}
.list_arrange_3{
  width: 217px;
  margin-right: -15px;
}
.list_arrange_3 span img{
  width: 75px;
  height: 30px;
  margin-top: 20px;
}
.list_arrange li{
  border: 1px solid #FFF4E9FF;
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
