import "../assets/styles.scss";
import Vue from "vue";
import Vuetify, {
  VCard,
  VFooter,
  VContainer,
  VSelect,
  VStepper,
  VStepperHeader,
  VStepperStep,
  VStepperItems,
  VDivider
} from "vuetify/lib";
import es from "vuetify/lib/locale/es";
/*   */
Vue.use(Vuetify, {
  components: {
    VCard,
    VFooter,
    VContainer,
    VSelect,
    VStepper,
    VStepperHeader,
    VStepperStep,
    VStepperItems,
    VDivider
  }
  /*      directives: {
       Ripple,
     }, */
});

Vue.use(Vuetify);

const vuetify = new Vuetify({
  lang: {
    current: "es",
    locales: { es }
  },
  icons : {
    iconfont: 'mdiSvg',
  }
});

export default ({ app }, inject) => {
  app.vuetify = vuetify;
};
