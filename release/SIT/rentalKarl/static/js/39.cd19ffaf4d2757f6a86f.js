webpackJsonp([39],{"2cT8":function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n={components:{timeList:function(){return e.e(26).then(e.bind(null,"ylmt"))},Select2:function(){return e.e(24).then(e.bind(null,"a0oE"))}},data:function(){return{labelShow:!1,day:this.common.timeForMat(7,!0)+" - "+this.common.timeForMat(0,!0),orderData:{lPayCount:"",lRefundCount:"",lTakeCount:""},pathData:{beginDate:this.common.timeForMat(7,!1),endDate:this.common.timeForMat(0,!1),subAgentId:this.$store.state.subAgentId}}},computed:{changSelrct:function(){return this.$store.state.subAgentId}},watch:{changSelrct:function(t){this.pathData.subAgentId=t,this.orderAmount()}},mounted:function(){""!=this.pathData.subAgentId&&this.orderAmount()},methods:{labelClick:function(t){t.stopPropagation(),this.labelShow?this.labelShow=!1:this.labelShow=!0},contenClick:function(){this.labelShow=!1},orderAmount:function(){var t=this,a=this;this.http.get3("csh_m/statCenter/subAgentOrder/"+this.$store.state.pathCode,this.pathData,this.$store.state.token).then(function(e){if(600==e.data.code)if(console.log(e),null==e.data.result)t.common.eChart2("eCharId2",[],[],""),a.orderData.lPayCount=0,a.orderData.lRefundCount=0,a.orderData.lTakeCount=0;else{var n=e.data.result.dataList;a.orderData.lPayCount=t.common.Money(e.data.result.lPayCount),a.orderData.lRefundCount=t.common.Money(e.data.result.lRefundCount),a.orderData.lTakeCount=t.common.Money(e.data.result.lTakeCount);var o=[],s=[],i=[],l=[];n.forEach(function(t,a){o.push(t.lPayCount),s.push(t.lRefundCount),i.push(t.lTakeCount),l.push(t.statDate)});var r=[l,o,s,i];t.common.eChart2("eCharId2",r,["支付订单","退款订单","取车订单"],"")}else t.$dialog.alert({message:"订单数据失败！"}).then(function(){})})},timeChang:function(t){t.length>10?(this.pathData.beginDate=t.split(" - ")[0],this.pathData.endDate=t.split(" - ")[1]):(this.pathData.beginDate=t,this.pathData.endDate=this.common.timeForMat(0,!1)),console.log(t),this.orderAmount()},liClick:function(t,a){this.selectClick(),this.selectName=t.name,this.itemId=a}}},o={render:function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("div",{staticClass:"content",on:{click:t.contenClick}},[n("Select2"),t._v(" "),n("div",{staticClass:"statis  statisTop"},[n("div",{staticClass:"statiStical"},[n("h2",[n("span"),n("p",[t._v("天天租订单数据 "),n("img",{attrs:{src:e("LysE"),alt:""},on:{click:t.labelClick}})]),t._v(" "),t.labelShow?n("div",{staticClass:"labelText"},[t._v("指使用中、已完成租车订单")]):t._e()]),t._v(" "),n("ul",[n("li",[n("div",[n("span",[t._v("支付订单数")]),t._v(" "),n("p",[t._v(t._s(t.orderData.lPayCount))])])]),t._v(" "),n("li",[n("span",[t._v("取车订单数")]),t._v(" "),n("p",[t._v(t._s(t.orderData.lTakeCount))])]),t._v(" "),n("li",[n("span",[t._v("退款订单数")]),t._v(" "),n("p",[t._v(t._s(t.orderData.lRefundCount))])])])]),t._v(" "),n("div",{staticClass:"marginTop"},[n("div",{staticClass:"eChars",attrs:{id:"eCharId2"}}),t._v(" "),n("div",{staticClass:"marginTop"},[n("timeList",{on:{timeChang:t.timeChang}})],1)])])],1)},staticRenderFns:[]};var s=e("VU/8")(n,o,!1,function(t){e("V7Pl")},"data-v-202eba44",null);a.default=s.exports},LysE:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADYklEQVRIS72WT4gdRRDGv+qdXdAFjSYiHnKQ/DMgHkNC2CwieImXQBTJRQghejSHJO5MzdrQ3WPcBfXqU69eFMxBL97coC4eNIGArBHFbCAHE4Ki6O4buqQe8zYvb9/sjDm8Pr03XdW/rpqvaorQvMh7PwPgKBEdEpE9RPSIuonIHSK6JiLfAviCmS/p462OpK02i6I4HmP0APYN2P1DRLcr4HYADwzsrRhjOE3TT+vOHQl0zj1JRB8DOFg5LgH4TEQ0ip+JqBeFiGj0u4noKIBjAI5U9ssiciLP81+HwZuARVHMxhj1hjsALAM4z8wKbFzeewW+XV30ljHmeJqmXw063gOsYF8CmFTHsiwza21sJA0YWGtNkiRBLwqga4x5fhC6AazS+B2A7UR0OsuyD/8PaNg2hHBKRDoAbovIgX56N4Dee1WavrMLzDy3FSyE8ESM8cHV1dXrnU6nW2frvX8LwBv6apj5kNr1gJUaP9GNsiwP16UxhPCSiBQAdlWQv4jo/W63m1pr14fBVXq/1kCMMS+qehWoSvuxkv5snUBCCC+LiCp3BcC7ANYAvALgWQAdZn51VKSVkFQ4K8y8X2GqLH2wxMyzo5z0ppOTk7+JyERZlk9Za/9UO2ttkiTJFb2sMebxNE179Tm8vPd6vnJmyTm3QERnAZxh5vdGOYQQnhGRK0S0mGXZuUEb59w7RHQGwGFm/qYG+HqVlQUKISyJyIyI7M3z/NooB+fcLiJ6LcZ4cX5+Xt/JxvLefwTgZIO/tsOfiOiSpvQmgIezLJvud5C25VAUxd4Y42Uiuppl2YE6P+1IIYS/AfyhP/4F8HuWZTvbgtTOe6/2+m4e0gzlea7Cq10hhFUAj90XcHFxcXptbe17PWBiYuK5ubm5H5ouuwG8n5SGEN4UESsix/I8v9gEG05po2iGD3TOLRHR08z8aBNM951z94hGu7tKvbYsRtTVBwCmmflEG6D3/m5ZtCn8ES1rqir8Te2ssfDbtrb+QdbabUmS3NH/ZVnutNbe2CrKTa1Njds27yqq1sC65t27YNvPkx4yNTW1W33W19d/sdaWdRHWfp4qJekcM74PcJVanWfGM2L00zLWIaoPHeuYOCiAsQ3CQ6rrjfoi8oIx5uCoUT/GuExEn7cZ9f8D4jkYkYWJ5vMAAAAASUVORK5CYII="},V7Pl:function(t,a){}});
//# sourceMappingURL=39.cd19ffaf4d2757f6a86f.js.map