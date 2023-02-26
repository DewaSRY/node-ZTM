const express = require("express");
const path = require("path");
const cors = require("cors");
const planetRouter = require("./routes/planets/planets.router");
const launcheRouter = require("./routes/launches/launches.router");
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));

app.use("/planets", planetRouter);
app.use("/launches", launcheRouter);
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});
module.exports = app;
