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
              <p class="teal--text darken-1">Per month</p>
              <p class="teal--text darken-1">Billed monthly</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark x-large color="teal darken-1">Select</v-btn>
            </v-card-actions>
          </v-card>
        </v-hover>
      </v-col>
      <v-col>
        <v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 16 : 2" width="500">
            <v-card-title class="teal--text darken-1">
              Premium $25.00
            </v-card-title>
            <v-card-subtitle class="teal--text darken-1">
              <p class="teal--text darken-1">Per month</p>
              <p class="teal--text darken-1">Billed monthly</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark x-large color="teal darken-1">Select</v-btn>
            </v-card-actions>
          </v-card></v-hover
        ></v-col
      >
      <v-col
        ><v-hover v-slot="{ hover }">
          <v-card :elevation="hover ? 16 : 2" width="500" class="mx-auto">
            <v-card-title class="teal--text darken-1">
              Enterprise $100.00
            </v-card-title>
            <v-card-subtitle class="teal--text darken-1">
              <p class="teal--text darken-1">Per month</p>
              <p class="teal--text darken-1">Billed monthly</p>
            </v-card-subtitle>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn dark x-large color="teal darken-1">Select</v-btn>
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
      // Payment intent
      clientSecret: null,
      paymentIntentCreated: false,

      // Stripe elements
      cardErrors: "",
      card: null,
      stripe: null,

      // Loading buttons
      isLoading: false,
      checkoutLoading: false,

      // Product info
      product: {
        name: "",
        image: "",
        quantity: 0,
        amount: null,
      },
      // Customer info
      email: "",
      fullname: "",

      // After payment messages
      cardErrorMessage: "",
      paymentsucceed: false,
      stripelink: "",
    };
  },
  methods: {
    handleCheckout() {
      this.checkoutLoading = true;
      this.createPaymentIntent();
      this.createStripeElements();
    },
    quantityChanged(data) {
      this.product = data;
    },
    createPaymentIntent() {
      this.axios
        .post("http://localhost:3000/create-payment-intent", this.product)
        .then((response) => {
          this.clientSecret = response.data.clientSecret;
          this.paymentIntentCreated = true;
        })
        .catch((err) => {
          console.log(
            "An error occured while creating a payment intent. Error Message : " +
              err
          );
        });
    },
    createStripeElements() {
      this.stripe = window.Stripe(
        "pk_test_51I7c7BDHwX5RTLC4wFAHLF4OHXBZO1NvhjADh90QmHW98WPleWg4evwc9TEMvPm3TQzj3TrVOuDdfxZxMxLcGHKX00BQxMTA93"
      );
      var elements = this.stripe.elements();
      var style = {
        base: {
          color: "#32325d",
        },
      };
      this.card = elements.create("card", { style: style });
      this.card.mount("#card-element");
      this.card.on("change", ({ error }) => {
        if (error) {
          this.cardErrors = error.message;
        } else {
          this.cardErrors = "";
        }
      });
    },
    handlePayment() {
      this.isLoading = true;
      this.stripe
        .confirmCardPayment(this.clientSecret, {
          receipt_email: this.email,
          payment_method: {
            card: this.card,
            billing_details: {
              name: this.fullname,
            },
          },
        })
        .then((result) => {
          if (result.error) {
            // Show error to your customer
            console.log(result.error.message);
            this.cardError = result.error.message;
            this.isLoading = false;
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
              console.log("payment success");
              this.isLoading = false;
              this.paymentsucceed = true;
              this.stripelink =
                "https://dashboard.stripe.com/test/payments/" +
                result.paymentIntent.id;
              // There's a risk of the customer closing the window before callback
              // execution. Set up a webhook or plugin to listen for the
              // payment_intent.succeeded event that handles any business critical
              // post-payment actions.
            }
          }
        });
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