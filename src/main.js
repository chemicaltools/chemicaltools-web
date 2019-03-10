import Vue from 'vue'
import VueRouter from 'vue-router'
import Vue2Storage from 'vue2-storage'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'

import './registerServiceWorker'
import 'vuetify/src/stylus/app.styl'
import '@fortawesome/fontawesome-free/css/all.css'
import messages from './messages.js'

import App from './App.vue'
import index from './components/index.vue'
import element from './components/element.vue'
import mass from './components/mass.vue'
import acid from './components/acid.vue'
import deviation from './components/deviation.vue'
import gas from './components/gas.vue'
import exam from './components/exam.vue'
import setting from './components/setting.vue'

Vue.config.productionTip = false

const routes = [
  { path: '/', component: index, meta: { title: 'message.homepage' } },
  { path: '/element/', component: element, meta: { title: 'message.element' } },
  { path: '/mass/', component: mass, meta: { title: 'message.mass' } },
  { path: '/acid/', component: acid, meta: { title: 'message.acid' } },
  { path: '/deviation/', component: deviation, meta: { title: 'message.deviation' } },
  { path: '/gas/', component: gas, meta: { title: 'message.gas' } },
  { path: '/exam/', component: exam, meta: { title: 'message.exam' } },
  { path: '/setting/', component: setting, meta: { title: 'message.settings' } }
]
const router = new VueRouter({
  routes
})
Vue.use(VueRouter)
Vue.use(Vue2Storage, {
  prefix: 'app_',
  driver: 'local',
  ttl: 60 * 60 * 24 * 1000 * 365 * 10
})
Vue.filter('keepTwoNum', function (value) {
  return Number(value).toFixed(2)
})
Vue.use(Vuetify, {
  iconfont: 'fa'
})
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  router,
  render: h => h(App),
  i18n
}).$mount('#app')
