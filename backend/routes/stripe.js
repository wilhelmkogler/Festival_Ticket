const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-payment-intent", async (req, res) => {
  const { cart } = req.body;

  if (!Array.isArray(cart) || cart.length === 0) {
    return res.status(400).json({ error: "Cart is empty or invalid." });
  }

  // Total összeadás
  const amount = cart.reduce((total, item) => {
    const price = item.price || 0;
    const quantity = item.quantity || 1;
    return total + price * quantity;
  }, 0);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // euró -> cent
      currency: "eur",
      metadata: {
        cart: JSON.stringify(cart),
      },
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
