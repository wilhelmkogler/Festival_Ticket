const mongoose = require("mongoose");

const FestivalSchema = new mongoose.Schema({
  name: String,
  location: String,
  dateStart: Date,
  dateEnd: Date,
  genre: [String],
  ticketAvailable: Number,
  image: String,
  description: String,
  basicPrice: Number,
  premiumPrice: Number,
  vipPrice: Number
});


module.exports = mongoose.model("Festival", FestivalSchema, "festivals");
