import Vue from 'vue'
import Router from 'vue-router'
import inviter from '@/components/inviter'
import regulation from '@/components/regulation'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'inviter',
      component: inviter
    },
    {
      path: '/regulation',
      name: 'regulation',
      component: regulation
    }
  ]
})
