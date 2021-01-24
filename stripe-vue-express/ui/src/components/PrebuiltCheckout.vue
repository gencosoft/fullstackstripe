<template>
  <v-container>
    <Product
      @quantityChanged="quantityChanged"
      productName="Apple Iphone"
      productDesc="11 iPhone Green Mint"
      productPrice="400"
      productImage="https://images.unsplash.com/photo-1592910147752-5e0bc5f04715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
    ></Product>
    <br />
    <v-btn
      elevation="8"
      class="white--text"
      :disabled="product.quantity === 0"
      :loading="isLoading"
      x-large
      block
      color="teal darken-1"
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
      sessionId: null,
    };
  },
  methods: {
    quantityChanged(data) {
      this.product = data;
    },
    async handleCheckout() {
      // TODO : use setup endpoint to get the keys
      this.isLoading = true;
      var stripe = window.Stripe(
        "pk_test_51I7c7BDHwX5RTLC4wFAHLF4OHXBZO1NvhjADh90QmHW98WPleWg4evwc9TEMvPm3TQzj3TrVOuDdfxZxMxLcGHKX00BQxMTA93"
      );
      // TODO : use .env variables for domain urls
      try {
        const paymentSession = await this.axios.post(
          "http://localhost:3000/payment-session",
          this.product
        );
        const result = await stripe.redirectToCheckout({
          sessionId: paymentSession.data.id,
        });
        if (result.error) {
          alert(result.error.message);
        }
        this.isLoading = false;
      } catch (error) {
        // TODO : show error to customer
        console.error("Error:", error);
        this.isLoading = false;
      }
    },
  },
};
</script>