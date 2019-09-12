import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: '',
    insuranceCost: 0,
    batteryNum: 0,
    userName: '',
    insuranceOrder: null,
    selectCoupon: null
  },
  mutations: {
    setUserToken(state, token) {
      state.userToken = token;
    },
    setUserName(state, name){
      state.userName = name;
    },
    setInsuranceCosts(state, costs){
      state.insuranceCost = costs;
    },
    setBatteryNum(state, num){
      state.batteryNum = num;
    },
    setInsuranceOrder(state, obj){
      state.insuranceOrder = obj;
    },
    selectCoupon(state, item) {
      state.selectCoupon = item;
    },
    clearCoupon(state) {
      state.selectCoupon = null;
    },
  },
  actions: {

  }
});
