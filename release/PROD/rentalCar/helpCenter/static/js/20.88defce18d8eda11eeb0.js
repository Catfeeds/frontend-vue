webpackJsonp([20],{ZGLY:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o={components:{shop:function(){return n.e(45).then(n.bind(null,"J8eL"))},order:function(){return n.e(44).then(n.bind(null,"AfjQ"))},Earning:function(){return n.e(43).then(n.bind(null,"fKDb"))},user:function(){return n.e(42).then(n.bind(null,"Thai"))}},data:function(){return{active:0,divShow:0,fixed:!0,shopShow:!0,icon:{normal:"//img.yzcdn.cn/icon-normal.png",active:"//img.yzcdn.cn/icon-active.png"}}},beforeCreate:function(){document.querySelector("body").setAttribute("style","height:100%;")},created:function(){var t=this,e=window.location.href.split("?")[1];void 0!=e&&(e.split("&").forEach(function(e,n){var o=e.split("=");"Token"==o[0]||"token"==o[0]?(t.$store.state.token=o[1],t.$store.state.token2=o[1]):"accountType"==o[0]?t.$store.state.accountType=o[1]:"level"==o[0]?t.$store.state.level=o[1]:"childAgentCount"==o[0]?t.$store.state.childAgentCount=o[1]:"storeManagerCount"==o[0]&&(t.$store.state.storeManagerCount=o[1])}),"0"==this.$store.state.childAgentCount&&"0"==this.$store.state.storeManagerCount&&(this.shopShow=!1,this.divShow=1))},mounted:function(){},methods:{},watch:{active:function(t){0==this.shopShow?this.divShow=this.active+1:this.divShow=this.active}}},i={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"nav"},[n("van-tabbar",{attrs:{fixed:t.fixed,"active-color":"#FF8D59"},model:{value:t.active,callback:function(e){t.active=e},expression:"active"}},[t.shopShow?n("van-tabbar-item",{attrs:{icon:"wap-home"}},[t._v(" 门店")]):t._e(),t._v(" "),n("van-tabbar-item",{attrs:{icon:"gold-coin-o"}},[t._v("收益")]),t._v(" "),n("van-tabbar-item",{attrs:{icon:"balance-list-o"}},[t._v("订单")])],1),t._v(" "),n("div",{staticClass:"Content"},[0==t.divShow?n("shop"):t._e(),t._v(" "),1==t.divShow?n("Earning"):t._e(),t._v(" "),2==t.divShow?n("order"):t._e(),t._v(" "),3==t.divShow?n("user"):t._e()],1)],1)},staticRenderFns:[]};var a=n("VU/8")(o,i,!1,function(t){n("ip/m")},"data-v-1c1e5cfc",null);e.default=a.exports},"ip/m":function(t,e){}});
//# sourceMappingURL=20.88defce18d8eda11eeb0.js.map