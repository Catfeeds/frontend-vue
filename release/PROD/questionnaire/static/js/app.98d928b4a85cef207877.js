webpackJsonp([1],{NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=t("7+uW"),i={name:"questionnaire",data:function(){return{userToken:"",data:[]}},methods:{fetchData:function(){var e=this;e.axios({method:"get",url:e.$yApi.getQuestionnaireData,headers:{Authorization:e.userToken}}).then(function(n){var t=n.data;1==t.resultCode?(e.data=t.data.pageData,t.data.pageData.forEach(function(e){e.checked=!1}),e.data=t.data.pageData):window.location.href="IMMOTOR://showPrompt?code=0&message="+t.resultMsg}).catch(function(e){window.location.href="IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置"})},checkQuest:function(e,n){e.checked=!e.checked;var a=e.checked?t("j7d7"):t("hVFS");n.target.src=a},submitQuestionnaire:function(){var e=[];this.data.forEach(function(n){n.checked&&e.push(n.id)}),0!==e.length?this.axios({method:"post",url:this.$yApi.recordQuestionnaire,data:{ids:e},headers:{"Content-Type":"application/json",Authorization:this.userToken}}).then(function(e){var n=e.data;1==n.resultCode?window.location.href="IMMOTOR://submitQuestionnaireSuccess":window.location.href="IMMOTOR://showPrompt?code=0&message="+n.resultMsg}).catch(function(e){window.location.href="IMMOTOR://showPrompt?code=0&message=网络连接似乎已断开，请检查您的网络设置"}):window.location.href="IMMOTOR://showPrompt?code=0&message=请选择押金退还原因"}},mounted:function(){var e=this,n=navigator.userAgent;n.indexOf("Android")>-1||n.indexOf("Adr")>-1?e.$bridge.callAndriodHandler("getEhdUserInfo","",function(n){var t=JSON.parse(n);t&&t.token&&(e.userToken="bearer "+t.token,e.fetchData())}):!!n.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&e.$bridge.callhandler("getEhdUserInfo","",function(n){e.userToken="bearer "+n.token,e.fetchData()})}},o={render:function(){var e=this,n=e.$createElement,a=e._self._c||n;return a("div",[e._l(e.data,function(n){return a("div",[a("div",{staticClass:"rowDiv"},[a("span",{staticClass:"rowTitle"},[e._v(e._s(n.cause))]),e._v(" "),a("img",{staticClass:"rowImg",attrs:{src:t("hVFS")},on:{click:function(t){return e.checkQuest(n,t)}}})]),e._v(" "),a("div",{staticClass:"lineClass"})])}),e._v(" "),a("div",{staticClass:"submitButton",on:{click:function(n){return e.submitQuestionnaire()}}},[e._v("提交")])],2)},staticRenderFns:[]};var r={name:"App",components:{questionnaire:t("VU/8")(i,o,!1,function(e){t("kavM")},"data-v-1db84961",null).exports}},c={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("questionnaire")],1)},staticRenderFns:[]};var s=t("VU/8")(r,c,!1,function(e){t("VZ8Y")},null,null).exports,d={};function u(e){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var n=document.createElement("iframe");n.style.display="none",n.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(n),setTimeout(function(){document.documentElement.removeChild(n)},0)}}function l(e){var n=navigator.userAgent;(n.indexOf("Android")>-1||n.indexOf("Adr")>-1)&&(window.WebViewJavascriptBridge?e(WebViewJavascriptBridge):document.addEventListener("WebViewJavascriptBridgeReady",function(){e(WebViewJavascriptBridge)},!1))}u(function(e){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){var n=new Array("getEhdUserInfo");for(var t in n){var a=n[t];d[a]=function(n){return function(t,a){"function"==typeof t?e.callHandler(n,null,t):null==a?e.callHandler(n,t):e.callHandler(n,t,a)}}(a)}}}),l(function(e){var n=navigator.userAgent;(n.indexOf("Android")>-1||n.indexOf("Adr")>-1)&&(e.init(function(e,n){n&&n(e)}),e.registerHandler("getEhdUserInfo",function(e,n){n&&n(responseData)}))});var A={callhandler:function(e,n,t){u(function(a){a.callHandler(e,n,t)})},registerhandler:function(e,n){u(function(t){t.registerHandler(e,function(e,t){n(e,t)})})},callAndriodHandler:function(e,n,t){l(function(a){a.callHandler(e,n,t)})}},f=(t("j1ja"),t("hKoQ")),p=t.n(f),h=t("mtWM"),m=t.n(h),v=t("Rf8U"),g=t.n(v),k={getQuestionnaireData:"https://promotion.ehuandian.net/deposit/refund/findAll",recordQuestionnaire:"https://promotion.ehuandian.net/deposit/refund/record"};t("hKoQ").polyfill(),p.a.polyfill(),a.a.config.productionTip=!1,a.a.prototype.$bridge=A,a.a.prototype.$yApi=k,a.a.use(g.a,m.a),new a.a({el:"#app",components:{App:s},template:"<App/>"})},VZ8Y:function(e,n){},hVFS:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAYFBMVEUAAADMzMzMzMzNzc3R0dHb29vNzc3Nzc3Ozs7Ozs7Nzc3Q0NDR0dHNzc3Nzc3MzMzNzc3Nzc3Nzc3Ozs7Ozs7MzMzNzc3Nzc3Nzc3Nzc3Ozs7Ozs7R0dHQ0NDX19fMzMxdw0zmAAAAH3RSTlMA0PbvGAfBoG1KLyAO4d/JvpmCcVKvrqmQYF0+JyYTdrkv+gAAAiVJREFUWMOs1tuyqjAMBuC/0HJoARFRl8e8/1tukukMa9wLsZLvwgsdoSR/WrAq1Id9b7o8y/LO9PtDHbCNvZYt/actrxZfai49LeovDdLdy4zeyso70vjz/OdiqqMPT+eewU/1LeabnX1KKUuKdsPN4YW7DTuKSosPVTmJbnhgwWPoSOQVPhHiMsyIt0YTHyZg1ZgTMzVW1YZYPmLFT3yopEL94B13JHay+JA9ETs6LGoKyVCFBJUkrGgWryk1aj2S+FZ6sHBVV8ivFomskbU6/OX4/jnWqnZc6rvcL50rFjIwxsokm7sx4kXIuUcWX7Itp/t1tnacJY+v+Ywn9iVtNKmQZO0KNuc5wiYnLoDFrIxfbCELK38VZF761gLMbTlzmrAZ5+qM6E6TGpvVNLn/qqiBAjNXtclkGhSMHPYG7MJnHFTwaXgB4/eQASoGfneRfNHkARUPmnDerzK0OmQLucbeD1AyxP7zpnWDkhtvoEDgGDgocRzPIGNQQE0hw3mYPvdQsyeiQ/zUEtfYy3rV1BJ/I5ugGi+bUyftUhNkI+FD4Ak1Tz6YwMFyUOM49v+aswMTAGAYBIL7b50VgnDoAoXSNOpLDiXXJw9FRooMP/mmZKGQ1UeWtJATInxEoomZELaHGDRiJYXpJfZcBAkSeUQ4IzFSBF4RzQlEELhDgBmBkAjsElhOAESBOgGUFfhYgG6A5EV5AGqOfiHzqY52Sq68jjspa3ERk5TtawAAAABJRU5ErkJggg=="},j7d7:function(e,n){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFQAAABUCAMAAAArteDzAAAAbFBMVEUAAAD8klP9klP9kVP9klT9klP8klX/lVb/m1v/qlX9klT9kVT9klP9klP8klT8klP9kVP9kVP9kVX9klX/klT/klX/klf/llX/k1j/m1n/n2D8kVP////8nmf+8en92ML8p3X++vj+59n9zbHN4hY0AAAAG3RSTlMAv/Dgpp9eIA4D0fn17MmvmZBybFJLLycaFwi204L4AAAB9UlEQVRYw83Zi3KCMBAF0A0RQkEUURS98YX//4+d2mFaeZiEZKe9H3CGEDTZXTJG1VUpMlnkeSEzUVa1Ir80SSwxiIyTZq6YJgKTEUk6gzzES7zNMj44kvsFLLLYO5DHjjSzR0vyYxvBOtH2w8ZUKzhlpczmLoJjop1p6RvMyObtKzitMSvr05vPXWBmRDppZpidbEI9CXhEnEb3aA2vrMd2awPPbIbmDt4ZfK8q8kcj1XuhKwTI6vW1bhEk25f/uigMGh1/oQsEyuLH3CNY9oYH9XvUAwKmOw3jkGj8babLkOgyfaIJgiZ5osJDuN3Qj/gyGw/zqvUD/TSG1ZtNfR9df+xl6nZ0/6WXeTmjH0mkQpuAojq4iZqq4CYqKoObKEkENyEoC24iIxnchKTC8Lt2N1FQjok8tL7OMpFPo3fdqY4m8unlt7pTHU0U0xt1vnSqowlJGQyqs4mMBEyqqwlBJYyqo4mSKphVNxMV1bBQnUzUpGCjuphQRNJKdTBld/AZVUuzO/gSGFWTOTyiG5hVFxON3bXnfNf6bmsK2wvarW1vsEzCcpXkuPSyXM85CgmWkoejOGMpIzkKXpbSnKOJwNHu4GjMsLSQOJpdHG05jgYiR6uToynL0D7maHRztOQZhgcMY46/H8jYjI7+z5Br/jjuE60nRyHHsEy1AAAAAElFTkSuQmCC"},kavM:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.98d928b4a85cef207877.js.map