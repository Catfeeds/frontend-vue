webpackJsonp([36],{RAnZ:function(X,e){},wi0O:function(X,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={components:{},data:function(){return{selectShow:!1,selectIcon:!1,selectName:"门店名称",itemId:"-2",selectList:[{name:"XXXXX门店名称1XXXXX门店名称1"},{name:"XXXXX门店名称1XXXXX门店名称2"},{name:"XXXXX门店名称1XXXXX门店名称3"},{name:"XXXXX门店名称1XXXXX门店名称4"},{name:"XXXXX门店名称1XXXXX门店名称5"},{name:"XXXXX门店名称1XXXXX门店名称6"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称"},{name:"XXXXX门店名称1XXXXX门店名称555"},{name:"XXXXX门店名称1XXXXX门店名称444"},{name:"XXXXX门店名称1XXXXX门店名称333"},{name:"XXXXX门店名称1XXXXX门店名称222"}]}},methods:{storeList:function(){var X=this;this.http.get2("store/stat/accountStoreList",{},this.$store.state.token).then(function(e){1==e.data.resultCode?X.selectList=e.data.data:(X.selectList=[],Dialog.alert({message:"获取门店数据失败！"}).then(function(){}))})},selectClick:function(){this.selectShow?(this.selectIcon="iconbto",this.selectShow=!1):(this.selectIcon="iconTop",this.selectShow=!0)},liClick:function(X,e){this.selectClick(),this.selectName=X.name,this.itemId=e}}},s={render:function(){var X=this,e=X.$createElement,t=X._self._c||e;return t("div",[t("div",{staticClass:"Select"},[t("p",{on:{click:X.selectClick}},[X._v(X._s(X.selectName)),t("span",{class:"vantIcon "+X.selectIcon},[t("van-icon",{attrs:{name:"arrow-down"}})],1)])]),X._v(" "),X.selectShow?t("div",{staticClass:"selectList"},[t("ul",X._l(X.selectList,function(e,n){return t("li",{class:n==X.itemId?"actives":"",on:{click:function(t){return X.liClick(e,n)}}},[X._v(X._s(e.name))])}),0)]):X._e()])},staticRenderFns:[]};var c=t("VU/8")(n,s,!1,function(X){t("RAnZ")},"data-v-8bc6272c",null);e.default=c.exports}});
//# sourceMappingURL=36.612973880762e7396da3.js.map