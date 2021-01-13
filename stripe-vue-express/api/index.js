const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");
// Set your secret key. Remember to switch to your live secret key in production!
// See your keys here: https://dashboard.stripe.com/account/apikeys
const Stripe = require("stripe");
const stripe = Stripe("sk_test_XXX");

app.use(cors());
app.use(express.json());

const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return 1400;
};

app.get("/", async (req, res) => {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1000,
    currency: "usd",
    payment_method_types: ["card"],
    receipt_email: "mrgenco@gmail.com",
  });
  res.status(200).send(paymentIntent);
});

app.post("/create-payment-intent", async (req, res) => {

  try {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(items),
      currency: "usd",
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("An error occured while creating the payment intent." + err);
    res.status(500).send("An error occured while creating the payment intent" + err);
  }
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-shirt",
            },
            unit_amount: 2000,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8080/#/success",
      cancel_url: "http://localhost:8080/#/error",
    });

    res.send({ id: session.id });
  } catch (err) {
    console.error("An error occured while creating the checkout form" + err);
    res.status(500).send("An error occured while creating the checkout form" + err);
  }

});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
