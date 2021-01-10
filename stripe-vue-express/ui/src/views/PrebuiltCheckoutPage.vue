<template>
  <div class="home">
    <PrebuiltCheckout />
  </div>
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
