import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      selectTab: 0,
      selectType: 0,
  },
  mutations: {
    setSelectTab(state, index) {
      state.selectTab = index;
    },
    setSelectType(state, index){
      state.selectType = index;
    }
  },
  actions: {

  }
});
