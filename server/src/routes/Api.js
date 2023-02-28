const express = require("express");
const planetRouter = require("./planets/planets.router");
const launcheRouter = require("./launches/launches.router");

const api = express.Router();

api.use("/planets", planetRouter);
api.use("/launches", launcheRouter);

module.exports = {
  api,
};
