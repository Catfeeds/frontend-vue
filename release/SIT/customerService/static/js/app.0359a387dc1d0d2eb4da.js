webpackJsonp([1],{"//U/":function(t,e){},"0fJc":function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAA01JREFUWAntl09IVFEUxn0zL2cGQhKyoASLJqiIFkFhhDStHHEQWkhQEEHaMlrUyn0tItqXuGjdwmaQcUQis4ygXVSEFlS2iTAbwZjUmX7nee/j9noz83IccdGF6zn33nO+77t/52k1BCy9vb1b8/n8McuyUtRTpLWVSiVc6yP+k1AolA6Hwy/T6fRCQEgnzKoWnEgktsVisYvEXYLwMEQNWKdKLgKcWiwWpfmaOhSNRoeGh4fnpaNaqSigs7OzG8IbkBwRIEVSFlPEiSDiXhE0kM1mM2WD1UC4TICVTCavAHgXwFYhllkLuCaRPG9brwwxOxk+E4/HF2dmZl6U4XC6fVegq6vrKuB3NKAQSaX9gfqIOmXb9mdBWFlZacWcZPw0dZ9PzjVW4rbD5vPnLwHdFGb8gNiogMmMKfP4tyAbHBsb++qD04DoFgT0EXcd2yyrhpXQAv7ZXC730C/vDwFwNwMwReABA+AT7QvMYsIPwNvHuelA9H3I9wiGTADMafx2RMx5453p6U5m2EeiSS4zPx+UXHAgmSTnHHVOVkBNZD/+Zc1jWldAgutGUj/VGVfJN0dHR5+aCUF8cp4TJ7fHCVeY/bLC3nxXAHf9OMsV10tP0jQH7Z43IWh7aWlpEKx3IkIEgL2XFT7hzXcFMNBOsCNZ9o2SGxkZ+e5NCNoeHx//AXFWYcmBlNLuzTcFHNSDahUmdXutFvJngiVFbYPLoTFdAQS06E6V8MVsr9GfVcROOv52L44rgIFGPShJ1H/6UdG5puUMCcbqqV4dcDl0nClA922o/S9g86wAd9Q8LHU5B34cdiqV2l0oFDj0pSgBdSE2QCM9PT274PqVyWS+Sb/N8/iWb7ktkDfqR8NIWDdXPW5Hl5eX3+NPAJwUcBs1MWWlXdcCV4iJRiGJaCI5hHXfe01mWJdz89wCQ92GunYtbHzE2PwPcIh9db6uefvldL8B013iavg1CYhEIk0QyM92k1xhPkJm8duojgC5bvgVS00CBBli5wcfMmk28nXcgS1wtbltxbh0Vio1C9DgSsAO2o+lj/dFTNWybgI0kxKim1WtXMO6v7+VVNjs4QKqvV8qlmxgpUQZ49SXWOpFMCQ/0MmHS579nxr7N6Dkeb564Sr5AAAAAElFTkSuQmCC"},JGFO:function(t,e){},MPvc:function(t,e){},NHnr:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i("7+uW"),s={name:"CustomerService",data:function(){return{questions:[{type:"换电池",questions:[{text:"如何换电池",link:"./static/frame/pages/swapBattery.html"},{text:"如何应对换电池失败的情况",link:"./static/frame/pages/swapFail.html"}]},{type:"退电池",questions:[{text:"怎么退电池？",link:"./static/frame/pages/returnBattery.html"}]},{type:"租电池",questions:[{text:"押金充值",link:"./static/frame/pages/depositCharge.html"},{text:"取电池",link:"./static/frame/pages/getBattery.html"}]},{type:"客服",questions:[{text:"人工客服",link:"./static/frame/pages/service.html"}]},{type:"充值",questions:[{text:"充值在余额的钱能否退或提现或缴纳押金",link:"./static/frame/pages/returnCharge.html"},{text:"如何充值",link:"./static/frame/pages/charge.html"},{text:"充值类别",link:"./static/frame/pages/chargeType.html"}]},{type:"换电异常",questions:[{text:"拿错电池/电池不属于你，怎么办？",link:"./static/frame/pages/swapWrongBattery.html"},{text:"app提示系统繁忙，怎么办？",link:"./static/frame/pages/swapSystemError.html"},{text:"电池被吞怎么办？",link:"./static/frame/pages/swallowBattery.html"},{text:"离线换电怎么操作？",link:"./static/frame/pages/swapBatteryOffline.html"}]},{type:"中控",questions:[{text:"定位/电量不更新",link:"./static/frame/pages/scooterLocationIssues.html"},{text:"车喇叭一直叫怎么办？",link:"./static/frame/pages/scooteHorn.html"},{text:"车（中控）固件升级方法？",link:"./static/frame/pages/fwUpgrade.html"},{text:"升级时连接不上，连接超时，蓝牙数据返回。",link:"./static/frame/pages/bleIssues.html"},{text:"绑定车辆",link:"./static/frame/pages/bind.html"},{text:"维修指引",link:"./static/frame/pages/maintainIssues.html"}]},{type:"押金",questions:[{text:"押金怎么退已经到账时间？",link:"./static/frame/pages/returnDeposit.html"}]},{type:"套餐",questions:[{text:"套餐相关问题",link:"./static/frame/pages/package.html"}]},{type:"新用户",questions:[{text:"刚注册e换电用户怎么加入？",link:"./static/frame/pages/newUser.html"}]}]}},methods:{gotoAction:function(t){window.location.href=t.link},customServiceAction:function(){window.location.href="IMMOTOR://tel:0755-27787220"}}},a={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[t._m(0),t._v(" "),i("p",{staticClass:"sectionTitle"},[t._v("常见问题")]),t._v(" "),i("van-tabs",{attrs:{swipeable:!0,border:!1,"swipe-threshold":5,color:"#FF8D59","title-active-color":"#333","title-inactive-color":"#999"}},t._l(t.questions,function(e){return i("van-tab",{key:e.type,attrs:{title:e.type}},t._l(e.questions,function(e){return i("div",{key:e.text,staticClass:"questionContentDiv"},[i("p",{staticClass:"questionText textFont",on:{click:function(i){return t.gotoAction(e)}}},[t._v(t._s(e.text))]),t._v(" "),i("div",{staticClass:"qustionLine"})])}),0)}),1),t._v(" "),i("div",{staticClass:"bottomDiv"},[t._m(1),t._v(" "),i("p",{staticClass:"telText",on:{click:t.customServiceAction}},[t._v("联系客服")])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"serviceHeader"},[e("img",{attrs:{src:i("prnf")}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"telImgDiv"},[e("img",{attrs:{src:i("0fJc")}})])}]};var c={name:"App",components:{CustomerService:i("VU/8")(s,a,!1,function(t){i("MPvc")},"data-v-025045f2",null).exports}},r={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("CustomerService")],1)},staticRenderFns:[]};var o=i("VU/8")(c,r,!1,function(t){i("h1e9")},null,null).exports,l=(i("j1ja"),i("hKoQ")),m=i.n(l),p=(i("sVYa"),i("Fd2+"));i("X53f"),i("Zmw1");function u(){var t=document.documentElement.clientWidth||document.body.clientWidth;document.getElementsByTagName("html")[0].style.fontSize=t/10+"px"}i("hKoQ").polyfill(),m.a.polyfill(),n.a.component(p.a.name,p.a),n.a.component(p.b.name,p.b),n.a.config.productionTip=!1,window.onresize=u,u(),new n.a({el:"#app",components:{App:o},template:"<App/>"})},OEKK:function(t,e){},XqYu:function(t,e){},h1e9:function(t,e){},prnf:function(t,e,i){t.exports=i.p+"static/img/serviceHeader.611cf51.png"}},["NHnr"]);
//# sourceMappingURL=app.0359a387dc1d0d2eb4da.js.map