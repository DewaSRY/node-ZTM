const { Router } = require("express");

const {
  getFriends,
  postFriend,
  getOneFriend,
} = require("../Controllers/friends");

const friendRouter = Router();

friendRouter
  .get("/", getFriends)
  .post("/", postFriend)
  .get("/:idFriends", getOneFriend);

module.exports = friendRouter;
