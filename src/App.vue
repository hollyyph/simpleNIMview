<template>
  <v-app>
      
      Login with your Google Account:<br>
      <v-btn v-bind:href="this.urlLogin" class="sign-in-button" @click="googleSignIn()">
        <v-icon src="/public/google_logo.svg" /> Google Sign-In
        </v-btn><br><br>
      <FormInput/> 
  </v-app>
</template>

<script>
import FormInput from './components/FormInput';

export default {
  name: 'App',
  mounted(){
    console.log(this.urlLogin)
  },

  components: {
    FormInput
    
  },

  data: () => ({
    clientId: '30081492270-826n6g67as44kcje8c0t0f6tkb3fcb4r',
    urlLogin: process.env.VUE_APP_BACKEND_URL+ '/google' // 
  }),

  method:{
    googleSignIn(){
      console.log("menuju ke ", this.urlLogin)
      return this.$router.go(this.urlLogin)
    },
    OnGoogleAuthSuccess (idToken) {
      console.log(idToken)
      // Receive the idToken and make your magic with the backend
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    },
  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  },
  // signOut() {
  //   var auth2 = gapi.auth2.getAuthInstance();
  //   auth2.signOut().then(function () {
  //     console.log('User signed out.');
  //   });
  // }

    
  }
};
</script>
<style scoped>

.sign-in-button{
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  width: 200px;
  font-size: 14px;
  font-weight: bold;
  font-family: 'Roboto', sans-serif;
}
</style>