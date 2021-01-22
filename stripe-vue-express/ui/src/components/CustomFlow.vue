<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col v-if="!paymentIntentCreated">
        <Product
          @quantityChanged="quantityChanged"
          productName="Succulent Pot"
          productDesc="Green Succulent Pot"
          productPrice="20"
          productImage="https://images.unsplash.com/photo-1516048015710-7a3b4c86be43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MXwxfDB8MXxhbGx8fHx8fHx8fA&ixlib=rb-1.2.1&q=80&w=1080&utm_source=unsplash_source&utm_medium=referral&utm_campaign=api-credit"
        ></Product>
        <br />
        <v-btn
          elevation="8"
          v-if="!paymentIntentCreated"
          class="white--text"
          :disabled="product.quantity === 0"
          :loading="checkoutLoading"
          x-large
          block
          color="teal darken-1"
          @click="handleCheckout()"
        >
          Proceed to Checkout
          <v-icon> mdi-cart-arrow-right </v-icon></v-btn
        ></v-col
      >
      <v-col v-show="paymentIntentCreated">
        <h1 style="color: #41b782">{{ product.name }}</h1>
        <h2 style="color: #41b782">
          Total cost : ${{ product.amount * product.quantity }}
        </h2>
        <h3 style="color: #41b782">
          Quantity : {{ product.quantity }}. You will pay ${{ product.amount }}
          for each product
        </h3>

        <form id="payment-form">
          <v-text-field
            v-show="paymentIntentCreated"
            solo
            clearable
            hint="Enter Email Address"
            label="Enter Email Address"
            v-model="email"
          ></v-text-field>
          <v-text-field
            solo
            clearable
            v-show="paymentIntentCreated"
            label="Enter Full Name"
            hint="Enter Full Name"
            v-model="fullname"
          ></v-text-field>
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
            color="#41b782"
            id="submit"
            @click="handlePayment"
            >Pay</v-btn
          >
          <br />
          <p v-if="cardErrorMessage.length > 0">{{ cardErrorMessage }}</p>
          <p v-if="paymentsucceed">
            Payment succeeded, see the result in your
            <a :href="stripelink" target="_blank">Stripe dashboard.</a> Refresh
            the page to pay again.
          </p>
        </form></v-col
      >
    </v-row>
  </v-container>
</template>

<script>
// TODO work on custom Stripe Elements
import Product from "@/components/Product.vue";
export default {
  components: {
    Product,
  },
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
    
    // TODO : use .env variables for domain urls
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
     // TODO : use setup endpoint to get the keys 
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