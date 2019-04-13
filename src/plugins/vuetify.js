import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAtom, faBalanceScale, faFlask, faChartBar, faBurn, faQuestion, faCog } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faAtom, faBalanceScale, faFlask, faChartBar, faBurn, faQuestion, faCog)

Vue.use(Vuetify, {
  iconfont: 'faSvg'
})
