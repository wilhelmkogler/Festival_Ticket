const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

router.post("/create", async (req, res) => {
  try {
    const { name, email, phone, items } = req.body;

    if (
      !name ||
      !email ||
      !phone ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({ message: "Invalid order data" });
    }

    const newOrder = new Order({
      name,
      email,
      phone,
      items,
    });

    await newOrder.save();
    res.status(201).json({ message: "Order created" });
  } catch (err) {
    console.error("Error saving order:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/latest", async (req, res) => {
  try {
    const latestOrder = await Order.findOne().sort({ createdAt: -1 });
    if (!latestOrder) return res.status(404).json({ error: "Nincs rendelés" });
    res.json(latestOrder);
  } catch (err) {
    console.error("Hiba az utolsó rendelés lekérésekor:", err);
    res.status(500).json({ error: "Szerverhiba" });
  }
});



module.exports = router;
