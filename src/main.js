import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.config.productionTip = false;

var app = new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')