// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
require('es6-promise').polyfill()
Es6Promise.polyfill()

import 'lib-flexible/flexible.js'

import { Dialog ,Field, Cell, CellGroup} from 'vant';
import 'vant/lib/Dialog/style';
import 'vant/lib/Field/style';
import 'vant/lib/Cell/style';
import 'vant/lib/cell-group/style';

Vue.component(Dialog.name, Dialog);
Vue.component(Field.name, Field);
Vue.component(Cell.name, Cell);
Vue.component(CellGroup.name, CellGroup);

import Bridge from './lib/webviewBridge.js'
import yApi from './api/api.js';
import axios from 'axios'
import VueAxios from 'vue-axios'

import "../static/general.css"
import "../static/field.css"

Vue.config.productionTip = false

Vue.prototype.$dialog = Dialog   
Vue.prototype.$bridge = Bridge
Vue.prototype.$yApi=yApi
Vue.use(VueAxios, axios)

router.beforeEach((to, from, next) => {
  if(to.meta.title) {
    document.title = to.meta.title
  }
  next();
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
