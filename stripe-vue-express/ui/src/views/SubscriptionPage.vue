<template>
  <v-container fill-height fluid class="justify-center align-center">
    <Subscription />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Subscription from "@/components/Subscription.vue";

export default {
  name: "SubscriptionPage",
  components: {
    Subscription,
  },
};
</script>
