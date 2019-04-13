import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/stylus/app.styl";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faAtom,
  faBalanceScale,
  faFlask,
  faChartBar,
  faBurn,
  faQuestion,
  faCog
} from "@fortawesome/free-solid-svg-icons";

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(
  faAtom,
  faBalanceScale,
  faFlask,
  faChartBar,
  faBurn,
  faQuestion,
  faCog
);

Vue.use(Vuetify, {
  icons: {
    atom: {
      component: FontAwesomeIcon,
      props: {
        icon: ["fas", "atom"]
      }
    },
    "balance-scale": {
      component: FontAwesomeIcon,
      props: {
        icon: ["fas", "balance-scale"]
      }
    },
    flask: {
      component: FontAwesomeIcon,
      props: {
        icon: ["fas", "flask"]
      }
    },
    "chart-bar": {
      component: FontAwesomeIcon,
      props: {
        icon: ["fas", "chart-bar"]
      }
    },
    burn: {
      component: FontAwesomeIcon,
      props: {
        icon: ["fas", "burn"]
      }
    },
    question: {
      component: FontAwesomeIcon,
      props: {
        icon: ["fas", "question"]
      }
    },
    cog: {
      component: FontAwesomeIcon,
      props: {
        icon: ["fas", "cog"]
      }
    }
  }
});
