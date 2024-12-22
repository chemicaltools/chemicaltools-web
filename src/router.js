import Vue from 'vue'
import VueRouter from 'vue-router'
import index from './components/index.vue'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    { path: '/', component: index, meta: { title: 'message.homepage' } },
    { path: '/element/', component: () => import(/* webpackChunkName: "element" */ './components/element.vue'), meta: { title: 'message.element' } },
    { path: '/mass/', component: () => import(/* webpackChunkName: "mass" */ './components/mass.vue'), meta: { title: 'message.mass' } },
    { path: '/acid/', component: () => import(/* webpackChunkName: "acid" */ './components/acid.vue'), meta: { title: 'message.acid' } },
    { path: '/deviation/', component: () => import(/* webpackChunkName: "deviation" */ './components/deviation.vue'), meta: { title: 'message.deviation' } },
    { path: '/gas/', component: () => import(/* webpackChunkName: "gas" */ './components/gas.vue'), meta: { title: 'message.gas' } },
    { path: '/exam/', component: () => import(/* webpackChunkName: "exam" */ './components/exam.vue'), meta: { title: 'message.exam' } },
    { path: '/setting/', component: () => import(/* webpackChunkName: "setting" */ './components/setting.vue'), meta: { title: 'message.settings' } }
  ]
})
