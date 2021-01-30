<template>
  <v-app>
    <v-app-bar app flat style="background-color: teal" dark>
      <v-spacer></v-spacer>

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
    </v-app-bar>

    <v-main>
      <v-slide-x-transition :hide-on-leave="hideOnLeave">
        <router-view></router-view> </v-slide-x-transition
    ></v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
    hideOnLeave: true,
  }),
  methods: {
    openDashboard() {
      window.open("https://dashboard.stripe.com/");
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