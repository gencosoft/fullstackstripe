<template>
  <v-container fill-height fluid class="justify-center align-center">
    <PrebuiltCheckout />
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
