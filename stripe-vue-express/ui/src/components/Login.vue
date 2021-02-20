<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col>
        <v-btn depressed color="error" x-large @click="socialLogin()">
          Sign In with Google
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import firebase from "firebase";
export default {
  methods: {
    socialLogin() {
      var provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope("profile");
      provider.addScope("email");
      // Localizing the provider's OAuth flow to the user's preferred language
      firebase.auth().useDeviceLanguage();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          console.log("social login success : " + result);

          // This gives us a Google Access Token.
          var token = result.credential.accessToken;
          console.log("access token : " + token);

          // The signed-in user info.
          var user = result.user;
          console.log("signed-in user : " + JSON.stringify(user));
        })
        .catch((error) => {
          // Handle Errors here.
          console.log("social login failed : " + error.message);
        });
    },
  },
};
</script>

<style>
</style>