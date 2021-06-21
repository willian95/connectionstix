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
  VDivider,
  VDialog,
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
    VDivider,
    VDialog
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
import VuetifyDialog from 'vuetify-dialog'
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})
export default ({ app }, inject) => {
  app.vuetify = vuetify;
};
