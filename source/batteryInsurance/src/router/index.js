import Vue from 'vue'
import Router from 'vue-router'

import MyInsurance from '@/components/MyInsurance'
import BatteryInsurance from '@/components/BatteryInsurance'
import InsuranceInput from '@/components/InsuranceInput'
import Instructions from '@/components/Instructions'
import MyPolicyOrder from '@/components/MyPolicyOrder'
import PayInsurance from '@/components/PayInsurance'
import Coupon from '@/components/Coupon'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MyInsurance',
      component: MyInsurance
    },
    {
      path: '/batteryinsurance',
      name: 'BatteryInsurance',
      component: BatteryInsurance
    },
    {
      path: '/insuranceinput',
      name: 'InsuranceInput',
      component: InsuranceInput
    },
    {
      path: '/instructions',
      name: 'Instructions',
      component: Instructions
    },
    {
      path: '/policyorder',
      name: 'MyPolicyOrder',
      component: MyPolicyOrder
    },
    {
      path: '/pay',
      name: 'PayInsurance',
      component: PayInsurance
    },
    {
      path: '/coupon',
      name: 'Coupon',
      component: Coupon
    }
  ]
})
