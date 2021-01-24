<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 16 : 2" width="500">
            <v-card-title class="teal--text darken-1">
              Basic $5.00
            </v-card-title>
            <v-card-subtitle class="teal--text darken-1">
              <p class="teal--text darken-1">Per Month</p>
              <p class="teal--text darken-1">Billed Monthly</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :loading="isPlan1Loading"
                @click="selectPlan(priceIdPlan1, 1)"
                dark
                x-large
                color="teal darken-1"
                >Select</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
      <v-col>
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 16 : 2" width="500">
            <v-card-title class="teal--text darken-1">
              Premium $50.00
            </v-card-title>
            <v-card-subtitle class="teal--text darken-1">
              <p class="teal--text darken-1">Per Month</p>
              <p class="teal--text darken-1">Billed Monthly</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="selectPlan(priceIdPlan2, 2)"
                dark
                :loading="isPlan2Loading"
                x-large
                color="teal darken-1"
                >Select</v-btn
              >
            </v-card-actions>
          </v-card></v-hover
        ></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isPlan1Loading: false,
      isPlan2Loading: false,
      sessionId: null,
      stripe: null,
      priceIdPlan1: "price_1ID3diDHwX5RTLC47TEOqRDf",
      priceIdPlan2: "price_1ID3ecDHwX5RTLC4qdxSmqbw",
    };
  },
  created() {
    // TODO : use setup endpoint to get the keys
    this.stripe = window.Stripe(
      "pk_test_51I7c7BDHwX5RTLC4wFAHLF4OHXBZO1NvhjADh90QmHW98WPleWg4evwc9TEMvPm3TQzj3TrVOuDdfxZxMxLcGHKX00BQxMTA93"
    );
  },
  methods: {
    async selectPlan(priceId, btnNo) {
      // TODO : use .env variables for domain urls
      try {
        if (btnNo === 1) this.isPlan1Loading = true;
        if (btnNo === 2) this.isPlan2Loading = true;
        const paymentSession = await this.axios.post(
          "http://localhost:3000/subscription-session",
          { priceId: priceId }
        );
        const result = await this.stripe.redirectToCheckout({
          sessionId: paymentSession.data.id,
        });
        if (result.error) {
          alert(result.error.message);
        }
        this.isPlan1Loading = false;
        this.isPlan2Loading = false;
      } catch (error) {
        // TODO : show error to customer
        console.error("Error:", error);
        this.isPlan1Loading = false;
        this.isPlan2Loading = false;
      }
    },
  },
};
</script>

<style>
/* Variables */
* {
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-content: center;
  height: 100vh;
  width: 100vw;
}

form {
  width: 30vw;
  min-width: 500px;
  align-self: center;
  box-shadow: 0px 0px 0px 0.5px rgba(50, 50, 93, 0.1),
    0px 2px 5px 0px rgba(50, 50, 93, 0.1), 0px 1px 1.5px 0px rgba(0, 0, 0, 0.07);
  border-radius: 7px;
  padding: 40px;
}

input {
  border-radius: 6px;
  margin-bottom: 6px;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  font-size: 16px;
  width: 100%;
  background: white;
}

#card-error {
  color: rgb(105, 115, 134);
  text-align: left;
  font-size: 13px;
  line-height: 17px;
  margin-top: 12px;
}

#card-element {
  border-radius: 4px 4px 0 0;
  padding: 12px;
  border: 1px solid rgba(50, 50, 93, 0.1);
  height: 44px;
  width: 100%;
  background: white;
}

#payment-request-button {
  margin-bottom: 32px;
}
</style>