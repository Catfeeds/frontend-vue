webpackJsonp([1],{"/S6e":function(e,t,i){e.exports=i.p+"static/img/分组 5@2x.6565a14.png"},L7jw:function(e,t,i){e.exports=i.p+"static/img/分组 10@2x.ab59171.png"},NHnr:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("7+uW"),n={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("router-view")],1)},staticRenderFns:[]};var s=i("VU/8")({name:"App",components:{}},n,!1,function(e){i("ntV7")},null,null).exports,r=i("/ocq"),c={name:"answer",data:function(){return{id:"",userToken:"",skip:!1,checkedValue:"暂无",checkedValue_1:"暂无",checkedValue_2:"暂无",checkedValue_3:"暂无",checkedValue_4:"暂无",right_answers:!1,right_answers1:!1,right_answers2:!1,right_answers3:!1,right_answers4:!1,right_option1:!1,right_option2:!1,right_option3:!1,right_option4:!1,icon_radio:i("cQYr"),icon_radio_1:i("tiFo"),ditch:[{name:"A、朋友推荐"},{name:"B、招聘网站（如58同城）"},{name:"C、外卖站点推荐"},{name:"D、电动车车行推荐"}],electric:[{name:"A、离线换电"},{name:"B、预约换电"},{name:"C、直接扫码"}],course:[{name:"A、暴力、强行更换电池"},{name:"B、非法盗取电池"},{name:"C、打开e换电APP，联系客服"}],embezzle:[{name:"A、及时制止，并通知e换电工作人员"},{name:"B、事不关己、放任不管"}],striveFor:[{name:"A、私自改装，留作私用"},{name:"B、随意丢弃、变卖电池，不再使用"},{name:"C、到达指定服务网点归还电池，申请退押"}]}},mounted:function(){var e=this.getUrlParam("token");if(e&&e.length>0)this.userToken="bearer "+e;else{var t=navigator.userAgent;-1!=t.indexOf("token=")&&(e=(e=t.substr(t.indexOf("token=")+6,t.length)).substr(0,e.indexOf("&")),this.userToken="bearer "+e)}this.userToken.length,this.getEhdUserInfoFromBridge(),this.getUrlParam("lotteryID")&&(this.skip=!1)},methods:{btnAnswer:function(){var e=this;if("暂无"==this.checkedValue?this.right_answers=!0:this.right_answers=!1,"暂无"==this.checkedValue_1?this.right_option1=!0:"0"!=this.checkedValue_1?(this.right_answers1=!0,this.right_option1=!1):(this.right_answers1=!1,this.right_option1=!1),"暂无"==this.checkedValue_2?this.right_option2=!0:"2"!=this.checkedValue_2?(this.right_answers2=!0,this.right_option2=!1):(this.right_answers2=!1,this.right_option2=!1),"暂无"==this.checkedValue_3?this.right_option3=!0:"0"!=this.checkedValue_3?(this.right_answers3=!0,this.right_option3=!1):(this.right_answers3=!1,this.right_option3=!1),"暂无"==this.checkedValue_4?this.right_option4=!0:"2"!=this.checkedValue_4?(this.right_answers4=!0,this.right_option4=!1):(this.right_answers4=!1,this.right_option4=!1),0==this.right_answers&&"0"==this.checkedValue_1&&"2"==this.checkedValue_2&&"0"==this.checkedValue_3&&"2"==this.checkedValue_4){this.axios({method:"get",url:this.$yApi.gainMyReward+"5d9c5c0fae2d47000117f004",headers:{Authorization:this.userToken}}).then(function(t){e.skip=!0}).catch(function(e){console.log("Error",error.messgae)})}},rule:function(){window.location.href="./static/activityRules.html"},returnList:function(){window.location.href="immotor://backAction"},getEhdUserInfoFromBridge:function(){var e=this,t=navigator.userAgent;t.indexOf("Android")>-1||t.indexOf("Adr")>-1?e.$bridge.callAndriodHandler("getEhdUserInfo","",function(t){var i=JSON.parse(t);i&&i.token&&(e.userToken="bearer "+i.token,e.btnAnswer())}):!!t.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)&&e.$bridge.callhandler("getEhdUserInfo","",function(t){e.userToken="bearer "+t.token,e.btnAnswer()})},getUrlParam:function(e){var t=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),i=window.location.search.substr(1).match(t);return null!=i?unescape(decodeURIComponent(i[2])):null}}},o={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"answer"},[e.skip?a("div",[a("div",{staticClass:"response relative"},[a("img",{staticClass:"absolute",attrs:{src:i("/S6e"),alt:""}}),e._v(" "),a("div",{staticClass:"backtrack absolute",on:{click:function(t){return e.returnList()}}},[e._v("返回")])])]):a("div",[a("div",{staticClass:"header relative"},[a("img",{attrs:{src:i("L7jw"),alt:""}}),e._v(" "),a("div",{staticClass:"rule absolute",on:{click:function(t){return e.rule()}}},[a("span",[e._v("活动规则")])])]),e._v(" "),a("div",{staticClass:"answer_common absolute"},[a("div",{staticClass:"answer_doubt"},[a("div",{staticClass:"title"},[e._v("1、您是通过哪些渠道加入e换电的")]),e._v(" "),a("ul",e._l(e.ditch,function(t,i){return a("li",{key:i,staticClass:"relative"},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkedValue,expression:"checkedValue"}],staticClass:"relative",attrs:{type:"radio",name:"ditch",id:"ditch"+i},domProps:{value:i,checked:e._q(e.checkedValue,i)},on:{change:function(t){e.checkedValue=i}}}),e._v(" "),a("label",{attrs:{for:"ditch"+i}},[e._v(e._s(t.name))]),e._v(" "),a("div",{staticClass:"icon_radio relative"},[a("img",{staticClass:"absolute",attrs:{src:e.checkedValue==i?e.icon_radio:e.icon_radio_1,alt:""}})])])}),0)]),e._v(" "),e.right_answers?a("div",{staticClass:"right_answers"},[e._v("请选择选项")]):e._e(),e._v(" "),a("div",{staticClass:"answer_doubt"},[a("div",{staticClass:"title"},[e._v("2、如换电柜没有网络，无法换电，应该采取以下什么动作，方可正常换电？")]),e._v(" "),a("ul",e._l(e.electric,function(t,i){return a("li",{key:i},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkedValue_1,expression:"checkedValue_1"}],staticClass:"relative",attrs:{type:"radio",name:"electric",id:"electric"+i},domProps:{value:i,checked:e._q(e.checkedValue_1,i)},on:{change:function(t){e.checkedValue_1=i}}}),e._v(" "),a("label",{attrs:{for:"electric"+i}},[e._v(e._s(t.name))]),e._v(" "),a("div",{staticClass:"icon_radio relative"},[a("img",{staticClass:"absolute",attrs:{src:e.checkedValue_1==i?e.icon_radio:e.icon_radio_1,alt:""}})])])}),0)]),e._v(" "),e.right_option1?a("div",{staticClass:"right_answers"},[e._v("请选择选项")]):e._e(),e._v(" "),e.right_answers1?a("div",{staticClass:"right_answers"},[e._v("正确答案：A")]):e._e(),e._v(" "),a("div",{staticClass:"answer_doubt"},[a("div",{staticClass:"title"},[e._v("3、如换电过程中，遇到问题，下列做法正确的是？")]),e._v(" "),a("ul",e._l(e.course,function(t,i){return a("li",{key:i},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkedValue_2,expression:"checkedValue_2"}],staticClass:"relative",attrs:{type:"radio",name:"course",id:"course"+i},domProps:{value:i,checked:e._q(e.checkedValue_2,i)},on:{change:function(t){e.checkedValue_2=i}}}),e._v(" "),a("label",{attrs:{for:"course"+i}},[e._v(e._s(t.name))]),e._v(" "),a("div",{staticClass:"icon_radio relative"},[a("img",{staticClass:"absolute",attrs:{src:e.checkedValue_2==i?e.icon_radio:e.icon_radio_1,alt:""}})])])}),0)]),e._v(" "),e.right_option2?a("div",{staticClass:"right_answers"},[e._v("请选择选项")]):e._e(),e._v(" "),e.right_answers2?a("div",{staticClass:"right_answers"},[e._v("正确答案：C")]):e._e(),e._v(" "),a("div",{staticClass:"answer_doubt"},[a("div",{staticClass:"title"},[e._v("4、如发现有人非法盗用、变卖电池、下列做法正确的是？")]),e._v(" "),a("ul",e._l(e.embezzle,function(t,i){return a("li",{key:i},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkedValue_3,expression:"checkedValue_3"}],staticClass:"relative",attrs:{type:"radio",name:"embezzle",id:"embezzle"+i},domProps:{value:i,checked:e._q(e.checkedValue_3,i)},on:{change:function(t){e.checkedValue_3=i}}}),e._v(" "),a("label",{attrs:{for:"embezzle"+i}},[e._v(e._s(t.name))]),e._v(" "),a("div",{staticClass:"icon_radio relative"},[a("img",{staticClass:"absolute",attrs:{src:e.checkedValue_3==i?e.icon_radio:e.icon_radio_1,alt:""}})])])}),0)]),e._v(" "),e.right_option3?a("div",{staticClass:"right_answers"},[e._v("请选择选项")]):e._e(),e._v(" "),e.right_answers3?a("div",{staticClass:"right_answers"},[e._v("正确答案：A")]):e._e(),e._v(" "),a("div",{staticClass:"answer_doubt"},[a("div",{staticClass:"title"},[e._v("5、当不在使用e换电了，下列争取做法是？")]),e._v(" "),a("ul",e._l(e.striveFor,function(t,i){return a("li",{key:i},[a("input",{directives:[{name:"model",rawName:"v-model",value:e.checkedValue_4,expression:"checkedValue_4"}],staticClass:"relative",attrs:{type:"radio",name:"striveFor",id:"striveFor"+i},domProps:{value:i,checked:e._q(e.checkedValue_4,i)},on:{change:function(t){e.checkedValue_4=i}}}),e._v(" "),a("label",{attrs:{for:"striveFor"+i}},[e._v(e._s(t.name))]),e._v(" "),a("div",{staticClass:"icon_radio relative"},[a("img",{staticClass:"absolute",attrs:{src:e.checkedValue_4==i?e.icon_radio:e.icon_radio_1,alt:""}})])])}),0)]),e._v(" "),e.right_option4?a("div",{staticClass:"right_answers"},[e._v("请选择选项")]):e._e(),e._v(" "),e.right_answers4?a("div",{staticClass:"right_answers"},[e._v("正确答案：C")]):e._e(),e._v(" "),a("div",{staticClass:"btn relative",on:{click:function(t){return e.btnAnswer()}}},[e._v("确认提交")])])])])},staticRenderFns:[]};var l=i("VU/8")(c,o,!1,function(e){i("rJLo")},"data-v-11aad31e",null).exports;a.a.use(r.a);var d=new r.a({routes:[{path:"/",name:"answer",component:l}]}),u={};function h(e){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){if(window.WebViewJavascriptBridge)return e(WebViewJavascriptBridge);if(window.WVJBCallbacks)return window.WVJBCallbacks.push(e);window.WVJBCallbacks=[e];var t=document.createElement("iframe");t.style.display="none",t.src="wvjbscheme://__BRIDGE_LOADED__",document.documentElement.appendChild(t),setTimeout(function(){document.documentElement.removeChild(t)},0)}}function _(e){var t=navigator.userAgent;(t.indexOf("Android")>-1||t.indexOf("Adr")>-1)&&(window.WebViewJavascriptBridge?e(WebViewJavascriptBridge):document.addEventListener("WebViewJavascriptBridgeReady",function(){e(WebViewJavascriptBridge)},!1))}h(function(e){if(!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)){var t=new Array("getEhdUserInfo");for(var i in t){var a=t[i];u[a]=function(t){return function(i,a){"function"==typeof i?e.callHandler(t,null,i):null==a?e.callHandler(t,i):e.callHandler(t,i,a)}}(a)}}}),_(function(e){var t=navigator.userAgent;(t.indexOf("Android")>-1||t.indexOf("Adr")>-1)&&(e.init(function(e,t){t&&t(e)}),e.registerHandler("getEhdUserInfo",function(e,t){t&&t(responseData)}))});var v={callhandler:function(e,t,i){h(function(a){a.callHandler(e,t,i)})},registerhandler:function(e,t){h(function(i){i.registerHandler(e,function(e,i){t(e,i)})})},callAndriodHandler:function(e,t,i){_(function(a){a.callHandler(e,t,i)})}},g=(i("j1ja"),i("hKoQ")),A=i.n(g),m=i("mtWM"),p=i.n(m),f=i("Rf8U"),w=i.n(f),k={gainMyReward:"https://test.ehuandian.net/server/promotion/app//card/record/marsCard/"};i("sVYa");i("hKoQ").polyfill(),A.a.polyfill(),a.a.config.productionTip=!1,a.a.prototype.$bridge=v,a.a.prototype.$yApi=k,a.a.use(w.a,p.a),new a.a({el:"#app",router:d,components:{App:s},template:"<App/>"})},cQYr:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAMAAADW3miqAAAAOVBMVEUAAAD/jVn/jVn/jVn/jln/jVj/j1n/kFn/i13/i13/////jVn/9fH/0Lv/x67/sY7/pHr/k2L/5doHn2gLAAAACnRSTlMA8q3LfmBZPCEWf9ctygAAANdJREFUOMuVlFcSwyAMRAM2Lqyo9z9sbOIALozwfjKPlUbt81qrkoPYNEi1NpBZopKcH5BlR5yJpDVF43ZsuTKTQLCks8gGiOnMjIBLSIU5YLwwVt9kT9QEGP0gA+SIi8g+Ny/xz17C6YYc5FEfBGpBFDAfRlY3ZX9WK1AZGR+CN5UVsHdIVRmRR5KnKiuVopWPiUlUsU7xBsTykJU/RgwbJECV0c2KIBKUrUOBQn7sh/hwvYnzJegtJt+Wzgbzo9I/dPz48ovQv1L8cvJrzh8M/vS8P2K8vsODJZEI46unAAAAAElFTkSuQmCC"},ntV7:function(e,t){},rJLo:function(e,t){},tiFo:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAAKlBMVEUAAADY2NjY2NjZ2dna2tra2trY2NjZ2dnZ2dnY2Nj////Z2dnu7u7l5eU+7rgIAAAACnRSTlMA+u+zXBvLn348nrnjtgAAAMlJREFUKM9jwAlCyhSF0l2RRSZL7964e/dGS4RI8O69p1atWnN7tylMhEV7zyowOL3JASrUvXcVFNzeARHh2H0KJrRmdwNYyBusDap1C0iEVRuoCK5sUwBQiBlsEtw0A6DQ7F3IQqt3AoWsQfoQOjcDjZJehQI2BjCwQIxCGObAwL4HVeh0AQMbxHSE+QkMTOhCCgyM6EIC2IQwNWIzHtMR2JyK6SFMb2MPHMwgxAxozOjAjDTMqMWeADCTCSIx7d4tvdESZ5LDBADlVy1Iwk6V+AAAAABJRU5ErkJggg=="}},["NHnr"]);
//# sourceMappingURL=app.46174e8844ba934f837f.js.map