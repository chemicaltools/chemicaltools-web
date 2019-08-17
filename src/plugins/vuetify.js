import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAtom, faBalanceScale, faFlask, faChartBar, faBurn, faQuestion, faCog, faBars, faHome } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faAtom, faBalanceScale, faFlask, faChartBar, faBurn, faQuestion, faCog, faBars, faHome)

export default new Vuetify({
  icons: {
    iconfont: 'faSvg'
  },
  theme: { dark: true },
});
