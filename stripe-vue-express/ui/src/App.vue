<template>
  <v-app>
    <v-app-bar app flat color="#41b782" dark>
      <v-spacer></v-spacer>

      <v-btn to="/prebuiltcheckout" target="_self" text>
        <span class="mr-2">Prebuilt Checkout Flow</span>
      </v-btn>

      <v-btn to="/customflow" target="_self" text>
        <span class="mr-2">Custom Payment Flow</span>
      </v-btn>

      <v-btn to="/subscription" target="_self" text>
        <span class="mr-2">Subscription</span>
      </v-btn>

      <v-btn @click="openDashboard" text>
        <span class="mr-2">Stripe Dashboard</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>
    <transition
      name="slide-in-down"
      appear
      appear-active-class="animated slideInDown"
    >
      <v-main>
        <router-view></router-view> </v-main
    ></transition>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
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