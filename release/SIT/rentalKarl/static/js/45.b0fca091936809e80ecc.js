webpackJsonp([45],{erH7:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={components:{timeList:function(){return e.e(23).then(e.bind(null,"eQjj"))},Select1:function(){return e.e(37).then(e.bind(null,"wi0O"))}},data:function(){return{day:this.common.timeForMat(7,!0)+" - "+this.common.timeForMat(0,!0),itemId:"-2",pathData:{beginDate:this.common.timeForMat(7,!1),endDate:this.common.timeForMat(0,!1),storeId:"5d5367d48883410001a60cb1"},pathData2:{minTime:this.common.timeForMat(7),maxTime:this.common.timeForMat(0)},AmountData:{averageDaily:"",cashAmount:"",theHighestCash:""}}},computed:{changSelrct:function(){return this.$store.state.shopId}},watch:{changSelrct:function(t){this.storeAmount(),this.common.eChart("eCharId1")}},mounted:function(){this.overviewData()},methods:{storeAmount:function(){var t=this;this.http.get3("csh_m/statCenter/storeAmount/v1",this.pathData,this.$store.state.token).then(function(a){console.log(a),console.log(a.data.resultCode),1==a.data.resultCode||(t.selectList=[],Dialog.alert({message:"获取门店数据失败！"}).then(function(){}))})},overviewData:function(){var t=this,a=this;this.http.get2("cashrecord/overviewData",this.pathData2,this.$store.state.token).then(function(e){if(console.log(e),1==e.data.resultCode){var s=e.data.data.amountByDayVOS;a.AmountData.averageDaily=a.common.Money2(e.data.data.averageDaily),a.AmountData.cashAmount=a.common.Money2(e.data.data.cashAmount),a.AmountData.theHighestCash=a.common.Money2(e.data.data.theHighestCash),console.log(t.AmountData);var i=[],n=[];s.forEach(function(t,e){i.push(a.common.Money2(t.amount)),n.push(t.times)}),t.common.eChart("eCharId2",i,n)}else t.selectList=[],Dialog.alert({message:"获取门店数据失败！"}).then(function(){})})},timeChang:function(t){t.length>10?this.day=this.common.transForm(t):this.day=this.common.transForm(t)+" - "+this.common.timeForMat(0,!0),this.overviewData()},timeChang2:function(t){t.length>10?(this.day=this.common.transForm(t),this.pathData2={minTime:this.common.stateLong(t.split(" - ")[0]),maxTime:this.common.stateLong(t.split(" - ")[1])}):this.pathData2={minTime:this.common.stateLong(t),maxTime:this.common.timeForMat(0)},this.overviewData()}}},i={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"content"},[e("Select1"),t._v(" "),e("div",{staticClass:"statis  statisTop"},[t._m(0),t._v(" "),e("div",{staticClass:"marginTop"},[e("div",{staticClass:"eChars",attrs:{id:"eCharId1"}}),t._v(" "),e("div",{staticClass:"marginTop"},[e("timeList",{on:{timeChang:t.timeChang}})],1)])]),t._v(" "),e("div",{staticClass:"statis WithdrawalData"},[e("div",{staticClass:"statiStical"},[t._m(1),t._v(" "),e("ul",[e("li",[e("div",[e("span",[t._v("提现总计")]),t._v(" "),e("p",[t._v(t._s(t.AmountData.cashAmount))])])]),t._v(" "),e("li",[e("span",[t._v("单日最高提现")]),t._v(" "),e("p",[t._v(t._s(t.AmountData.theHighestCash))])]),t._v(" "),e("li",[e("span",[t._v("日均提现")]),t._v(" "),e("p",[t._v(t._s(t.AmountData.averageDaily))])])])]),t._v(" "),e("div",{staticClass:"marginTop"},[e("div",{staticClass:"eChars",attrs:{id:"eCharId2"}}),t._v(" "),e("div",{staticClass:"marginTop"},[e("timeList",{on:{timeChang:t.timeChang2}})],1)])])],1)},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"statiStical"},[e("h2",[e("span"),e("p",[t._v("收益数据")])]),t._v(" "),e("ul",[e("li",[e("div",[e("span",[t._v("收益总计")]),t._v(" "),e("p",[t._v("40,7925")])])]),t._v(" "),e("li",[e("span",[t._v("收益总计")]),t._v(" "),e("p",[t._v("40,7925")])]),t._v(" "),e("li",[e("span",[t._v("收益总计")]),t._v(" "),e("p",[t._v("40,7925")])])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("h2",[a("span"),a("p",[this._v("提现数据")])])}]};var n=e("VU/8")(s,i,!1,function(t){e("ysbk")},"data-v-08192c56",null);a.default=n.exports},ysbk:function(t,a){}});
//# sourceMappingURL=45.b0fca091936809e80ecc.js.map