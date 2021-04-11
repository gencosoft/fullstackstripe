<template>
  <v-container fill-height class="align-center">
    <v-row>
      <v-col cols="12" sm="8" class="align-center">
        <h1 class="accent--text text--darken-2">
          Create Prebuilt Checkout Integration
        </h1>
        <h3 class="teal--text text--darken-2">
          Explore a full, working example of an integration with Stripe Prebuilt
          Checkout.
        </h3>
        <br />
        <h3 class="teal--text text--darken-2">
          Test Card - no authentication required: <b>4242 4242 4242 4242</b>
        </h3>
        <h3 class="teal--text text--darken-2">
          Test Card - authentication required: <b>4000 0027 6000 3184</b>
        </h3>
      </v-col>
      <v-col cols="12" sm="4"><PrebuiltCheckout /></v-col>
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
