webpackJsonp([37],{LysE:function(t,a){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADYklEQVRIS72WT4gdRRDGv+qdXdAFjSYiHnKQ/DMgHkNC2CwieImXQBTJRQghejSHJO5MzdrQ3WPcBfXqU69eFMxBL97coC4eNIGArBHFbCAHE4Ki6O4buqQe8zYvb9/sjDm8Pr03XdW/rpqvaorQvMh7PwPgKBEdEpE9RPSIuonIHSK6JiLfAviCmS/p462OpK02i6I4HmP0APYN2P1DRLcr4HYADwzsrRhjOE3TT+vOHQl0zj1JRB8DOFg5LgH4TEQ0ip+JqBeFiGj0u4noKIBjAI5U9ssiciLP81+HwZuARVHMxhj1hjsALAM4z8wKbFzeewW+XV30ljHmeJqmXw063gOsYF8CmFTHsiwza21sJA0YWGtNkiRBLwqga4x5fhC6AazS+B2A7UR0OsuyD/8PaNg2hHBKRDoAbovIgX56N4Dee1WavrMLzDy3FSyE8ESM8cHV1dXrnU6nW2frvX8LwBv6apj5kNr1gJUaP9GNsiwP16UxhPCSiBQAdlWQv4jo/W63m1pr14fBVXq/1kCMMS+qehWoSvuxkv5snUBCCC+LiCp3BcC7ANYAvALgWQAdZn51VKSVkFQ4K8y8X2GqLH2wxMyzo5z0ppOTk7+JyERZlk9Za/9UO2ttkiTJFb2sMebxNE179Tm8vPd6vnJmyTm3QERnAZxh5vdGOYQQnhGRK0S0mGXZuUEb59w7RHQGwGFm/qYG+HqVlQUKISyJyIyI7M3z/NooB+fcLiJ6LcZ4cX5+Xt/JxvLefwTgZIO/tsOfiOiSpvQmgIezLJvud5C25VAUxd4Y42Uiuppl2YE6P+1IIYS/AfyhP/4F8HuWZTvbgtTOe6/2+m4e0gzlea7Cq10hhFUAj90XcHFxcXptbe17PWBiYuK5ubm5H5ouuwG8n5SGEN4UESsix/I8v9gEG05po2iGD3TOLRHR08z8aBNM951z94hGu7tKvbYsRtTVBwCmmflEG6D3/m5ZtCn8ES1rqir8Te2ssfDbtrb+QdbabUmS3NH/ZVnutNbe2CrKTa1Njds27yqq1sC65t27YNvPkx4yNTW1W33W19d/sdaWdRHWfp4qJekcM74PcJVanWfGM2L00zLWIaoPHeuYOCiAsQ3CQ6rrjfoi8oIx5uCoUT/GuExEn7cZ9f8D4jkYkYWJ5vMAAAAASUVORK5CYII="},erH7:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e={components:{timeList:function(){return s.e(24).then(s.bind(null,"eQjj"))},Select1:function(){return s.e(26).then(s.bind(null,"wi0O"))}},data:function(){return{labelShow:!1,day:this.common.timeForMat(7,!0)+" - "+this.common.timeForMat(0,!0),itemId:"-2",pathData:{beginDate:this.common.timeForMat(7,!1),endDate:this.common.timeForMat(0,!1),storeId:this.$store.state.shopId},pathData2:{minTime:this.common.timeForMat(7),maxTime:this.common.timeForMat(0)},AmountData:{averageDaily:"",cashAmount:"",theHighestCash:""},EarningsData:{avgAmount:0,maxAmount:0,totalAmount:0}}},computed:{changSelrct:function(){return this.$store.state.shopId}},watch:{changSelrct:function(t){this.pathData.storeId=t,this.storeAmount()}},mounted:function(){""!=this.pathData.storeId&&this.storeAmount(),this.overviewData()},methods:{labelClick:function(t){t.stopPropagation(),this.labelShow?this.labelShow=!1:this.labelShow=!0},contenClick:function(){this.labelShow=!1},storeAmount:function(){var t=this,a=this;this.http.get3("csh_m/statCenter/storeAmount/"+this.$store.state.pathCode,this.pathData,this.$store.state.token).then(function(s){if(console.log(s),console.log(s.data.code),600==s.data.code)if(null==s.data.result)t.common.eChart("eCharId1",[],[]),a.EarningsData.avgAmount=0,a.EarningsData.maxAmount=0,a.EarningsData.totalAmount=0;else{var e=s.data.result.dataList;a.EarningsData.avgAmount=a.common.Money2(s.data.result.avgAmount),a.EarningsData.maxAmount=a.common.Money2(s.data.result.maxAmount),a.EarningsData.totalAmount=a.common.Money2(s.data.result.totalAmount);var n=[],i=[];e.forEach(function(t,s){n.push(a.common.Money2(t.orderAmount)),i.push(t.statDate)}),t.common.eChart("eCharId1",n,i)}else t.$dialog.alert({message:"获取收益数据失败！"}).then(function(){})})},overviewData:function(){var t=this,a=this;this.http.get2("cashrecord/overviewData",this.pathData2,this.$store.state.token2).then(function(s){if(console.log(s),1==s.data.resultCode){var e=s.data.data.amountByDayVOS;a.AmountData.averageDaily=a.common.Money2(s.data.data.averageDaily),a.AmountData.cashAmount=a.common.Money2(s.data.data.cashAmount),a.AmountData.theHighestCash=a.common.Money2(s.data.data.theHighestCash);var n=[],i=[];e.forEach(function(t,s){n.push(a.common.Money2(t.amount)),i.push(t.times)}),t.common.eChart("eCharId2",n,i)}else t.selectList=[],t.$dialog.alert({message:s.data.resultMsg}).then(function(){})})},timeChang:function(t){t.length>10?(this.pathData.beginDate=t.split(" - ")[0],this.pathData.endDate=t.split(" - ")[1]):(this.pathData.beginDate=t,this.pathData.endDate=this.common.timeForMat(0,!1)),this.storeAmount()},timeChang2:function(t){t.length>10?(this.day=this.common.transForm(t),this.pathData2={minTime:this.common.stateLong(t.split(" - ")[0]),maxTime:this.common.stateLong(t.split(" - ")[1])}):this.pathData2={minTime:this.common.stateLong(t),maxTime:this.common.timeForMat(0)},this.overviewData()}}},n={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"content",on:{click:t.contenClick}},[e("Select1"),t._v(" "),e("div",{staticClass:"statis  statisTop"},[e("div",{staticClass:"statiStical"},[e("h2",[e("span"),e("p",[t._v("收益数据 "),e("img",{attrs:{src:s("LysE"),alt:""},on:{click:t.labelClick}})]),t._v(" "),t.labelShow?e("div",{staticClass:"labelText"},[t._v("指使用中订单、已完成租车订单的租赁费用")]):t._e()]),t._v(" "),e("ul",[e("li",[e("div",[e("span",[t._v("收益总计")]),t._v(" "),e("p",[t._v(t._s(t.EarningsData.totalAmount))])])]),t._v(" "),e("li",[e("span",[t._v("单日最高收益")]),t._v(" "),e("p",[t._v(t._s(t.EarningsData.maxAmount))])]),t._v(" "),e("li",[e("span",[t._v("日均收益")]),t._v(" "),e("p",[t._v(t._s(t.EarningsData.avgAmount))])])])]),t._v(" "),e("div",{staticClass:"marginTop"},[e("div",{staticClass:"eChars",attrs:{id:"eCharId1"}}),t._v(" "),e("div",{staticClass:"marginTop"},[e("timeList",{on:{timeChang:t.timeChang}})],1)])]),t._v(" "),e("div",{staticClass:"statis WithdrawalData"},[e("div",{staticClass:"statiStical"},[t._m(0),t._v(" "),e("ul",[e("li",[e("div",[e("span",[t._v("提现总计")]),t._v(" "),e("p",[t._v(t._s(t.AmountData.cashAmount))])])]),t._v(" "),e("li",[e("span",[t._v("单日最高提现")]),t._v(" "),e("p",[t._v(t._s(t.AmountData.theHighestCash))])]),t._v(" "),e("li",[e("span",[t._v("日均提现")]),t._v(" "),e("p",[t._v(t._s(t.AmountData.averageDaily))])])])]),t._v(" "),e("div",{staticClass:"marginTop"},[e("div",{staticClass:"eChars",attrs:{id:"eCharId2"}}),t._v(" "),e("div",{staticClass:"marginTop"},[e("timeList",{on:{timeChang:t.timeChang2}})],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("h2",[a("span"),a("p",[this._v("提现数据")])])}]};var i=s("VU/8")(e,n,!1,function(t){s("xPNt")},"data-v-434a9ab8",null);a.default=i.exports},xPNt:function(t,a){}});
//# sourceMappingURL=37.b33bb2a5570d06f68936.js.map