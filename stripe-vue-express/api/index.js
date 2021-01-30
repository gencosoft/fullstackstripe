const express = require("express");
const app = express();
const Stripe = require("stripe");

if (process.env.NODE_ENV !== "PROD") {
  require("dotenv").config();
}
console.log("ENVIRONMENT IS " + process.env.NODE_ENV);

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
var cors = require("cors");

app.use(cors());
app.use(express.json());

const calculateOrderAmount = (amount) => {
  // Calculating the order total on the server to prevent
  // people from directly manipulating the amount on the client
  return amount * 100;
};

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
    const priceId = req.body.priceId;
    var successUrl =
      process.env.UI_HOST + "/#/success?session_id={CHECKOUT_SESSION_ID}";
    var cancelUrl = process.env.UI_HOST + "/#/error";

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    console.log("✔️  Subscription Checkout Session Created.");
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
    var successUrl =
      process.env.UI_HOST + "/#/success?session_id={CHECKOUT_SESSION_ID}";
    var cancelUrl = process.env.UI_HOST + "/#/error";
    console.log("success url : " + successUrl);
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
      success_url: successUrl,
      cancel_url: cancelUrl,
    });
    console.log("✔️  Payment Checkout Session Created.");
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
    // managing their billing with the portal.
    const returnUrl =
      process.env.UI_HOST + "/#/success?session_id=" + sessionId;

    const portalsession = await stripe.billingPortal.sessions.create({
      customer: checkoutsession.customer,
      return_url: returnUrl,
    });
    console.log("✔️  Customer Portal Session Created.");
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

const port = process.env.PORT || 8082;
app.listen(port, () => {
  console.log(`✔️  API is up and running at http://localhost:${port}`);
});
