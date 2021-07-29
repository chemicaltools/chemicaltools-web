import Vue from 'vue'
import vuetify from './plugins/vuetify'
/// #if !process.env.VUE_APP_CDN
import { Plugin } from 'vue2-storage'
/// #else
// #code import Plugin from 'vue2-storage'
/// #endif
import './registerServiceWorker'

import App from './App.vue'
import i18n from './i18n'
import router from './router'

Vue.config.productionTip = false

Vue.use(Plugin, {
  prefix: 'app_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 1000 * 365 * 10
})
Vue.filter('keepTwoNum', function (value) {
  return Number(value).toFixed(2)
})

new Vue({
  router,
  vuetify,
  render: h => h(App),
  i18n
}).$mount('#app')
