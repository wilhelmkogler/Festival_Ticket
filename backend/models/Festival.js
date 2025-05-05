const mongoose = require("mongoose");

const FestivalSchema = new mongoose.Schema({
  name: String,
  location: String,
  dateStart: Date,
  dateEnd: Date,
  genre: [String],
  priceRange: String,
  ticketAvailable: Number,
  image: String,
  description: String,
});

module.exports = mongoose.model("Festival", FestivalSchema, "festivals");
