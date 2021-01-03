import Vue from 'vue'
// import Vuetify from 'vuetify'
import Vuetify from 'vuetify/lib'

// /// #if process.env.CDN != 'yes'
// import 'vuetify/dist/vuetify.min.css'
// import '@fortawesome/fontawesome-free/css/all.css'
// /// #endif

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faAtom, faBalanceScale, faFlask, faChartBar, faBurn, faQuestion, faCog, faBars, faHome } from '@fortawesome/free-solid-svg-icons'

Vue.component('font-awesome-icon', FontAwesomeIcon)
library.add(faAtom, faBalanceScale, faFlask, faChartBar, faBurn, faQuestion, faCog, faBars, faHome)
Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'faSvg',
    // iconfont: 'fa'
  },
  theme: { dark: false }
})
