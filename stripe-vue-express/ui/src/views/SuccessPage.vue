<template>
  <v-container>
    <v-sheet v-if="loading" color="grey lighten-4" class="pa-3">
      <v-skeleton-loader
        loading="true"
        elevation="8"
        class="mx-auto"
        width="800"
        height="800"
        type="card"
      ></v-skeleton-loader>
    </v-sheet>
    <v-card v-if="!loading" elevation="8" class="mx-auto" width="800">
      <v-card-title style="color: teal">
        <h2>Your payment succeeded</h2>
        <br />
      </v-card-title>
      <v-card-subtitle style="color: teal">
        View checkout session response :
      </v-card-subtitle>
      <v-card-text style="color: teal">
        <v-textarea rows="20" v-model="message"> </v-textarea>
      </v-card-text>

      <v-card-actions>
        <v-btn class="white--text" large elevation="4" color="teal darken-1">
          Restart Demo
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sessionId: "",
      message: "",
      loading: true,
    };
  },
  created() {
    this.sessionId = this.$route.query.session_id;
    this.axios
      .get(
        "http://localhost:3000/retrieve-checkout-session?sessionId=" +
          this.sessionId
      )
      .then((result) => {
        this.message = JSON.stringify(result.data, null, 2);
        this.loading = false;
      })
      .catch((error) => {
        this.message = error.message;
        this.loading = false;
      });
  },
};
</script>

<style>
</style>