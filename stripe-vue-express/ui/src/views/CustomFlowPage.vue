<template>
  <div class="home">
    <CustomFlow />
  </div>
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
