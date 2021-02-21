<template>
  <v-container>
    <v-btn
      :loading="isLoading"
      dark
      color="accent darken-2"
      x-large
      @click="socialLogin()"
    >
      <v-icon>mdi-login</v-icon>
      <span class="mr-2">Google Sign-In</span>
    </v-btn>
  </v-container>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    async socialLogin() {
      this.isLoading = true;
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      // Localizing the provider's OAuth flow to the user's preferred language
      firebase.auth().useDeviceLanguage();
      try {
        const result = await firebase.auth().signInWithPopup(provider);
        // This gives us a Google Access Token.
        var token = result.credential.accessToken;
        console.log("access token : " + token);
        localStorage.setItem("accessToken", token);
        this.isLoading = false;
      } catch (error) {
        // Handle Errors here.
        console.log("social login failed : " + error.message);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
</style>