import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAtom } from '@fortawesome/free-solid-svg-icons/faAtom'
import { faBalanceScale } from '@fortawesome/free-solid-svg-icons/faBalanceScale'
import { faFlask } from '@fortawesome/free-solid-svg-icons/faFlask'
import { faChartBar } from '@fortawesome/free-solid-svg-icons/faChartBar'
import { faBurn } from '@fortawesome/free-solid-svg-icons/faBurn'
import { faQuestion } from '@fortawesome/free-solid-svg-icons/faQuestion'
import { faCog } from '@fortawesome/free-solid-svg-icons/faCog'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faAtom, faBalanceScale, faFlask, faChartBar, faBurn, faQuestion, faCog)

Vue.use(Vuetify, {
  iconfont: 'faSvg'
})
