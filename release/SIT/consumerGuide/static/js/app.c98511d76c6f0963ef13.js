webpackJsonp([1],{"3Uj3":function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAABCCAMAAAAST2RjAAAAeFBMVEUAAACGPSSGPSSHPSWLQCSgYDCHPSWHPSSHPSSHPiSIPyiJQCaLQCaPRyiPUTOGPiWGPiSGPiWGPiWHPiWGPSSGPiSHPiSHPySHPiSIPiWHPiWIPyaGPyaHPySHPiSHPiSJPySHPySHPiSHQCiKQCuMQCaHSy2GPSSU1cEtAAAAJ3RSTlMA6O6lGwX699e1PTEnDAjz4t7PysS+qpuUi4N6cmpiW1RMRiAYFBH4L/NeAAABCklEQVRIx6XWRw7DMAxEUcuy4/Tee3G5/w0TJHBGqy8D5PoBgho5SZJ553yWRCtLm0+lwyj0zbdmUemaXxXPKGzlI7Z0W717ZDOSN5QjyebK0kleUI4DeWY5lzyhfC0kj7z3vuQBZRnIPcpqKblDWa8kfU5yspbcstxIDlBOB4GcdpWbCcl8K7lm6SVXdUK1k1xWKPeS/RLlIZAZyqPk4oXyJDkfozxLOpaXQI5QXiVTlree5BDlXXLG8lH8ZfE0QV6aN2M5Hj5wvkLLo+Bnxg/X8hX4c/F3tTeAHFoKNClse3KGRsqtmZu9ZXzwQOIRZxmaPIZ5sFuiAocPjjP2gMSRi0OcPRZ2DppvVhRouyH7pOkAAAAASUVORK5CYII="},"6tLM":function(t,i){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiBAMAAADIaRbxAAAAJFBMVEUAAAD/qWb/qWf/qWb/qmb/qWb/qGb/q2n/qGn/rGb/r3D/qGYHOHPJAAAAC3RSTlMAapTjS+2HSTgoEK5lW/oAAAA0SURBVCjPY4ACjhQGNDB7twOaiPRuheEuUrwbBWwVYLDejQp2YYpg6hp0/qK5CCK1YKYoAIhyS7njPpKjAAAAAElFTkSuQmCC"},"C/5X":function(t,i,s){t.exports=s.p+"static/img/header.ae11cf0.png"},DXyQ:function(t,i,s){t.exports=s.p+"static/img/battery.93f7e44.png"},KjUT:function(t,i){},NHnr:function(t,i,s){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var e=s("7+uW"),n={name:"ConsumerGuide",data:function(){return{hasGroup:!1,showDailog:!1}},methods:{bottomAction:function(){if(this.hasGroup)window.location.href="https://test.ehuandian.net/immotor/h5vue/buyingBatteries/index.html";else{var t=window.location.href,i="";-1!=t.indexOf("?")&&(i=t.substr(t.indexOf("?"),t.length)),i&&i.length>0?i+="&appointment=1":i="?appointment=1",window.location.href="https://test.ehuandian.net/immotor/h5vue/providersList/index.html"+i}},confirmAction:function(){window.location.href="IMMOTOR://backAction"},getUrlParam:function(t){var i=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),s=window.location.search.substr(1).match(i);return null!=s?unescape(decodeURIComponent(s[2])):null}},mounted:function(){if("1"==this.getUrlParam("by_client")&&(this.hasGroup=!0),"1"==this.getUrlParam("show")){this.showDailog=!0;document.body.style.overflow="hidden",document.addEventListener("touchmove",function(t){t.preventDefault()},{passive:!1})}}},o={render:function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("div",{staticClass:"mainBody"},[t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),s("p",{staticClass:"bottomPrompt"},[t._v("* 最终解释权归深圳市易马达科技公司所有")]),t._v(" "),s("div",{staticClass:"bottomOprBtn",on:{click:t.bottomAction}},[t.hasGroup?s("span",{staticClass:"bottomTitleFont"},[t._v("购买超级电池+智慧中控")]):t._e(),t._v(" "),t.hasGroup?s("span",{staticClass:"bottomAmountFont"},[t._v("  ¥1680")]):s("span",{staticClass:"bottomTitleFont"},[t._v("马上预约服务商 >")])])]),t._v(" "),t.showDailog?s("div",{staticClass:"toastMask"},[s("div",{staticClass:"toastBK"},[s("p",{staticClass:"toastTitle"},[t._v("如要购买超级电池包，请联系当地服务商先退中控押金！")]),t._v(" "),s("div",{staticClass:"toastBtn toastBtnTextFont",on:{click:t.confirmAction}},[t._v("确定")])])]):t._e()])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("div",{staticClass:"headerImgDiv"},[i("img",{attrs:{src:s("C/5X")}}),this._v(" "),i("div",{staticClass:"headerLogoIconDiv"},[i("img",{attrs:{src:s("UFWg")}})]),this._v(" "),i("div",{staticClass:"textBK"}),this._v(" "),i("p",{staticClass:"priceRemark"},[this._v("仅售")]),this._v(" "),i("p",{staticClass:"priceText"},[this._v("1680元")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"firstSectionDiv sectionCommon"},[e("div",{staticClass:"sectionTitleBKDiv"},[e("img",{attrs:{src:s("smz6")}}),t._v(" "),e("p",{staticClass:"sectionTitle sectionTitleFont"},[t._v("1680元包含以下产品和服务")])]),t._v(" "),e("div",{staticClass:"firstSectionIcon firstSectionIcon1"},[e("img",{attrs:{src:s("Y7A2")}})]),t._v(" "),e("div",{staticClass:"firstSectionLinkIconLeft firstSectionLinkIcon"},[e("img",{attrs:{src:s("6tLM")}})]),t._v(" "),e("div",{staticClass:"firstSectionIcon firstSectionIcon2"},[e("img",{attrs:{src:s("UbBL")}})]),t._v(" "),e("div",{staticClass:"firstSectionLinkIconRight firstSectionLinkIcon"},[e("img",{attrs:{src:s("6tLM")}})]),t._v(" "),e("div",{staticClass:"firstSectionIcon firstSectionIcon3"},[e("img",{attrs:{src:s("DXyQ")}})]),t._v(" "),e("p",{staticClass:"firstSectionText1 firSectionTextFont"},[t._v("3年600次")]),t._v(" "),e("p",{staticClass:"firstSectionText2 firSectionTextFont"},[t._v("智慧中控")]),t._v(" "),e("p",{staticClass:"firstSectionText3 firSectionTextFont"},[t._v("一颗超级电池")]),t._v(" "),e("p",{staticClass:"firstSectionRemark1 firstSectionRemarkFont"},[t._v("免费充电")]),t._v(" "),e("p",{staticClass:"firstSectionRemark2 firstSectionRemarkFont"},[t._v("智慧大脑")]),t._v(" "),e("p",{staticClass:"firstSectionRemark3 firstSectionRemarkFont"},[t._v("绿色环保")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"secondSectionDiv sectionCommon"},[e("div",{staticClass:"sectionTitleBKDiv"},[e("img",{attrs:{src:s("smz6")}}),t._v(" "),e("p",{staticClass:"sectionTitle sectionTitleFont"},[t._v("环保回收奖励")]),t._v(" "),e("p",{staticClass:"secondSectionText"},[e("span",{staticClass:"recyclingRemarkFont"},[t._v("超级电池+中控回收奖励高达")]),t._v(" "),e("span",{staticClass:"recyclingMoneyFont"},[t._v("1300")]),t._v(" "),e("span",{staticClass:"recyclingUnitFont"},[t._v("元")])])])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"thirdSectionDiv sectionCommon"},[e("div",{staticClass:"sectionTitleBKDiv"},[e("img",{attrs:{src:s("smz6")}}),t._v(" "),e("p",{staticClass:"sectionTitle sectionTitleFont"},[t._v("两步即可完成预约 开启换电新时代")])]),t._v(" "),e("div",{staticClass:"thirdSectionIcon1"},[e("img",{attrs:{src:s("VB2l")}})]),t._v(" "),e("div",{staticClass:"thirdSectionArrowIcon"},[e("img",{attrs:{src:s("3Uj3")}})]),t._v(" "),e("div",{staticClass:"thirdSectionIcon2"},[e("img",{attrs:{src:s("nSAa")}})]),t._v(" "),e("p",{staticClass:"thirdSectionText1 firSectionTextFont"},[t._v("1. 选择服务商")]),t._v(" "),e("p",{staticClass:"thirdSectionText2 firSectionTextFont"},[t._v("2. 选择到店日期 并提交信息")])])},function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"fourthSectionDiv sectionCommon"},[e("div",{staticClass:"sectionTitleBKDiv"},[e("img",{attrs:{src:s("smz6")}}),t._v(" "),e("p",{staticClass:"sectionTitle sectionTitleFont"},[t._v("为什么选择e换电超级电池包")])]),t._v(" "),e("p",{staticClass:"fourthSectionText fourSectionTextTop1"},[t._v("1.更安全")]),t._v(" "),e("p",{staticClass:"fourthSectionRemark"},[t._v("革新性的新一代动力电池，多重安全保护；智能换电系统全自助换电，告别充电难与充电安全隐患。")]),t._v(" "),e("p",{staticClass:"fourthSectionText fourSectionTextTopCommon"},[t._v("2.更省钱")]),t._v(" "),e("p",{staticClass:"fourthSectionRemark"},[t._v("一次购买，享受充电免费、1颗超级电池及智慧中控，可随时绿色回收，奖励高达1300元。")]),t._v(" "),e("p",{staticClass:"fourthSectionText fourSectionTextTopCommon"},[t._v("3.更高效")]),t._v(" "),e("p",{staticClass:"fourthSectionRemark"},[t._v("APP预约换电，智能规划寻找电池路径，随时随地满足所需；换电只需3秒，高效便捷，无需等待。")]),t._v(" "),e("p",{staticClass:"fourthSectionText fourSectionTextTopCommon"},[t._v("4.更环保")]),t._v(" "),e("p",{staticClass:"fourthSectionRemark"},[t._v("智能锂电，统一回收再利用，解决铅酸污染，绿色环保。")])])}]};var a={name:"App",components:{ConsumerGuide:s("VU/8")(n,o,!1,function(t){s("KjUT")},"data-v-4aeb99fc",null).exports}},c={render:function(){var t=this.$createElement,i=this._self._c||t;return i("div",{attrs:{id:"app"}},[i("ConsumerGuide")],1)},staticRenderFns:[]};var r=s("VU/8")(a,c,!1,function(t){s("dsHW")},null,null).exports,l=(s("j1ja"),s("hKoQ")),v=s.n(l);s("sVYa");s("hKoQ").polyfill(),v.a.polyfill(),e.a.config.productionTip=!1,new e.a({el:"#app",components:{App:r},template:"<App/>"})},UFWg:function(t,i,s){t.exports=s.p+"static/img/headerLogo.29ae470.png"},UbBL:function(t,i,s){t.exports=s.p+"static/img/scooter.1c561b2.png"},VB2l:function(t,i,s){t.exports=s.p+"static/img/provider.9bbed5f.png"},Y7A2:function(t,i,s){t.exports=s.p+"static/img/times.5e2e6e3.png"},dsHW:function(t,i){},nSAa:function(t,i,s){t.exports=s.p+"static/img/arrivalDate.2b32bd0.png"},smz6:function(t,i,s){t.exports=s.p+"static/img/sectionTitle.026fdc6.png"}},["NHnr"]);
//# sourceMappingURL=app.c98511d76c6f0963ef13.js.map