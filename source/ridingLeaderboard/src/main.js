// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import 'lib-flexible/flexible.js'

import { Dialog ,Tab, Tabs } from 'vant';
import 'vant/lib/Dialog/style';
import 'vant/lib/Tab/style';
import 'vant/lib/Tabs/style';
Vue.component(Dialog.name, Dialog);
Vue.component(Tab.name, Tab);
Vue.component(Tabs.name, Tabs);

import Bridge from './lib/webviewBridge.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import yApi from './api/api.js';

Vue.prototype.$bridge = Bridge
Vue.prototype.$yApi=yApi
Vue.prototype.$dialog = Dialog   
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
