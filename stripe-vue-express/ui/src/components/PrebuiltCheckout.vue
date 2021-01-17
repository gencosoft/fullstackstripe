<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col><Product @quantityChanged="quantityChanged"></Product></v-col>

      <v-col>
        <v-btn
          class="white--text"
          :disabled="product.quantity === 0"
          :loading="isLoading"
          large
          color="teal darken-1"
          @click="handleCheckout"
          >Proceed to Checkout <v-icon> mdi-cart-arrow-right </v-icon></v-btn
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
import Product from "@/components/Product.vue";
export default {
  components: {
    Product,
  },
  data() {
    return {
      isLoading: false,
      product: {
        name: "",
        image: "",
        quantity: 0,
        amount: null,
      },
    };
  },
  methods: {
    quantityChanged(data) {
      this.product = data;
    },
    handleCheckout() {
      this.isLoading = true;
      var stripe = window.Stripe(
        "pk_test_51I7c7BDHwX5RTLC4wFAHLF4OHXBZO1NvhjADh90QmHW98WPleWg4evwc9TEMvPm3TQzj3TrVOuDdfxZxMxLcGHKX00BQxMTA93"
      );

      var session_id = null;
      // Create a new Checkout Session using the server-side endpoint you
      // created in step 3.
      this.axios
        .post("http://localhost:3000/create-checkout-session", this.product)
        .then((response) => {
          console.log("response is " + JSON.stringify(response.data.id));
          session_id = response.data.id;
        })
        .then((session) => {
          console.log("your session " + JSON.stringify(session));
          return stripe.redirectToCheckout({
            sessionId: session_id,
          });
        })
        .then((result) => {
          this.isLoading = false;
          // If `redirectToCheckout` fails due to a browser or network
          // error, you should display the localized error message to your
          // customer using `error.message`.
          if (result.error) {
            alert(result.error.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          this.isLoading = false;
        });
    },
  },
};
</script>