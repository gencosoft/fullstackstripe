<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col>
        <v-hover v-slot="{ hover }">
          <v-card  :elevation="hover ? 16 : 2" width="300">
            <v-img
              height="200px"
              src="https://images.unsplash.com/photo-1592910147752-5e0bc5f04715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
            >
            </v-img>

            <v-card-title class="teal--text darken-1">
              Basic - $5.00
            </v-card-title>
            <v-card-subtitle>
              <p class="teal--text darken-1">Per Month (Billed Monthly)</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                :loading="isPlan1Loading"
                @click="selectPlan(priceIdPlan1, 1)"
                block    
                dark 
                rounded    
                color="teal darken-1"    
                >Subscribe</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
      <v-col>
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 16 : 2" width="300">
            <v-img
              height="200px"
              src="https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
            >
            </v-img>

            <v-card-title class="teal--text darken-1">
              Premium - $50.00
            </v-card-title>
            <v-card-subtitle class="teal--text darken-1">
              <p class="teal--text darken-1">Per Month (Billed Monthly)</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                @click="selectPlan(priceIdPlan2, 2)"
                block
                dark
                rounded    
                color="teal darken-1" 
                :loading="isPlan2Loading"
                  
                >Subscribe</v-btn
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
