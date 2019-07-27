// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import Bridge from './lib/webviewBridge.js'
import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import axios from 'axios'
import VueAxios from 'vue-axios'
import yApi from './api/api.js';

import 'lib-flexible/flexible.js'

import { Dialog } from 'vant';
import 'vant/lib/Dialog/style';
Vue.component(Dialog.name, Dialog);

require('es6-promise').polyfill()
Es6Promise.polyfill()


Vue.config.productionTip = false

Vue.prototype.$bridge = Bridge
Vue.prototype.$yApi=yApi
Vue.prototype.$dialog = Dialog   
Vue.use(VueAxios, axios)

window.onresize = setHtmlFontSize;
function setHtmlFontSize(){
    const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
    const htmlDom = document.getElementsByTagName('html')[0];
    htmlDom.style.fontSize = htmlWidth / 10 + 'px';
};
setHtmlFontSize();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
