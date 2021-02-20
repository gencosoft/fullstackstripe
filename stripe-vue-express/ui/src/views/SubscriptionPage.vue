<template>
  <v-container fluid class="justify-center align-center">
    <Login v-if="!isSignedIn" />
    <Subscription v-if="isSignedIn" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Subscription from "@/components/Subscription.vue";
import Login from "@/components/Login.vue";
import firebase from "firebase";
import "firebase/auth";
export default {
  name: "SubscriptionPage",
  components: {
    Subscription,
    Login,
  },
  data() {
    return {
      isSignedIn: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isSignedIn = true;
      } else {
        this.isSignedIn = false;
      }
    });
  },
};
</script>
