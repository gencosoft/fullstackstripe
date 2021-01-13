<template>
  <v-container>
    <br />
    <v-btn
      :loading="isLoading"
      dark
      large
      color="deep-purple accent-2"
      @click="handleCheckout"
      >PAY</v-btn
    >
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    handleCheckout() {
      this.isLoading = true;
      var stripe = window.Stripe(
        "pk_test_51I7c7BDHwX5RTLC4wFAHLF4OHXBZO1NvhjADh90QmHW98WPleWg4evwc9TEMvPm3TQzj3TrVOuDdfxZxMxLcGHKX00BQxMTA93"
      );

      var session_id = null;
      // Create a new Checkout Session using the server-side endpoint you
      // created in step 3.
      this.axios
        .post("http://localhost:3000/create-checkout-session")
        .then(function (response) {
          console.log("response is " + JSON.stringify(response.data.id));
          session_id = response.data.id;
          return stripe.redirectToCheckout({
            sessionId: session_id,
          });
        })
        .then(function (session) {
          console.log("your session " + JSON.stringify(session));

          this.isLoading = false;
          return stripe.redirectToCheckout({
            sessionId: session_id,
          });
        })
        .then(function (result) {
          // If `redirectToCheckout` fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using `error.message`.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch(function (error) {
          console.error("Error:", error);
          this.isLoading = false;
        });
    },
  },
};
</script>