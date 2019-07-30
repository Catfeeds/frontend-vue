<template>
  <div class="registercharge">
    <div class="registercharge_top relative">
      <img class="relative" src="../assets/images/invited-03 2@2x(1).png" alt />
      <div class="registercharge_rule" @click="g_regulation()">
        <img class="absolute" src="../assets/images/分组@2x.png" alt />
      </div>
    </div>
     <div class="relative registercharge_award">
      <img class="absolute" src="../assets/images/sale@2x_1.png" alt="">
      <div class="absolute" >
        <ul class="registercharge_ul">
          <li>{{discount_coupon.price_sky}}</li>
          <li>{{discount_coupon.element_sky}}</li>
          <li>{{discount_coupon.name}}</li>
        </ul>
      </div>
    </div>
    <div class="registercharge_immediately relative">
        <div class="immediately_bg">
          <img class="relative" src="../assets/images/invited-03 2@2x.png" alt="">
        </div>
        <div class="immediately_invitation relative">
          <div class="register_img relative">
            <img src="../assets/images/register@2x.png" alt="">
          </div>
          <div class="immediately_input absolute">
            <div class="g_phone v">
              <input type="text" placeholder="请输入手机号" maxlength="11" onkeyup="value=value.replace(/[^\d]/g ,'')" v-model="userPhone">
            </div>
            <div class="g_verification v relative">
              <input type="text" placeholder="验证码" maxlength="6" onkeyup="value=value.replace(/[^\d]/g ,'')" v-model="verification_code"/> 
              <div class="g_width absolute"></div>
              <a class="btn absolute"><span @click="btn()" v-if="btn_img">获取验证码</span><span v-if="!btn_img">{{timeLeft}}s后获取</span></a>
            </div>
            <div class="g_city v">
              <!-- <input type="text" placeholder="所在城市" v-model="userCity"/>  -->
              <!-- <a class="btn">获取验证码</a> -->
              <van-cell-group>
                  <van-cell v-model="citymodel" :title="title" value="" @click="show = true" ></van-cell>
                  <van-popup v-model="show" position="bottom">
                      <van-area
                      ref="area"
                      value="110000"
                      :area-list="areaList"
                      :columns-num="2"
                      @change="onChange"
                      @confirm="onConfirm"
                      @cancel="show = false"
                      />
                  </van-popup>
              </van-cell-group>
            </div>
            <div class="g_button v">
              <img src="../assets/images/get@4x 2@2x.png" alt="" @click="buttonAward()">
            </div>
          </div>
        </div>
        <div class="transition relative">
          <img src="../assets/images/icon@2x.png" alt="">
          <ul class="absolute">
            <li v-for="(item,index) in transition_img" :key="index">
              <img :src="item.img" alt="">
            </li>
          </ul>
        </div>
        <div class="g_video relative">
          <img src="../assets/images/1min@2x.png" alt="">
          <div class="video_img absolute">
             <video playsinline id="my-video" class="video-js vjs-big-play-centered" controls preload="auto" poster="../assets/images/video@2x.png"
                data-setup="{}">
                <source src="https://imgcn.immotor.com/promotion/video/invitation.mp4" type="video/mp4">
                <source src="http://vjs.zencdn.net/v/oceans.webm" type="video/webm">
                <source src="http://vjs.zencdn.net/v/oceans.ogv" type="video/ogg">
                <p class="vjs-no-js"> To view this video please enable JavaScript, and consider upgrading to a web browser
                    that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a> </p>
            </video>
          </div>
        </div>
        <div class="download relative">
            <img src="../assets/images/download@4x 2@2x.png" alt="" @click="e_download()">
        </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import { Cell, CellGroup, Popup, Field,  Area, Picker, Dialog  } from 'vant'
