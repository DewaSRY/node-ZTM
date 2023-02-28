const mongoose = require("mongoose");

const planetsSchema = new mongoose.Schema({
  kepler_name: String,
});
module.exports = mongoose.model("planets", planetsSchema);
