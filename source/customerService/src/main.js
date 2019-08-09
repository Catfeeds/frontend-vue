// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import 'babel-polyfill'
import Es6Promise from 'es6-promise'
import 'lib-flexible/flexible.js'

require('es6-promise').polyfill()
Es6Promise.polyfill()

import { Tab, Tabs } from 'vant';
import 'vant/lib/Tab/style';
import 'vant/lib/Tabs/style';
Vue.component(Tab.name, Tab);
Vue.component(Tabs.name, Tabs);

Vue.config.productionTip = false


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
