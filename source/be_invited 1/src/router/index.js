import Vue from 'vue'
import Router from 'vue-router'
import inviterSubscribe from '@/components/inviterSubscribe'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'inviterSubscribe',
      component: inviterSubscribe
    }
  ]
})
