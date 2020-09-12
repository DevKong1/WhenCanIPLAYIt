import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//Global helper functions
Vue.mixin({
  methods: {
    getSeconds(date) {
      return Math.floor(date / 1000)
    }
  }
})

var app = new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')