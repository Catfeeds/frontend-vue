import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import guide from '@/components/guide'

import registercharge from '@/components/registercharge'
import regulation from '@/components/regulation'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    // {
    //   path: '/',
    //   name: 'guide',
    //   component: guide
    // },
    {
      path: '/',
      name: 'registercharge',
      component: registercharge
    },
    {
      path: '/regulation',
      name: 'regulation',
      component: regulation
    }
  ]
})
