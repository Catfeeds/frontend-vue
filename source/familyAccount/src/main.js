import Vue from 'vue'
import App from './App.vue'
import Bridge from './lib/webviewBridge.js'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import yApi from './api/api.js';

require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.config.productionTip = false
Vue.prototype.$bridge = Bridge
Vue.prototype.$yApi=yApi

new Vue({
  render: h => h(App),
}).$mount('#app')

