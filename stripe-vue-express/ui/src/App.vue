<template>
  <v-app>
    <v-app-bar app color="deep-purple darken-4" dark>

      <v-spacer></v-spacer>

      <v-btn to="/prebuiltcheckout" target="_self" text>
        <span class="">Prebuilt Checkout Flow</span>
      </v-btn>

      <v-btn to="/customflow" target="_self" text>
        <span class="mr-2">Custom Flow</span>
      </v-btn>
    
      <v-btn to="/subscription" target="_self" text>
        <span class="mr-2">Subscription</span>
      </v-btn>


    
      <v-btn to="/billing" target="_self" text>
        <span class="mr-2">Billing</span>
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
};
</script>
