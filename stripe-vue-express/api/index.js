const express = require("express");
const app = express();
const port = 3000;
var cors = require("cors");

// Remember to switch to live secret key in production!
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51I7c7BDHwX5RTLC4dWbTaqJBvBjN0XrjE21D1vbqmzwVEyVhwa3hcNiNukb4xWYfvcSOwU1ZoV8TzYDmT8a6FQz500EinWwVGJ"
);

app.use(cors());
app.use(express.json());

const calculateOrderAmount = (amount) => {
  // Calculating the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return amount * 100;
};

// TODO : create a setup endpoint

/**
 * Creates A Custom Payment Intent
 */
app.post("/create-payment-intent", async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(req.body.amount),
      currency: "usd",
      payment_method_types: ["card"],
    });
    console.log("✔️  Payment Intent created.");
    res.status(200).send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(
      "❌ An error occured while creating the payment intent. " + err
    );
    res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

/**
 * Creates A Prebuilt Subscription Session
 */
app.post("/subscription-session", async (req, res) => {
  try {
    console.log("Request Body : " + JSON.stringify(req.body));
    const priceId = req.body.priceId;
    console.log("priceId : " + priceId);
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url:
        "http://localhost:8080/#/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:8080/#/error",
    });
    console.log("✔️  Checkout Session Created.");
    res.send({ id: session.id });
  } catch (err) {
    console.error("❌ /subscription-session error occured. " + err);
    res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

/**
 * Creates A Prebuilt Checkout Session
 */
app.post("/payment-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
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
      // TODO : use env variables for domain urls ex :  success_url: `${domainURL}/success.html
      success_url:
        "http://localhost:8080/#/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:8080/#/error",
    });
    console.log("✔️  Checkout Session Created.");
    res.send({ id: session.id });
  } catch (err) {
    console.error("❌ /payment-session error occured. " + err);
    res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

/**
 * Retrieves An Existing Checkout Session
 */
app.get("/payment-session", async (req, res) => {
  try {
    const { sessionId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    res.send(session);
  } catch (err) {
    res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

app.post("/customer-portal", async (req, res) => {
  try {
    // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
    // Typically this is stored alongside the authenticated user in your database.
    const { sessionId } = req.body;
    const checkoutsession = await stripe.checkout.sessions.retrieve(sessionId);

    // This is the url to which the customer will be redirected when they are done
    // managign their billing with the portal.
    const returnUrl = "http://localhost:8080/#/success?session_id=" + sessionId;

    const portalsession = await stripe.billingPortal.sessions.create({
      customer: checkoutsession.customer,
      return_url: returnUrl,
    });

    res.send({
      url: portalsession.url,
    });
  } catch (err) {
    console.error("❌ /customer-portal api error occured. " + err);
    res.status(400).send({
      error: {
        message: err.message,
      },
    });
  }
});

app.listen(port, () => {
  console.log(`✔️  API is up and running at http://localhost:${port}`);
});
