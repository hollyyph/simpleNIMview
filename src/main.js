import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import VueRouter from 'vue-router'

import dotenv from 'dotenv'

dotenv.config()

Vue.prototype.$axios = axios;

Vue.config.productionTip = false


Vue.use(VueRouter)

new Vue({
    vuetify,
    render: h => h(App),
}).$mount('#app')