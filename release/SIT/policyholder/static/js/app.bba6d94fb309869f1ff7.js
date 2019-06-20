webpackJsonp([1],{"6U7Q":function(t,e){},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("7+uW"),o={name:"policyholder",data:function(){return{headerImgHeight:110*screen.width/375+"px",inputWidth:screen.width-130+"px",policy_holderData:null,contentChanged:!1,btnClass:"submitButton disableColor",userToken:""}},methods:{isPhoneNumber:function(t){return/^1[0-9]{10}$/.test(t)},isIDCardNumber:function(t){return/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(t)},isEmail:function(t){return/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(t)},isEmptyStr:function(t){return!(t&&t.length>0)},inputTextChanged:function(){this.contentChanged||(this.contentChanged=!0,this.btnClass="submitButton normalColor")},fetchPolicyHolderData:function(){var t=this;t.axios({method:"get",url:t.$yApi.getInsurancePolicyInfo,headers:{Authorization:t.userToken}}).then(function(e){var a=e.data;if(600===a.code)t.policy_holderData=a.result;else{var i=a.msg;window.location.href="IMMOTOR://showPrompt?code=0&message="+i}}).catch(function(t){window.location.href="IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置"})},savePolicyHolderData:function(){this.contentChanged&&(this.isEmptyStr(this.policy_holderData.name)?window.location.href="IMMOTOR://showPrompt?code=0&message=请输入姓名":this.isIDCardNumber(this.policy_holderData.idcard)?this.isPhoneNumber(this.policy_holderData.phone)?this.isEmptyStr(this.policy_holderData.prechar2)?window.location.href="IMMOTOR://showPrompt?code=0&message=请输入你绑定的车辆SN码":this.isEmptyStr(this.policy_holderData.makeFactory)?window.location.href="IMMOTOR://showPrompt?code=0&message=请输入电机号":this.isEmptyStr(this.policy_holderData.fuelName)||this.policy_holderData.fuelName.length>20?window.location.href="IMMOTOR://showPrompt?code=0&message=请输入正确的车架号":this.isEmptyStr(this.policy_holderData.address)?window.location.href="IMMOTOR://showPrompt?code=0&message=请输入地址":this.isEmail(this.policy_holderData.email)?this.axios({method:"post",url:this.$yApi.addInsurancePolicyInfo,data:{name:this.policy_holderData.name,idcard:this.policy_holderData.idcard,email:this.policy_holderData.email,address:this.policy_holderData.address,phone:this.policy_holderData.phone,prechar2:this.policy_holderData.prechar2,makeFactory:this.policy_holderData.makeFactory,fuelName:this.policy_holderData.fuelName},headers:{"Content-Type":"application/json",Authorization:this.userToken}}).then(function(t){var e=t.data;600===e.code?window.location.href="IMMOTOR://showPrompt?code=1&message=修改保单信息成功":window.location.href="IMMOTOR://showPrompt?code=0&message="+e.msg}).catch(function(t){console.log("请求失败："+t.status+","+t.statusText),window.location.href="IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置"}):window.location.href="IMMOTOR://showPrompt?code=0&message=请输入正确的邮箱":window.location.href="IMMOTOR://showPrompt?code=0&message=请输入正确的手机号":window.location.href="IMMOTOR://showPrompt?code=0&message=请输入正确的身份证号")}},mounted:function(){var t=this,e=navigator.userAgent;e.indexOf("Android")>-1||e.indexOf("Adr")>-1?t.$bridge.callAndriodHandler("getEhdUserInfo","",function(e){var a=JSON.parse(e);a&&a.token&&(t.userToken="bearer "+a.token,t.fetchPolicyHolderData())}):!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&t.$bridge.callhandler("getEhdUserInfo","",function(e){t.userToken="bearer "+e.token,t.fetchPolicyHolderData()})}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mainBK"},[t.policy_holderData?a("div",{staticClass:"policy-holderDiv"},[a("ul",{staticClass:"holderUL"},[a("li",[a("div",{staticClass:"holderULlidiv"},[a("em",{staticClass:"inputTitleClass textFontClass"},[t._v("姓名")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policy_holderData.name,expression:"policy_holderData.name"}],staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text",maxlength:"20",autocomplete:"off"},domProps:{value:t.policy_holderData.name},on:{keyup:function(e){return t.inputTextChanged()},input:function(e){e.target.composing||t.$set(t.policy_holderData,"name",e.target.value)}}}),t._v(" "),a("div",{staticClass:"holderLineClass"})])]),t._v(" "),a("li",[a("div",{staticClass:"holderULlidiv"},[a("em",{staticClass:"inputTitleClass textFontClass"},[t._v("身份证号码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policy_holderData.idcard,expression:"policy_holderData.idcard"}],staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text",maxlength:"18",autocomplete:"off"},domProps:{value:t.policy_holderData.idcard},on:{keyup:function(e){return t.inputTextChanged()},input:function(e){e.target.composing||t.$set(t.policy_holderData,"idcard",e.target.value)}}}),t._v(" "),a("div",{staticClass:"holderLineClass"})])]),t._v(" "),a("li",[a("div",{staticClass:"holderULlidiv"},[a("em",{staticClass:"inputTitleClass textFontClass"},[t._v("手机号码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policy_holderData.phone,expression:"policy_holderData.phone"}],staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"tel",maxlength:"11",autocomplete:"off"},domProps:{value:t.policy_holderData.phone},on:{keyup:function(e){return t.inputTextChanged()},input:function(e){e.target.composing||t.$set(t.policy_holderData,"phone",e.target.value)}}}),t._v(" "),a("div",{staticClass:"holderLineClass"})])]),t._v(" "),a("li",[a("div",{staticClass:"holderULlidiv"},[a("em",{staticClass:"inputTitleClass textFontClass"},[t._v("中控SN码")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policy_holderData.prechar2,expression:"policy_holderData.prechar2"}],staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text",maxlength:"40",autocomplete:"off"},domProps:{value:t.policy_holderData.prechar2},on:{keyup:function(e){return t.inputTextChanged()},input:function(e){e.target.composing||t.$set(t.policy_holderData,"prechar2",e.target.value)}}}),t._v(" "),a("div",{staticClass:"holderLineClass"})])]),t._v(" "),a("li",[a("div",{staticClass:"holderULlidiv"},[a("em",{staticClass:"inputTitleClass textFontClass"},[t._v("电机号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policy_holderData.makeFactory,expression:"policy_holderData.makeFactory"}],staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text",maxlength:"50",autocomplete:"off"},domProps:{value:t.policy_holderData.makeFactory},on:{keyup:function(e){return t.inputTextChanged()},input:function(e){e.target.composing||t.$set(t.policy_holderData,"makeFactory",e.target.value)}}}),t._v(" "),a("div",{staticClass:"holderLineClass"})])]),t._v(" "),a("li",[a("div",{staticClass:"holderULlidiv"},[a("em",{staticClass:"inputTitleClass textFontClass"},[t._v("车架号")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policy_holderData.fuelName,expression:"policy_holderData.fuelName"}],staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text",maxlength:"20",autocomplete:"off"},domProps:{value:t.policy_holderData.fuelName},on:{keyup:function(e){return t.inputTextChanged()},input:function(e){e.target.composing||t.$set(t.policy_holderData,"fuelName",e.target.value)}}}),t._v(" "),a("div",{staticClass:"holderLineClass"})])]),t._v(" "),a("li",[a("div",{staticClass:"holderULlidiv"},[a("em",{staticClass:"inputTitleClass textFontClass"},[t._v("地址")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policy_holderData.address,expression:"policy_holderData.address"}],staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text",maxlength:"50",autocomplete:"off"},domProps:{value:t.policy_holderData.address},on:{keyup:function(e){return t.inputTextChanged()},input:function(e){e.target.composing||t.$set(t.policy_holderData,"address",e.target.value)}}}),t._v(" "),a("div",{staticClass:"holderLineClass"})])]),t._v(" "),a("li",[a("div",{staticClass:"holderULlidiv"},[a("em",{staticClass:"inputTitleClass textFontClass"},[t._v("邮箱")]),t._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:t.policy_holderData.email,expression:"policy_holderData.email"}],staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"email",maxlength:"30",autocomplete:"off",placeholder:""},domProps:{value:t.policy_holderData.email},on:{keyup:function(e){return t.inputTextChanged()},input:function(e){e.target.composing||t.$set(t.policy_holderData,"email",e.target.value)}}}),t._v(" "),a("div",{staticClass:"holderLineClass"})])])])]):t._e(),t._v(" "),a("div",{class:[t.btnClass],on:{click:function(e){return t.savePolicyHolderData()}}},[t._v("保存")])])},staticRenderFns:[]};var s={name:"App",components:{policyholder:a("VU/8")(o,n,!1,function(t){a("NTOL")},null,null).exports}},l={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("policyholder")],1)},staticRenderFns:[]};var r=a("VU/8")(s,l,!1,function(t){a("6U7Q")},null,null).exports,d={};function c(t){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){if(window.WebViewJavascriptBridge)return t(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(t);window.WVJBCallbacks=[t];var e=document.createElement("iframe");e.style.display="none",e.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(e),setTimeout(function(){document.documentElement.removeChild(e)},0)}}function p(t){var e=navigator.userAgent;(e.indexOf("Android")>-1||e.indexOf("Adr")>-1)&&(window.WebViewJavascriptBridge?t(WebViewJavascriptBridge):document.addEventListener("WebViewJavascriptBridgeReady",function(){t(WebViewJavascriptBridge)},!1))}c(function(t){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){var e=new Array("getEhdUserInfo");for(var a in e){var i=e[a];d[i]=function(e){return function(a,i){"function"==typeof a?t.callHandler(e,null,a):null==i?t.callHandler(e,a):t.callHandler(e,a,i)}}(i)}}}),p(function(t){var e=navigator.userAgent;(e.indexOf("Android")>-1||e.indexOf("Adr")>-1)&&(t.init(function(t,e){e&&e(t)}),t.registerHandler("getEhdUserInfo",function(t,e){e&&e(responseData)}))});var u={callhandler:function(t,e,a){c(function(i){i.callHandler(t,e,a)})},registerhandler:function(t,e){c(function(a){a.registerHandler(t,function(t,a){e(t,a)})})},callAndriodHandler:function(t,e,a){p(function(i){i.callHandler(t,e,a)})}},h=(a("j1ja"),a("hKoQ")),m=a.n(h),v=a("mtWM"),f=a.n(v),y=a("Rf8U"),C=a.n(y),_={getInsurancePolicyInfo:"https://test.ehuandian.net/insurance/user/details/get",addInsurancePolicyInfo:"https://test.ehuandian.net/insurance/user/details/add"};a("hKoQ").polyfill(),m.a.polyfill(),i.a.config.productionTip=!1,i.a.prototype.$bridge=u,i.a.prototype.$yApi=_,i.a.use(C.a,f.a),new i.a({el:"#app",components:{App:r},template:"<App/>"})},NTOL:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.bba6d94fb309869f1ff7.js.map