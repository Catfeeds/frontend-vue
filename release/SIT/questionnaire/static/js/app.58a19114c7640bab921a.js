webpackJsonp([1],{Cd58:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("7+uW"),i={name:"questionnaire",data:function(){return{userToken:"",submitState:!1,data:[]}},methods:{fetchData:function(){var e=this;e.axios({method:"get",url:e.$yApi.getQuestionnaireData,headers:{Authorization:e.userToken}}).then(function(t){var n=t.data;1==n.resultCode?(e.data=n.data.pageData,n.data.pageData.forEach(function(e){e.checked=!1,e.textId="text"+e.id,e.warningId="warning"+e.id,e.levelCause&&e.levelCause.length>0&&(e.extension=""),e.placeholder="请输入内容","其他"==e.desc?e.placeholder="请输入原因和建议，我们将为您不断改进！":"改换其他公司产品"==e.desc&&(e.placeholder="请填写产品名称")}),e.data=n.data.pageData):window.location.href="IMMOTOR://showPrompt?code=0&message="+n.resultMsg}).catch(function(e){window.location.href="IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置"})},checkQuest:function(e,t){e.checked=!e.checked,e.checked&&e.levelCause?document.getElementById(e.textId).style.display="":document.getElementById(e.textId).style.display="none";var a=e.checked?n("j7d7"):n("hVFS");t.target.src=a,e.checked||(document.getElementById(e.warningId).style.display="none")},descInput:function(e){if(e.extension.length>0){e.checked=!0;var t=n("j7d7");document.getElementById(e.id).src=t}},submitQuestionnaire:function(){var e=[],t=!1;this.data.forEach(function(n){if(n.checked){var a=n.id;n.levelCause&&(n.extension.length>0?(a+="&"+n.extension,document.getElementById(n.warningId).style.display="none"):(document.getElementById(n.warningId).style.display="flex",t=!0)),e.push(a)}}),0!==e.length?t||this.axios({method:"post",url:this.$yApi.recordQuestionnaire,data:{ids:e},headers:{"Content-Type":"application/json",Authorization:this.userToken}}).then(function(e){var t=e.data;1==t.resultCode?window.location.href="IMMOTOR://submitQuestionnaireSuccess":window.location.href="IMMOTOR://showPrompt?code=0&message="+t.resultMsg}).catch(function(e){window.location.href="IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置"}):window.location.href="IMMOTOR://showPrompt?code=0&message=请选择押金退还原因"},getEhdUserInfoFromBridge:function(){var e=this,t=navigator.userAgent;t.indexOf("Android")>-1||t.indexOf("Adr")>-1?e.$bridge.callAndriodHandler("getEhdUserInfo","",function(t){var n=JSON.parse(t);n&&n.token&&(e.userToken="bearer "+n.token,e.fetchData())}):!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&e.$bridge.callhandler("getEhdUserInfo","",function(t){e.userToken="bearer "+t.token,e.fetchData()})},getUrlParam:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(t);return null!=n?unescape(decodeURIComponent(n[2])):null}},mounted:function(){if(this.userToken=this.getUrlParam("token"),this.userToken&&this.userToken.length>0)this.userToken="bearer "+this.userToken,this.fetchData();else{var e=navigator.userAgent;if(-1==e.indexOf("token="))this.getEhdUserInfoFromBridge();else{var t=e.substr(e.indexOf("token=")+6,e.length);t=t.substr(0,t.indexOf("&")),this.userToken="bearer "+t,this.fetchData()}}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"pageTitle"},[e._v("押金退还原因（可多选）")]),e._v(" "),e._l(e.data,function(t){return a("div",[a("div",{staticClass:"rowDiv"},[a("span",{staticClass:"rowTitle"},[e._v(e._s(t.cause))]),e._v(" "),a("img",{staticClass:"rowImg",attrs:{id:t.id,src:n("hVFS")},on:{click:function(n){return e.checkQuest(t,n)}}})]),e._v(" "),a("textarea",{directives:[{name:"show",rawName:"v-show",value:t.checked,expression:"item.checked"},{name:"model",rawName:"v-model",value:t.extension,expression:"item.extension"}],staticClass:"textAreaClass textFontClass",attrs:{id:t.textId,type:"text",maxlength:"200",autocomplete:"off",placeholder:t.placeholder},domProps:{value:t.extension},on:{input:[function(n){n.target.composing||e.$set(t,"extension",n.target.value)},function(n){return e.descInput(t)}]}}),e._v(" "),a("div",{staticClass:"waringDiv",attrs:{id:t.warningId}},[e._m(0,!0),e._v(" "),a("p",{staticClass:"waringText"},[e._v("请填写文本框内容！")])]),e._v(" "),a("div",{staticClass:"lineClass"})])}),e._v(" "),a("div",{staticClass:"submitButton",on:{click:function(t){return e.submitQuestionnaire()}}},[e._v("提交")])],2)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"waringIcon"},[t("img",{attrs:{src:n("QcOD")}})])}]};var r={name:"App",components:{questionnaire:n("VU/8")(i,o,!1,function(e){n("Cd58")},"data-v-eab7f104",null).exports}},s={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("questionnaire")],1)},staticRenderFns:[]};var c=n("VU/8")(r,s,!1,function(e){n("gDxs")},null,null).exports,d={};function l(e){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)}}function u(e){var t=navigator.userAgent;(t.indexOf("Android")>-1||t.indexOf("Adr")>-1)&&(window.WebViewJavascriptBridge?e(WebViewJavascriptBridge):document.addEventListener("WebViewJavascriptBridgeReady",function(){e(WebViewJavascriptBridge)},!1))}l(function(e){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){var t=new Array("getEhdUserInfo");for(var n in t){var a=t[n];d[a]=function(t){return function(n,a){"function"==typeof n?e.callHandler(t,null,n):null==a?e.callHandler(t,n):e.callHandler(t,n,a)}}(a)}}}),u(function(e){var t=navigator.userAgent;(t.indexOf("Android")>-1||t.indexOf("Adr")>-1)&&(e.init(function(e,t){t&&t(e)}),e.registerHandler("getEhdUserInfo",function(e,t){t&&t(responseData)}))});var A={callhandler:function(e,t,n){l(function(a){a.callHandler(e,t,n)})},registerhandler:function(e,t){l(function(n){n.registerHandler(e,function(e,n){t(e,n)})})},callAndriodHandler:function(e,t,n){u(function(a){a.callHandler(e,t,n)})}},h=(n("j1ja"),n("hKoQ")),f=n.n(h),g=n("mtWM"),m=n.n(g),p=n("Rf8U"),v=n.n(p),k={getQuestionnaireData:"https://test.ehuandian.net/server/promotion/app/deposit/refund/findAll",recordQuestionnaire:"https://test.ehuandian.net/server/promotion/app/deposit/refund/record"};n("hKoQ").polyfill(),f.a.polyfill(),a.a.config.productionTip=!1,a.a.prototype.$bridge=A,a.a.prototype.$yApi=k,a.a.use(v.a,m.a),new a.a({el:"#app",components:{App:c},template:"<App/>"})},QcOD:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAAAXNSR0IArs4c6QAAAsNJREFUWAnNmT1v2zAQhnlEgKSA5xbQmqBTtvyQJEUdTUH3oJ3auUEy11vRvcgkuEiQH+KtY7qmSGcDjZew70uJqi1bpVSZFgnI+iB59/BOInlnUf9ZTJruqqenQ3Q/wJEokUQZk1hxIve4vsc1j4nS+lay7Ieta/kjbdqb09PnajZ7iz7HANhv0xcD+I72N2p7+7NcXf1q2rcRoBkOB1DwHlAfIHjQVHhNuylkfYKskYzH05o25WMvIFz5CsK+4HhR9lrHhcgDQM/g+ut/idN1lcYYMScn53jPvq0djko5YMimDuqq41hZAZc+w+i+QsiwruNan4uMoesNXP67KnfJgnY0m4QjEQ0BnassuQSo0vTjxiw3by5CUnelLLjYfhB855RaeF7pE/LWYM58Pf/hlCDFVHIH6633a207HH7dxuy5Keivi/N5rl84DoYGIktRrAXtCvH4yKWo6yTs5HY9T9XOzi5XnNyCs9m7iOA4uEGxpCrn4qOuQw7Q/5gypdiV3AVQ0F2k1nu62DJ1FxZCArZzdDH3c7GWAwLmm8w4EZMtzDncCXvxMHGWk7q3cYMGWBgaKJVEAy5eC4KNLvaPpIFFAjUxGi7+GUh4d7Fg24KLGXm99Elr9M74hLStBxtdTMBYiwWcxEoHrolmUB0tINi0jfjzoDouTjCRje8gy01+iurXMuWASEcAzRvlbxB/yhQJ9VlAmythOiKWAhaXv3EuZiwwwqT90DtjHjSNHEcJaKMo5EpQ0efSZ2CkMxfREbIE5I2NR0UueN1Lge75mJgMS1som35I0wwu30xexlmC+ZksS0VkwYMLFrTEbIBEDkw9dn2Dn13yqAJneeqUF5ZknuYcbZYsXdev5XO+cxew3GXVck6OV3HfCUwvIEdS5G3iTAE7U1vQPInOLMQRXL8/X+e9DplEX6W8CPiD/w3xBx69GbfC+goiAAAAAElFTkSuQmCC"},gDxs:function(e,t){},hVFS:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAYFBMVEUAAADMzMzMzMzNzc3R0dHb29vNzc3Nzc3Ozs7Ozs7Nzc3Q0NDR0dHNzc3Nzc3MzMzNzc3Nzc3Nzc3Ozs7Ozs7MzMzNzc3Nzc3Nzc3Nzc3Ozs7Ozs7R0dHQ0NDX19fMzMxdw0zmAAAAH3RSTlMA0PbvGAfBoG1KLyAO4d/JvpmCcVKvrqmQYF0+JyYTdrkv+gAAAiVJREFUWMOs1tuyqjAMBuC/0HJoARFRl8e8/1tukukMa9wLsZLvwgsdoSR/WrAq1Id9b7o8y/LO9PtDHbCNvZYt/actrxZfai49LeovDdLdy4zeyso70vjz/OdiqqMPT+eewU/1LeabnX1KKUuKdsPN4YW7DTuKSosPVTmJbnhgwWPoSOQVPhHiMsyIt0YTHyZg1ZgTMzVW1YZYPmLFT3yopEL94B13JHay+JA9ETs6LGoKyVCFBJUkrGgWryk1aj2S+FZ6sHBVV8ivFomskbU6/OX4/jnWqnZc6rvcL50rFjIwxsokm7sx4kXIuUcWX7Itp/t1tnacJY+v+Ywn9iVtNKmQZO0KNuc5wiYnLoDFrIxfbCELK38VZF761gLMbTlzmrAZ5+qM6E6TGpvVNLn/qqiBAjNXtclkGhSMHPYG7MJnHFTwaXgB4/eQASoGfneRfNHkARUPmnDerzK0OmQLucbeD1AyxP7zpnWDkhtvoEDgGDgocRzPIGNQQE0hw3mYPvdQsyeiQ/zUEtfYy3rV1BJ/I5ugGi+bUyftUhNkI+FD4Ak1Tz6YwMFyUOM49v+aswMTAGAYBIL7b50VgnDoAoXSNOpLDiXXJw9FRooMP/mmZKGQ1UeWtJATInxEoomZELaHGDRiJYXpJfZcBAkSeUQ4IzFSBF4RzQlEELhDgBmBkAjsElhOAESBOgGUFfhYgG6A5EV5AGqOfiHzqY52Sq68jjspa3ERk5TtawAAAABJRU5ErkJggg=="},j7d7:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAbFBMVEUAAAD8klP9klP9kVP9klT9klP8klX/lVb/m1v/qlX9klT9kVT9klP9klP8klT8klP9kVP9kVP9kVX9klX/klT/klX/klf/llX/k1j/m1n/n2D8kVP////8nmf+8en92ML8p3X++vj+59n9zbHN4hY0AAAAG3RSTlMAv/Dgpp9eIA4D0fn17MmvmZBybFJLLycaFwi204L4AAAB9UlEQVRYw83Zi3KCMBAF0A0RQkEUURS98YX//4+d2mFaeZiEZKe9H3CGEDTZXTJG1VUpMlnkeSEzUVa1Ir80SSwxiIyTZq6YJgKTEUk6gzzES7zNMj44kvsFLLLYO5DHjjSzR0vyYxvBOtH2w8ZUKzhlpczmLoJjop1p6RvMyObtKzitMSvr05vPXWBmRDppZpidbEI9CXhEnEb3aA2vrMd2awPPbIbmDt4ZfK8q8kcj1XuhKwTI6vW1bhEk25f/uigMGh1/oQsEyuLH3CNY9oYH9XvUAwKmOw3jkGj8babLkOgyfaIJgiZ5osJDuN3Qj/gyGw/zqvUD/TSG1ZtNfR9df+xl6nZ0/6WXeTmjH0mkQpuAojq4iZqq4CYqKoObKEkENyEoC24iIxnchKTC8Lt2N1FQjok8tL7OMpFPo3fdqY4m8unlt7pTHU0U0xt1vnSqowlJGQyqs4mMBEyqqwlBJYyqo4mSKphVNxMV1bBQnUzUpGCjuphQRNJKdTBld/AZVUuzO/gSGFWTOTyiG5hVFxON3bXnfNf6bmsK2wvarW1vsEzCcpXkuPSyXM85CgmWkoejOGMpIzkKXpbSnKOJwNHu4GjMsLSQOJpdHG05jgYiR6uToynL0D7maHRztOQZhgcMY46/H8jYjI7+z5Br/jjuE60nRyHHsEy1AAAAAElFTkSuQmCC"}},["NHnr"]);
//# sourceMappingURL=app.58a19114c7640bab921a.js.map