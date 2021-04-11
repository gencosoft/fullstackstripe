<template>
  <v-card elevation="8">
    <v-img max-width="400" :src="product.image"> </v-img>
    <v-card-title style="color: teal">
      {{ product.name }}
    </v-card-title>
    <v-card-subtitle style="color: teal">
      {{ product.desc }}
      <v-spacer> Single Item Price : ${{ product.amount }} </v-spacer>
      <br />
    </v-card-subtitle>
    <v-card-text class="text-center">
      <h2 class="accent--text text--darken-2">
        Total Cost : ${{ product.amount * product.quantity }}
      </h2>
      <br />
      <v-row align="center" justify="center">
        <v-col cols="12" sm="4"
          ><v-btn
            class="white--text"
            :disabled="product.quantity === 0"
            elevation="4"
            color="teal darken-1"
            @click="decrementQuantity()"
          >
            <v-icon dark> mdi-minus </v-icon>
          </v-btn></v-col
        ><v-col cols="12" sm="4">
          <h3 class="color: teal--text text--darken-2">
            {{ product.quantity }}
          </h3></v-col
        >
        <v-col cols="12" sm="4">
          <v-btn
            elevation="4"
            class="white--text"
            color="teal darken-1"
            @click="incrementQuantity()"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn></v-col
        >
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-btn
        elevation="8"
        class="white--text"
        block
        :disabled="product.quantity === 0"
        :loading="loading"
        color="teal darken-1"
        @click="handleCheckout"
        >Proceed to Checkout <v-icon> mdi-cart-arrow-right </v-icon></v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: [
    "productImage",
    "productName",
    "productDesc",
    "productPrice",
    "isLoading",
  ],
  data() {
    return {
      product: {
        name: "",
        image: "",
        quantity: 0,
        amount: 0,
        desc: "",
      },
      loading: false,
    };
  },
  created() {
    this.product.image = this.productImage;
    this.product.name = this.productName;
    this.product.desc = this.productDesc;
    this.product.amount = this.productPrice;
  },
  watch: {
    isLoading: function () {
      this.loading = this.isLoading;
    },
  },
  methods: {
    handleCheckout() {
      this.$emit("handleCheckout", this.product);
    },
    incrementQuantity() {
      this.product.quantity++;
      this.$emit("quantityChanged", this.product);
    },
    decrementQuantity() {
      this.product.quantity--;
      this.$emit("quantityChanged", this.product);
    },
  },
};
</script>

<style>
</style>