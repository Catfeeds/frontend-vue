webpackJsonp([1],{"//U/":function(t,e){},JGFO:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("7+uW"),s={name:"CustomerService",data:function(){return{questions:[{type:"换电池",questions:[{text:"如何换电池",link:"./static/frame/pages/swapBattery.html"},{text:"如何应对换电池失败的情况",link:"./static/frame/pages/swapFail.html"}]},{type:"退电池",questions:[{text:"怎么退电池？",link:"./static/frame/pages/returnBattery.html"}]},{type:"租电池",questions:[{text:"押金充值",link:"./static/frame/pages/depositCharge.html"},{text:"取电池",link:"./static/frame/pages/getBattery.html"}]},{type:"客服",questions:[{text:"人工客服",link:"./static/frame/pages/service.html"}]},{type:"充值",questions:[{text:"充值在余额的钱能否退或提现或缴纳押金",link:"./static/frame/pages/returnCharge.html"},{text:"如何充值",link:"./static/frame/pages/charge.html"},{text:"充值类别",link:"./static/frame/pages/chargeType.html"}]},{type:"换电异常",questions:[{text:"拿错电池/电池不属于你，怎么办？",link:"./static/frame/pages/swapWrongBattery.html"},{text:"app提示系统繁忙，怎么办？",link:"./static/frame/pages/swapSystemError.html"},{text:"电池被吞怎么办？",link:"./static/frame/pages/swallowBattery.html"},{text:"离线换电怎么操作？",link:"./static/frame/pages/swapBatteryOffline.html"}]},{type:"中控",questions:[{text:"定位/电量不更新",link:"./static/frame/pages/scooterLocationIssues.html"},{text:"车喇叭一直叫怎么办？",link:"./static/frame/pages/scooteHorn.html"},{text:"车（中控）固件升级方法？",link:"./static/frame/pages/fwUpgrade.html"},{text:"升级时连接不上，连接超时，蓝牙数据返回。",link:"./static/frame/pages/bleIssues.html"},{text:"绑定车辆",link:"./static/frame/pages/bind.html"},{text:"维修指引",link:"./static/frame/pages/maintainIssues.html"}]},{type:"押金",questions:[{text:"押金怎么退已经到账时间？",link:"./static/frame/pages/returnDeposit.html"}]}]}},methods:{gotoAction:function(t){window.location.href=t.link}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[t._m(0),t._v(" "),n("p",{staticClass:"sectionTitle"},[t._v("常见问题")]),t._v(" "),n("van-tabs",{attrs:{swipeable:!0,border:!1,color:"#FF8D59","title-active-color":"#333","title-inactive-color":"#999"}},t._l(t.questions,function(e){return n("van-tab",{attrs:{title:e.type}},t._l(e.questions,function(e){return n("div",{staticClass:"questionContentDiv"},[n("p",{staticClass:"questionText textFont",on:{click:function(n){return t.gotoAction(e)}}},[t._v(t._s(e.text))]),t._v(" "),n("div",{staticClass:"qustionLine"})])}),0)}),1)],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"serviceHeader"},[e("img",{attrs:{src:n("prnf")}})])}]};var r={name:"App",components:{CustomerService:n("VU/8")(s,i,!1,function(t){n("jAnh")},"data-v-43d23378",null).exports}},o={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("CustomerService")],1)},staticRenderFns:[]};var c=n("VU/8")(r,o,!1,function(t){n("h1e9")},null,null).exports,l=(n("j1ja"),n("hKoQ")),p=n.n(l),m=(n("sVYa"),n("Fd2+"));n("X53f"),n("Zmw1");function u(){var t=document.documentElement.clientWidth||document.body.clientWidth;document.getElementsByTagName("html")[0].style.fontSize=t/10+"px"}n("hKoQ").polyfill(),p.a.polyfill(),a.a.component(m.a.name,m.a),a.a.component(m.b.name,m.b),a.a.config.productionTip=!1,window.onresize=u,u(),new a.a({el:"#app",components:{App:c},template:"<App/>"})},OEKK:function(t,e){},XqYu:function(t,e){},h1e9:function(t,e){},jAnh:function(t,e){},prnf:function(t,e,n){t.exports=n.p+"static/img/serviceHeader.611cf51.png"}},["NHnr"]);
//# sourceMappingURL=app.d4faf67f3e84085d0b59.js.map