import AddressInfo from "../assets/js/area.js";
export default {
  name: "registercharge",
  components:{
    VanCell: Cell,
    VanCellGroup: CellGroup,
    VanPopup: Popup,
    VanField: Field,
    VanArea: Area,
    VanPicker: Picker
  },
  data() {
    return {
      userToken:'',
      discounts:[
        {
          price_sky:20,
          element_sky:'元',
          name:'无门槛优惠券'
        },
        {
          price_sky:5,
          element_sky:'天',
          name:'不限次免费换电'
        }
      ],
       transition_img:[
        {
          img:require('@/assets/images/safe@2x.png')
        },
        {
          img:require('@/assets/images/wallet@2x.png')
        },
        {
          img:require('@/assets/images/Rock@2x.png')
        },
        {
          img:require('@/assets/images/protection@2x.png')
        }
      ],
      isBtnLoading:false,
      timeLeft:60,
      userPhone:'',
      verification_code:'',
      btn_img:true,
      btn_class:$(".btn"),
      userCity:'',
      // show:false
      // data_city:'https://test.ehuandian.net/server/promotion/app//userCity',//促销测试环境
      // data_city:'https://promotion.ehuandian.net/server/promotion/app//userCity',//促销正式环境
      show: false,
      citymodel: '',
      areaList:AddressInfo,
      title:'所在城市',
      // city_tab:true,
      discount_coupon:{
        price_sky:'被邀请人可获得',
        element_sky:'50元优惠券',
        name:'购买299包月套餐可用'
      }
    };
  },
  created(){
    //  let city_arr = location.search;
    // let city_str=city_arr.split("&"); //各个参数放到数组里
    // for(let i=0;i<city_str.length;i++){
    //   let city_name = city_str[i].split('=');
    //   city_name = city_name[city_name.length-1]
    //   console.log(city_name)
    //   if(city_name==="4403"){
    //     this.city_tab=false;
    //   }
    // }
  },
  mounted(){
    // console.log($)
    if (this.isBtnLoading) {
          return;
        }
  },
  methods:{
    onConfirm: function (value, index) {
      this.show = false
      let areaName = ''
      for (var i = 0; i < value.length; i++) {
        // console.log(value[i])
        areaName = areaName + value[i].name + ' '
        // areacode = areacode + value[i].code + ' '
      }
      // console.log(areacode)
      this.citymodel = areaName
      this.title = ''
    },
     onChange (picker, value, index) {
        let areaName = ''
        for (var i = 0; i < value.length; i++) {
          // console.log(value[i])
          areaName = areaName + value[i].name + ' '
          // areacode = areacode + value[i].code + ' '
        }
        // console.log(areacode)
        this.citymodel = areaName
        this.title='';
    },
    btn(){
      var _this = this;
      if (!_this.userPhone) {
            Dialog.alert({
            message: '请输入手机号'
              }).then(() => {
                // on close
            });
          return;
        }else{
          _this.axios({
            method:"post",
            url:_this.$yApi.postacquireData,
            params:{
              phone:_this.userPhone
            }
          }).then(res=>{
            var code = res.data.code
            if (code == 600) {
              Dialog.alert({
                  message: '短信已发送，请注意查收'
                }).then(() => {
                  // on close
              });
							_this.timeLeft = 60
							_this.timeCount();
							_this.isBtnLoading = true;
						}else {
							var errorMsg = '获取验证码失败'
              Dialog.alert({
                  message: errorMsg
                }).then(() => {
                  // on close
              });
							// 恢复btn点击事件
							 _this.btn_class.removeAttr('disabled')
						}
          }).catch(err=>{
            console.log(err)
            var errorMsg = '获取验证码失败';
          })
        }

    },
     timeCount() {
      var _this = this;
			window.setTimeout(function() {
				if(_this.timeLeft > 0) {
          _this.timeLeft -= 1;
					_this.timeCount();
          _this.btn_img=false;
				}else {
          _this.btn_img=true;
					_this.isBtnLoading  = false;
					_this.btn_class.html("获取验证码");
					_this.btn_class.removeAttr('disabled')
				}
			}, 1000);
    },
    getQueryURLParam(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
      if(r!=null)return  unescape(r[2]); return null;
    },
    joinInESwap() {
      window.location.href="https://imgcn.immotor.com/promotion/activity/shenzhen5/register1/index.html#/";//正式环境
      // window.location.href="https://test.ehuandian.net/immotor/h5vue/be_invited_1/index.html#/";//测试环境
		},
    buttonAward(){
      var _this = this;
      if (!_this.userPhone) {
        Dialog.alert({
          message: '请输入手机号'
        }).then(() => {
          // on close
        });
        return;
      }
      if (!_this.verification_code) {
         Dialog.alert({
          message: '请输入验证码'
        }).then(() => {
          // on close
        });
        return;
      }
      if (!_this.citymodel) {
         Dialog.alert({
          message: '请输入城市'
        }).then(() => {
          // on close
        });
        return;
      }
      var regActId = _this.getQueryURLParam('regActId');
			var invActId = _this.getQueryURLParam('invActId');
      var inviterId = _this.getQueryURLParam('inviterId');
      _this.axios({
        method:"post",
        url:_this.$yApi.postacquireAward+`?phone=${_this.userPhone}&invitorId=${inviterId}&inviteActivityId=${invActId}&beInvitedActivityId=${regActId}&cCode=${_this.verification_code}`,
        // params:{
        //   phone:_this.userPhone,
        //   inviterId:inviterId,
        //   inviteActivityId:invActId,
        //   beInvitedActivityId:regActId,
        //   cCode:_this.verification_code
        // }
      }).then(res=>{
        var data = res.data;
        // console.log(data)
        // console.log(typeof(_this.userCity))
      
        if(data.code== 600){
            // alert("加入e换电成功");
          _this.axios({
          method:"post",
          url:_this.$yApi.postacquireCity,
          data:{
            phone:_this.userPhone,
            cityName:_this.citymodel
          }
          }).then(res=>{
            var data = res.data.resultCode
            if(!data===1){
              return false;
            }else{
            Dialog.alert({
                message: '注册成功'
              }).then(() => {
                // on close
              _this.joinInESwap();
              });
            }
          },err=>{
            console.log(err)
          })

					}
					else if (data.code == 644) {
             Dialog.alert({
                message: '该用户已注册，不能参与本次活动'
              }).then(() => {
                // on close
              });
					}
					else if (data.code == 615) {
             Dialog.alert({
                message: '输入的验证码不正确'
              }).then(() => {
                // on close
              });
					}
					else if (data.code == 638) {
             Dialog.alert({
                message: '请确认您的手机号是否正确'
              }).then(() => {
                // on close
              });
					}
					else{
             Dialog.alert({
                message: '注册失败，如需要请拨打客服热线：0755-27787220'
              }).then(() => {
                // on close
              });
					}
      },err=>{
        Dialog.alert({
            message: '注册失败，请检查您的网络是否连接'
          }).then(() => {
            // on close
        });
        
      })
    },
    g_regulation(){
      this.$router.push('/regulation');
    },
    e_download(){
      window.location.href="http://download.immotor.com/app/downloads/ehuandian";
    }

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.registercharge {
  height: 3049px;
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
.registercharge_top img {
  width: 750px;
  height: 1365px;
  left: 50%;
  margin-left: -375px;
}

.registercharge_top .registercharge_rule img {
  width: 125px;
  height: 27px;
  top: 47px;
  left: 50%;
  margin-left: 220px;
}
.registercharge_registercharge{
  width: 514px;
  height: 168px;
  top: -874px;
  left: 50%;
  margin-left: -257px;
}
.registercharge_registercharge img{
  width: 514px;
  height: 168px;
}
.registercharge_registercharge .charge{
  display: flex;
}
.registercharge_registercharge .charge ul{
  width: 238px;
  margin-top: 5px;
  height: 162px;
  color: #FEFEFEFF;
  text-align: center;
}
.registercharge_registercharge .charge ul .charge_1{
  margin-top: 20px;
  margin-bottom: 20px;
}
.registercharge_registercharge .charge ul .charge_1 span{
  font-size: 53px;
}
.registercharge_registercharge .charge ul:nth-child(2){
  margin-left: 35px;
}
.registercharge_award img{
  width: 441px;
  height: 182px;
}
.registercharge_award{
  width: 441px;
  height: 168px;
  top: -874px;
  left: 50%;
  margin-left: -220.5px;
}
.registercharge_ul{
  width: 441px;
  height: 182px;
}
.registercharge_ul li:nth-child(1){
  margin-top: 9px;
  margin-left: 17px;
  height:20px;
  font-size:20px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(254,254,254,1);
  line-height:30px;
}
.registercharge_ul li:nth-child(2){
  margin-top: 23px;
  height:42px;
  font-size:42px;
  font-family:SourceHanSansCN-Bold;
  font-weight:bold;
  color:rgba(254,254,254,1);
  line-height:63px;
  text-align: center;
}
.registercharge_ul li:nth-child(3){
  margin-top: 44px;
  height:21px;
  font-size:21px;
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(65,58,58,1);
  line-height:32px;
  text-align: center;
}
.registercharge_immediately{
  top: -168px;
}
.registercharge_immediately .immediately_bg img{
  width: 750px;
  height: 1684px;
  left: 50%;
  margin-left: -375px;
}
.immediately_invitation{
  top: -1964px;
  width: 665px;
  height: 796px;
  left: 50%;
  margin-left: -332.5px;
}
.registercharge_immediately .immediately_invitation .register_img img{
  width: 665px;
  height: 796px;
}
.immediately_input{
  top: 0;
  text-align: center; 
  margin-left: 32px;
  font-size:30px;
}
.immediately_input .v input{
  width: 600px;
  height: 100px;
  border: 1px solid transparent;
	border-radius:60px;
  margin-bottom: 48px;
  padding: 36px 0 36px 50px;
}
.immediately_input .g_city .van-cell-group .van-cell{
  width: 600px;
  height: 100px;
  border: 1px solid transparent;
  border-radius:60px;
  margin-bottom: 48px;
  padding: 36px 0 36px 50px;
}
.immediately_input .g_city .van-cell-group{
	border-radius:60px;
}
.van-hairline--top-bottom::after{
  border-width: 0;
}
.immediately_input .g_phone{
  margin-top: 134px;
}
.van-cell__title span{
  margin-left: -150px;
  color: #D1D1D1FF;
  font-size:30px;
}
.van-cell__value--alone{
  overflow:visible;
}
.van-cell__value--alone span{
  margin-left: -275px;
  font-size: 30px;
}

.g_width{
  width: 2px;
  height: 66px;
  background-color: #D1D1D1FF;
  top: 18px;
  right: 230px;
}
.g_verification .btn{
  font-family:SourceHanSansCN-Regular;
  font-weight:400;
  color:rgba(255,138,17,1);
  line-height:54px;
  top: 18px;
  right: 26px;
}
.g_verification .btn img{
  width: 181px;
  height: 65px;
}
.g_verification .btn span{
  display: inline-block;
  font-size: 34px;
  margin-top: 6px;
}
.g_button img{
  width: 433px;
  height: 90px;
}
:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
  color: #D1D1D1FF; 
  font-size: 30px;
}

::-moz-placeholder { /* Mozilla Firefox 19+ */
  color: #D1D1D1FF;
  font-size: 30px;
}

input:-ms-input-placeholder,
textarea:-ms-input-placeholder {
  color: #D1D1D1FF;
  font-size: 30px;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #D1D1D1FF;
  font-size: 30px;
}
.transition{
  top: -1910px;
  height:236px;
  left: 50%;
  margin-left: -332px;
}
.transition img{
  width:664px;
  height:236px;
}
.transition ul{
  width: 664px;
  display: flex;
  top: 40px;
  /* justify-content: space-around; */
}

.transition ul li{
  width: 105px;
  height: 105px;
}
.transition ul li:first-child{
  margin-left: 25px;
}
.transition ul li{
  margin-left: 65px;
}
.transition ul img{
  width: 105px;
  height: 105px;
}
.g_video{
  top: -1856px;
  width: 665px;
  height: 554px;
  left: 50%;
  margin-left: -332.5px;
}
.g_video img{
  width: 665px;
  height: 781px;
}
.g_video .video_img{
  top: 0;
}
#my-video{
  width: 602px;
  height: 338px;
  margin-top: 142px;
  margin-left: 26px;
}
.video-js .vjs-big-play-button{
  width: 115px;
  height: 115px;
}
.download{
  top: -1807px;
  width: 433px;
  height: 90px;
  left: 50%;
  margin-left: -216.5px;
}
.download img{
  width: 433px;
  height: 90px;
}
</style>
