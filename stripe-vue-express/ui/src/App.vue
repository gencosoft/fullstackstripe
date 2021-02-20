<template>
  <v-app>
    <v-app-bar app flat style="background-color: teal" dark>
      <v-row justify="center" no-gutters>
        <v-btn class="ma-2" to="/prebuiltcheckout" target="_self" text>
          <span class="mr-2">Prebuilt Checkout Flow</span>
        </v-btn>

        <v-btn class="ma-2" to="/customflow" target="_self" text>
          <span class="mr-2">Custom Payment Flow</span>
        </v-btn>

        <v-btn class="ma-2" to="/subscription" target="_self" text>
          <span class="mr-2">Subscription</span>
        </v-btn>

        <v-btn class="ma-2" color="accent darken-2" @click="openDashboard">
          <span class="mr-2">Stripe Dashboard</span>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn class="ma-2" v-if="isSignedIn" text>
          <span class="mr-2">{{ user.displayName }}</span></v-btn
        >

        <v-btn v-if="isSignedIn" class="ma-2" @click="signOut()" color="error">
          <span class="mr-2">Sign Out</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </v-row>
    </v-app-bar>

    <v-main>
      <v-container ma-8 fill-height class="align-stretch">
        <v-slide-x-transition :hide-on-leave="hideOnLeave">
          <router-view></router-view>
        </v-slide-x-transition>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";
import "firebase/auth";
export default {
  name: "App",

  data: () => ({
    isSignedIn: false,
    user: null,
    hideOnLeave: true,
  }),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Auth state Changed. User signed in.");
        this.isSignedIn = true;
        this.user = user;
      } else {
        console.log("Auth state Changed. User signed out.");
        this.isSignedIn = false;
        this.user = null;
      }
    });
  },
  methods: {
    openDashboard() {
      window.open("https://dashboard.stripe.com/");
    },
    openProfile() {},
    async signOut() {
      try {
        await firebase.auth().signOut();
      } catch (error) {
        // Handle Errors here.
        console.log("signout failed : " + error.message);
      }
    },
  },
};
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>