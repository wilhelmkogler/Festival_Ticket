const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  items: [mongoose.Schema.Types.Mixed],


}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema, "orders");


