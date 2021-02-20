<template>
  <v-container fill-height fluid class="justify-center align-center">
    <Login />
    <Subscription v-if="isAuthenticated" />
  </v-container>
</template>

<script>
// @ is an alias to /src
import Subscription from "@/components/Subscription.vue";
import Login from "@/components/Login.vue";

export default {
  name: "SubscriptionPage",
  components: {
    Subscription,
    Login,
  },
  data() {
    return {
      isAuthenticated: false,
    };
  },
};
</script>
