webpackJsonp([19],{"4fmr":function(t,n){},ZGLY:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a={components:{shop:function(){return e.e(41).then(e.bind(null,"J8eL"))},order:function(){return e.e(44).then(e.bind(null,"AfjQ"))},Earning:function(){return e.e(43).then(e.bind(null,"fKDb"))},user:function(){return e.e(42).then(e.bind(null,"Thai"))}},data:function(){return{active:0,fixed:!0,icon:{normal:"//img.yzcdn.cn/icon-normal.png",active:"//img.yzcdn.cn/icon-active.png"}}},mounted:function(){var t=this,n=window.location.href.split("?")[1];void 0!=n&&n.split("&").forEach(function(n,e){var a=n.split("=");"accountType"==a[0]?t.$store.state.accountType=a[1]:(t.$store.state.token=a[1],t.$store.state.token2=a[1],console.log(a[1]))})},methods:{},watch:{active:function(t){console.log(this.active)}}},i={render:function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"nav"},[e("van-tabbar",{attrs:{fixed:t.fixed,"active-color":"#FF8D59",router:"true"},model:{value:t.active,callback:function(n){t.active=n},expression:"active"}},[e("van-tabbar-item",{attrs:{icon:"wap-home"}},[t._v(" 门店")]),t._v(" "),e("van-tabbar-item",{attrs:{icon:"gold-coin-o"}},[t._v("收益")]),t._v(" "),e("van-tabbar-item",{attrs:{icon:"balance-list-o"}},[t._v("订单")])],1),t._v(" "),e("div",{staticClass:"Content"},[0==t.active?e("shop"):t._e(),t._v(" "),1==t.active?e("Earning"):t._e(),t._v(" "),2==t.active?e("order"):t._e(),t._v(" "),3==t.active?e("user"):t._e()],1)],1)},staticRenderFns:[]};var o=e("VU/8")(a,i,!1,function(t){e("4fmr")},"data-v-2c965320",null);n.default=o.exports}});
//# sourceMappingURL=19.11e24cd3ee35ed81a939.js.map