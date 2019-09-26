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
      component: MyInsurance,
      meta:{
        title:'我的保障'
      }
    },
    {
      path: '/batteryinsurance',
      name: 'BatteryInsurance',
      component: BatteryInsurance,
      meta:{
        title:'车辆电池保障服务'
      }
    },
    {
      path: '/insuranceinput',
      name: 'InsuranceInput',
      component: InsuranceInput,
      meta:{
        title:'填写保障信息'
      }
    },
    {
      path: '/instructions',
      name: 'Instructions',
      component: Instructions,
      meta:{
        title:'投保告知'
      }
    },
    {
      path: '/policyorder',
      name: 'MyPolicyOrder',
      component: MyPolicyOrder,
      meta:{
        title:'我的保单'
      }
    },
    {
      path: '/pay',
      name: 'PayInsurance',
      component: PayInsurance,
      meta:{
        title:'订单支付'
      }
    },
    {
      path: '/coupon',
      name: 'Coupon',
      component: Coupon,
      meta:{
        title:'优惠券'
      }
    }
  ]
})
