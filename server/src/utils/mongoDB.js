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

module.exports = {
  mongoConnect,
  mongoDisconect,
};
