import Vue from 'vue'
import Router from 'vue-router'
import answer from '@/components/answer'
import activityRules from '@/components/activityRules'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'answer',
      component: answer
    },
    {
      path: '/activityRules',
      name: 'activityRules',
      component: activityRules
    }

  ]
})
