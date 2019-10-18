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
import axios from 'axios'
import VueAxios from 'vue-axios'
import yApi from './api/api.js';
Vue.prototype.$yApi=yApi
Vue.use(VueAxios, axios)

import { Dialog ,Field} from 'vant';
import 'vant/lib/Dialog/style';
import 'vant/lib/Field/style';

Vue.component(Dialog.name, Dialog);
Vue.component(Field.name, Field);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
