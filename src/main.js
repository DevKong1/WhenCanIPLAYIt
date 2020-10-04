import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VModal from 'vue-js-modal'
import Notifications from 'vue-notification'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(VModal);
Vue.use(Notifications);
Vue.config.productionTip = false;
var app = new Vue({
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')