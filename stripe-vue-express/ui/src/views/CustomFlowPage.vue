<template>
  <v-container fill-height fluid class="justify-center align-center">
    <v-row>
      <v-layout row>
        <v-flex xs8>
          <h1 style="color: teal">Create Custom Payment Form</h1>
          <h3 style="color: teal">
            Learn how to embed a custom Stripe payment form in your website or
            application.
          </h3>
          <h3 style="color: teal">
            The client- and server-side code builds a custom payment form to
            complete a card payment.
          </h3>
        </v-flex>
        <v-flex xs4><CustomFlow /></v-flex>
      </v-layout>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import CustomFlow from "@/components/CustomFlow.vue";

export default {
  name: "CustomFlowPage",
  components: {
    CustomFlow,
  },
};
</script>
