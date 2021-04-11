<template>
  <v-container fill-height fluid class="justify-center align-center">
    <v-row>
      <v-col cols="12" sm="8" class="align-center">
        <h1 class="accent--text text--darken-2">Create Custom Payment Form</h1>
        <h3 class="teal--text text--darken-2">
          Learn how to embed a custom Stripe payment form in your website or
          application.
        </h3>
        <h3 class="teal--text text--darken-2">
          The client-side and server-side code builds a custom payment form to
          complete a card payment.
        </h3>
        <br />
        <h3 class="teal--text text--darken-2">
          Test Card - no authentication required: <b>4242 4242 4242 4242</b>
        </h3>
        <h3 class="teal--text text--darken-2">
          Test Card - authentication required: <b>4000 0027 6000 3184</b>
        </h3>
      </v-col>
      <v-col cols="12" sm="4"><CustomFlow /></v-col>
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
