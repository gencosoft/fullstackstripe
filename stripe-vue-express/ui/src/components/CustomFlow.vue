<template>
  <v-container>
    <form id="payment-form">
      <div id="card-element">
        <!-- Elements will create input elements here -->
      </div>

      <!-- We'll put the error messages in this element -->
      <div id="card-errors" role="alert">
        {{ cardErrors }}
      </div>
      <br />
      <v-btn
        dark
        :loading="isLoading"
        block
        color="#6772e5"
        id="submit"
        @click="handlePayment"
        >Pay</v-btn
      >
    </form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      clientSecret: null,
      cardErrors: "",
      card: null,
      stripe: null,
      isLoading: false,
    };
  },
  mounted() {
    this.createPaymentIntent();
    this.createStripeElements();
  },
  methods: {
    createPaymentIntent() { // TODO : proceed to checkout ile ilerlendiğinde çağrılmalı bu komponente props olarak verilmeli
      this.axios
        .post("http://localhost:3000/create-payment-intent")
        .then((response) => {
          this.clientSecret = response.data.clientSecret;
        })
        .catch((err) =>{
          console.log("An error occured while creating a payment intent. Error Message : " + err);
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
          payment_method: {
            card: this.card,
            billing_details: {
              name: "Jenny Rosen",
            },
          },
        })
        .then((result) => {
          if (result.error) {
            // Show error to your customer (e.g., insufficient funds)
            console.log(result.error.message);
            this.isLoading = false;
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === "succeeded") {
              console.log("payment success");
              this.isLoading = false;
              // Show a success message to your customer
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