webpackJsonp([1],{"6U7Q":function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=i("7+uW"),a={name:"policyholder",data:function(){return{headerImgHeight:110*screen.width/375+"px",inputWidth:screen.width-130+"px",policy_holderData:null,userToken:""}},methods:{fetchPolicyHolderData:function(){var t=this;t.axios({method:"get",url:t.$yApi.getInsurancePolicyInfo,headers:{Authorization:t.userToken}}).then(function(e){var i=e.data;if(600==i.code)t.policy_holderData=i.result;else{var s=i.msg;window.location.href="IMMOTOR://showPrompt?code=0&message="+s}}).catch(function(t){window.location.href="IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置"})}},mounted:function(){var t=this,e=navigator.userAgent;e.indexOf("Android")>-1||e.indexOf("Adr")>-1?t.$bridge.callAndriodHandler("getEhdUserInfo","",function(e){var i=JSON.parse(e);i&&i.token&&(t.userToken="bearer "+i.token,t.fetchPolicyHolderData())}):!!e.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&t.$bridge.callhandler("getEhdUserInfo","",function(e){t.userToken="bearer "+e.token,t.fetchPolicyHolderData()})}},l={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return t.policy_holderData?i("div",{directives:[{name:"loading",rawName:"v-loading",value:!t.policy_holderData,expression:"!policy_holderData"}],staticClass:"mainBK"},[i("div",{staticClass:"policy-holderDiv"},[i("ul",{staticClass:"holderUL"},[i("li",[i("div",{staticClass:"holderULlidiv"},[i("em",{staticClass:"inputTitleClass textFontClass"},[t._v("姓名")]),t._v(" "),i("em",{staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text"}},[t._v(t._s(t.policy_holderData.name))]),t._v(" "),i("div",{staticClass:"holderLineClass"})])]),t._v(" "),i("li",[i("div",{staticClass:"holderULlidiv"},[i("em",{staticClass:"inputTitleClass textFontClass"},[t._v("身份证号码")]),t._v(" "),i("em",{staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text"}},[t._v(t._s(t.policy_holderData.idcard))]),t._v(" "),i("div",{staticClass:"holderLineClass"})])]),t._v(" "),i("li",[i("div",{staticClass:"holderULlidiv"},[i("em",{staticClass:"inputTitleClass textFontClass"},[t._v("手机号码")]),t._v(" "),i("em",{staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text"}},[t._v(t._s(t.policy_holderData.phone))]),t._v(" "),i("div",{staticClass:"holderLineClass"})])]),t._v(" "),i("li",[i("div",{staticClass:"holderULlidiv"},[i("em",{staticClass:"inputTitleClass textFontClass"},[t._v("车辆SN码")]),t._v(" "),i("em",{staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text"}},[t._v(t._s(t.policy_holderData.prechar2))]),t._v(" "),i("div",{staticClass:"holderLineClass"})])]),t._v(" "),i("li",[i("div",{staticClass:"holderULlidiv"},[i("em",{staticClass:"inputTitleClass textFontClass"},[t._v("电机号")]),t._v(" "),i("em",{staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text"}},[t._v(t._s(t.policy_holderData.makeFactory))]),t._v(" "),i("div",{staticClass:"holderLineClass"})])]),t._v(" "),i("li",[i("div",{staticClass:"holderULlidiv"},[i("em",{staticClass:"inputTitleClass textFontClass"},[t._v("车架号")]),t._v(" "),i("em",{staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text"}},[t._v(t._s(t.policy_holderData.fuelName))]),t._v(" "),i("div",{staticClass:"holderLineClass"})])]),t._v(" "),i("li",[i("div",{staticClass:"holderULlidiv"},[i("em",{staticClass:"inputTitleClass textFontClass"},[t._v("地址")]),t._v(" "),i("em",{staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text"}},[t._v(t._s(t.policy_holderData.address))]),t._v(" "),i("div",{staticClass:"holderLineClass"})])]),t._v(" "),i("li",[i("div",{staticClass:"holderULlidiv"},[i("em",{staticClass:"inputTitleClass textFontClass"},[t._v("邮箱")]),t._v(" "),i("em",{staticClass:"inputTextClass textFontClass",style:{width:t.inputWidth},attrs:{type:"text"}},[t._v(t._s(t.policy_holderData.email))]),t._v(" "),i("div",{staticClass:"holderLineClass"})])])])])]):t._e()},staticRenderFns:[]};var n={name:"App",components:{policyholder:i("VU/8")(a,l,!1,function(t){i("g+OD")},null,null).exports}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("policyholder")],1)},staticRenderFns:[]};var r=i("VU/8")(n,o,!1,function(t){i("6U7Q")},null,null).exports,d={};function c(t){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){if(window.WebViewJavascriptBridge)return t(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(t);window.WVJBCallbacks=[t];var e=document.createElement("iframe");e.style.display="none",e.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(e),setTimeout(function(){document.documentElement.removeChild(e)},0)}}function u(t){var e=navigator.userAgent;(e.indexOf("Android")>-1||e.indexOf("Adr")>-1)&&(window.WebViewJavascriptBridge?t(WebViewJavascriptBridge):document.addEventListener("WebViewJavascriptBridgeReady",function(){t(WebViewJavascriptBridge)},!1))}c(function(t){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){var e=new Array("getEhdUserInfo");for(var i in e){var s=e[i];d[s]=function(e){return function(i,s){"function"==typeof i?t.callHandler(e,null,i):null==s?t.callHandler(e,i):t.callHandler(e,i,s)}}(s)}}}),u(function(t){var e=navigator.userAgent;(e.indexOf("Android")>-1||e.indexOf("Adr")>-1)&&(t.init(function(t,e){e&&e(t)}),t.registerHandler("getEhdUserInfo",function(t,e){e&&e(responseData)}))});var v={callhandler:function(t,e,i){c(function(s){s.callHandler(t,e,i)})},registerhandler:function(t,e){c(function(i){i.registerHandler(t,function(t,i){e(t,i)})})},callAndriodHandler:function(t,e,i){u(function(s){s.callHandler(t,e,i)})}},p=(i("j1ja"),i("hKoQ")),h=i.n(p),C=i("mtWM"),_=i.n(C),f=i("Rf8U"),m=i.n(f),y={getInsurancePolicyInfo:"http://test.ehuandian.net//insurance/user/details/get"};i("hKoQ").polyfill(),h.a.polyfill(),s.a.config.productionTip=!1,s.a.prototype.$bridge=v,s.a.prototype.$yApi=y,s.a.use(m.a,_.a),new s.a({el:"#app",components:{App:r},template:"<App/>"})},"g+OD":function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.5179c0e8fc468c4d3dcc.js.map