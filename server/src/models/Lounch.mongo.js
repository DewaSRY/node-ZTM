const mongoose = require("mongoose");

const launchesShchema = new mongoose.Schema({
  flightNumber: Number,
  mission: String,
  rocket: String,
  launchDate: Date,
  target: String,
  customer: [String],
  upcoming: Boolean,
  success: Boolean,
});
module.exports = mongoose.model("launches", launchesShchema);
