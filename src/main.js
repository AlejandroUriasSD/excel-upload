import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import 'vuetify/dist/vuetify.min.css'
import '@/assets/css/estilos.css'
import '@/assets/css/saluddigna.min.css'
import store from '@/state/store'
import VueAlertify from './plugins/alertify'

Vue.use(VueAlertify);


Vue.config.productionTip = false

new Vue({
  VueAlertify,
  vuetify,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
