import Vue from 'vue'
import Router from 'vue-router'
import RidingLeaderboard from '../components/RidingLeaderboard'
import RidingShare from '../components/RidingShare'
Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: 'RidingLeaderboard',
      component: RidingLeaderboard,
    },
    {
      path: '/RidingShare',
      name: 'RidingShare',
      component: RidingShare,
    }
  ]
})
