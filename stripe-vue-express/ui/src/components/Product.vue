<template>
  <v-card class="mx-auto" max-width="400">
    <v-img class="success--text align-end" height="200px" :src="product.image">
    </v-img>
    <v-card-title class="success--text">
      {{ product.name }}
      <br />
      Unpaired gray nike running shoe
    </v-card-title>
    <v-card-subtitle class="success--text">
      Amount : $ {{ product.amount }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        class="white--text"
        :disabled="product.quantity === 0"
        elevation="2"
        color="#41b782"
        @click="decrementQuantity()"
      >
        <v-icon dark> mdi-minus </v-icon>
      </v-btn>
      <v-spacer></v-spacer>

      <h3 style="color: #41b782">{{ product.quantity }}</h3>
      <v-spacer></v-spacer>
      <v-btn class="white--text" color="#41b782" @click="incrementQuantity()">
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      product: {
        name: "Running Shoe",
        image:
          "https://images.unsplash.com/photo-1491553895911-0055eca6402d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080",
        quantity: 0,
        amount: 20,
      },
    };
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