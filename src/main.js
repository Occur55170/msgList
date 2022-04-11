import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'
import App from './App'
import router from './router'
import './bus'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
Vue.config.productionTip = false

// axios.defaults.withCredentials=true;

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

localize('zh_TW', TW)

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
