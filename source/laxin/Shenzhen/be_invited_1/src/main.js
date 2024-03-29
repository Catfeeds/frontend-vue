// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Bridge from './lib/webviewBridge.js'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import axios from 'axios'
import VueAxios from 'vue-axios'
import yApi from './api/api.js'
// import $ from 'jquery'
import 'lib-flexible/flexible.js'
// import 'video.js/dist/video-js.css'
require('es6-promise').polyfill()
Es6Promise.polyfill()

Vue.config.productionTip = false
Vue.prototype.$bridge = Bridge
Vue.prototype.$yApi=yApi
Vue.use(VueAxios, axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
