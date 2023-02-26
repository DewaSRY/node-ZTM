const express = require("express");
const {
  getAllLaunches,
  postAddnewLaunch,
  deleteLaunch,
} = require("./launches.controler");
const launcheRouter = express.Router();

launcheRouter
  .get("/", getAllLaunches)
  .post("/", postAddnewLaunch)
  .delete("/:id", deleteLaunch);

module.exports = launcheRouter;
