<template>
  <v-container>
    <Product
      @quantityChanged="quantityChanged"
      productName="Running Shoe"
      productDesc="Unpaired Nike Running Shoe"
      productPrice="100"
      productImage="https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
    ></Product>
    <br />
    <v-btn
      elevation="8"
      class="white--text"
      :disabled="product.quantity === 0"
      :loading="isLoading"
      large
      block
      color="#41b782"
      @click="handleCheckout"
      >Proceed to Checkout <v-icon> mdi-cart-arrow-right </v-icon></v-btn
    >
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