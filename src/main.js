import Vue from 'vue'
import './plugins/vuetify'
import Vue2Storage from 'vue2-storage'

import './registerServiceWorker'

import App from './App.vue'
import i18n from './i18n'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vue2Storage, {
  prefix: 'app_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 1000 * 365 * 10
})
Vue.filter('keepTwoNum', function (value) {
  return Number(value).toFixed(2)
})

new Vue({
  router,
  render: h => h(App),
  i18n
}).$mount('#app')
