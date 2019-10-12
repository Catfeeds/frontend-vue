// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'


import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()


import 'lib-flexible/flexible.js'

import "../static/general.css"

import Bridge from './lib/webviewBridge.js'
import yApi from './api/api.js';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.prototype.$bridge = Bridge
Vue.prototype.$yApi=yApi
Vue.use(VueAxios, axios)

import animated from 'animate.css' 
Vue.use(animated)

import { Swipe ,SwipeItem} from 'vant';
import 'vant/lib/swipe/style';
import 'vant/lib/swipe-item/style';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
