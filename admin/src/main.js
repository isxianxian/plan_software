import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import './assets/css/style/theme/index.css';
Vue.use(ElementUI);

import './assets/css/reset.min.css'
import './assets/css/config.scss'

import api from './api/index.js';
Vue.prototype.$api = api;

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
