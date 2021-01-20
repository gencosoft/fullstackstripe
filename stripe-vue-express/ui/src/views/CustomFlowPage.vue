<template>
  <v-container fill-height fluid class="justify-center align-center">
    <CustomFlow />
  </v-container>
</template>

<script>
// @ is an alias to /src
import CustomFlow from "@/components/CustomFlow.vue";

export default {
  name: "CustomFlowPage",
  components: {
    CustomFlow,
  },
};
</script>
