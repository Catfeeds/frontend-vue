import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
      selectTab: 0,
      selectType: 1,
      userToken:'',
      userName:'',
      userAvatar:'',
      joinDuration:'',
      uId:''
  },
  mutations: {
    setSelectTab(state, index) {
      state.selectTab = index;
    },
    setSelectType(state, index){
      state.selectType = index;
    },
    setUserToken(state, token){
      state.userToken = token;
    },
    setUserName(state, name){
      state.userName = name;
    },
    setUserAvatar(state, avatar){
      state.userAvatar = avatar;
    },
    setUserJoinDuration(state, duration){
      state.joinDuration = duration;
    },
    setUid(state, uid){
      state.uId = uid;
    }
  },
  actions: {

  }
});
