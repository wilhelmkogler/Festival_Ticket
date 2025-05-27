const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },
  items: [
    {
      name: String,
      type: String,
      date: Date,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: { type: Number, required: true },
  paymentIntentId: { type: String, required: true },
});

module.exports = mongoose.model("Order", orderSchema, "orders");
