webpackJsonp([43],{J8eL:function(t,e,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={components:{shopLeft:function(){return o.e(36).then(o.bind(null,"jfLx"))},shopRight:function(){return o.e(41).then(o.bind(null,"gnuu"))}},data:function(){return{activeTabs:0,shopShow:!0,tabShow:!1,borderColor:"rgba(0,0,0,0)"}},computed:{nvb:function(){return this.$store.state.agentStore}},watch:{nvb:function(t){"1"==this.$store.state.accountType&&1==this.$store.state.agentStore&&(this.borderColor="rgb(255, 141, 89)",this.tabShow=!0)}},mounted:function(){},methods:{changes:function(t){this.shopShow=1!=t}}},a={render:function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"shopDiv"},[o("van-tabs",{attrs:{color:t.borderColor,"title-inactive-color":"#484848","title-active-color":"#FF8D59",swipeable:""},on:{change:t.changes},model:{value:t.activeTabs,callback:function(e){t.activeTabs=e},expression:"activeTabs"}},[o("van-tab",{attrs:{title:"我的门店"}},[t.shopShow?o("shopLeft"):t._e()],1),t._v(" "),t.tabShow?o("van-tab",{attrs:{title:"下级代理商"}},[t.shopShow?t._e():o("shopRight")],1):t._e()],1)],1)},staticRenderFns:[]};var s=o("VU/8")(n,a,!1,function(t){o("k+c8")},"data-v-7b5282ab",null);e.default=s.exports},"k+c8":function(t,e){}});
//# sourceMappingURL=43.5e3720fa8664e8211d03.js.map