<template>
  <v-app>
    <v-app-bar app color="#6772e5" dark>

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

      
      <v-btn @click="openDashboard"  text>
        <span class="mr-2">Stripe Dashboard</span>
      </v-btn>
    
    </v-app-bar>

    <v-main> <router-view></router-view> </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  methods:{
    openDashboard(){
      window.open("https://dashboard.stripe.com/");
    }
  }
};
</script>
