require("dotenv").config(); // if not asing will return "undefined"

const mongoose = require("mongoose");
mongoose.set("strictQuery", true);
const YOUR_MONGODB_URI = "mongodb://localhost:27017/Nasa-Api"; //

async function mongoConnect() {
  return await mongoose
    .connect(YOUR_MONGODB_URI, {
      family: 4,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("success to conect moongose....Halllooo"))
    .catch((error) => console.log(error));
}
async function mongoDisconect() {
  await mongoose.disconnect();
}
console.log(process.env.PORT);
console.log(process.env.SECRET);
module.exports = {
  mongoConnect,
  mongoDisconect,
};

/*
##############################################
const mongoose = require('mongoose');
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;
#######Don't forget do this while test############
*/
