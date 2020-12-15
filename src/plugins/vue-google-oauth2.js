import Vue from 'vue'
import GAuth from 'vue-google-oauth2'

const gauthOption = {
    clientId: '30081492270-826n6g67as44kcje8c0t0f6tkb3fcb4r.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)