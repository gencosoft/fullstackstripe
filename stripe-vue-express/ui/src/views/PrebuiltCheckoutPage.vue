<template>
  <v-container fill-height fluid class="justify-center align-center">
    <v-row>
      <v-layout row>
        <v-flex xs8>
          <h1 style="color: teal">Create Prebuilt Checkout Integration</h1>
          <h3 style="color: teal">
            Explore a full, working example of an integration with Stripe
            Prebuilt Checkout.
          </h3>
          <h3 style="color: teal">
            The client- and server-side code redirects to a prebuilt payment
            page hosted on Stripe.
          </h3>
        </v-flex>
        <v-flex xs4><PrebuiltCheckout /></v-flex>
      </v-layout>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import PrebuiltCheckout from "@/components/PrebuiltCheckout.vue";

export default {
  name: "PrebuiltCheckoutPage",
  components: {
    PrebuiltCheckout,
  },
};
</script>
