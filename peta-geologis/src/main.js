import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import { routes } from './routes'
import 'leaflet/dist/leaflet.css';

Vue.use(VueRouter)

Vue.config.productionTip = false

const router = new VueRouter ({
  routes,
  mode: 'history'
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
