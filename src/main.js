import Vue from 'vue'
import router from "@/router/router"
import App from '@/App.vue'
import {
  store
} from '../store/index'

import '@/plugins/vuetify'
import './firebase';
import VueFire from 'vuefire';
import {
  auth
} from './firebase';


Vue.use(VueFire);
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  },

}).$mount('#app')