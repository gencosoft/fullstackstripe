<template>
  <v-card elevation="8" class="mx-auto" width="500" max-width="600">
    <v-img class="success--text align-end" height="500px" :src="product.image">
    </v-img>
    <v-card-title style="color: #41b782">
      {{ product.name }}
      <v-spacer></v-spacer>
      Total Price : $ {{ product.amount * product.quantity }}
    </v-card-title>
    <v-card-subtitle style="color: #41b782">
      {{ product.desc }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        class="white--text"
        :disabled="product.quantity === 0"
        elevation="8"
        color="#41b782"
        @click="decrementQuantity()"
      >
        <v-icon dark> mdi-minus </v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <h3 style="color: #41b782">{{ product.quantity }}</h3>
      <v-spacer></v-spacer>
      <v-btn
        elevation="8"
        class="white--text"
        color="#41b782"
        @click="incrementQuantity()"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ["productImage", "productName", "productDesc", "productPrice"],
  data() {
    return {
      product: {
        name: "",
        image: "",
        quantity: 0,
        amount: 0,
        desc: "",
      },
    };
  },
  created() {
    this.product.image = this.productImage;
    this.product.name = this.productName;
    this.product.desc = this.productDesc;
    this.product.amount = this.productPrice;
  },
  methods: {
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