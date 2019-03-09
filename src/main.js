import Vue from 'vue'
import VueRouter from 'vue-router'
import Vue2Storage from 'vue2-storage'
import Vuetify from 'vuetify'
import VueI18n from 'vue-i18n'

import './registerServiceWorker'
import 'vuetify/src/stylus/app.styl'
import '@fortawesome/fontawesome-free/css/all.css'

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
const messages = {
  en: {
    message: {
      chemicaltools: 'Chemical Tools',
      element: 'Element Search',
      mass: 'Mass Calculation',
      acid: 'Acid-Base Calculation',
      exam: 'Element Memory',
      gas: 'Gas Calculation',
      deviation: 'Deviation Calculation',
      calculate: 'Calculate',
      description: 'Essential tools for chemistry students',
      homepage: 'Home Page',
      settings: 'Settings',
      languages: 'Languages',
      search: 'Search',
      wikipedia: 'Visit Wikipedia',
      elementhint: 'Element name/symbol/number',
      elementnodata: 'Please search an element.',
      formula: 'Chemical formula',
      pkab: 'pKa or pKb',
      ab: 'Acid or Base',
      c: 'Analytical concentration (mol/L)',
      question: 'Question',
      wronginput: 'Wrong input.',
      inputdata: 'Please input data!',
      multpledata: "Please input multiple data."
    }
  },
  zh: {
    message: {
      chemicaltools: '化学e+',
      element: '元素查询',
      mass: '质量计算',
      acid: '酸碱计算',
      exam: '元素记忆',
      gas: '气体计算',
      deviation: '偏差计算',
      calculate: '计算',
      description: '化学专业学生的必备工具',
      homepage: '主页',
      settings: '设置',
      languages: '语言',
      search: '查询',
      wikipedia: '访问维基百科',
      elementhint: '元素名称/符号/原子序数/IUPAC名称',
      elementnodata: '请搜索一个元素',
      formula: '化学式',
      pkab: 'pKa或pKb',
      ab: '酸或碱',
      c: '分析浓度(mol/L)',
      question: '问题',
      wronginput: '输入错误！',
      inputdata: '请输入数据！',
      multpledata: '请输入多个数据！'
    }
  }
}

const i18n = new VueI18n({
  locale: 'en',
  messages
})

new Vue({
  router,
  render: h => h(App),
  i18n
}).$mount('#app')
