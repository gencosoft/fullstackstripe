const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");

// Remember to switch to live secret key in production!
const Stripe = require("stripe");
const stripe = Stripe("sk_test_XXX");

app.use(cors());
app.use(express.json());

const calculateOrderAmount = (amount) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return amount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(req.body.amount),
      currency: "usd",
      payment_method_types: ["card"],
    });
    console.log("✅ Payment Intent created.");
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("An error occured while creating the payment intent." + err);
    res
      .status(500)
      .send("An error occured while creating the payment intent" + err);
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
              name: req.body.name,
              images: [req.body.image],
            },
            unit_amount: calculateOrderAmount(req.body.amount),
          },
          quantity: req.body.quantity,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:8080/#/success",
      cancel_url: "http://localhost:8080/#/error",
    });
    console.log("✅ Checkout Session Created.");
    res.send({ id: session.id });
  } catch (err) {
    console.error("An error occured while creating the checkout form" + err);
    res
      .status(500)
      .send("An error occured while creating the checkout form" + err);
  }
});

app.listen(port, () => {
  console.log(`✅ API is up and running at http://localhost:${port}`);
});
