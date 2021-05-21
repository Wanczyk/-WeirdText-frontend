import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import axios from 'axios'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$http = axios


new Vue({
  render: h => h(App),
}).$mount('#app')
