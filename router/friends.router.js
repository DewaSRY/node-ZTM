const { Router } = require("express");

const {
  getFriends,
  postFriend,
  getOneFriend,
} = require("../Controllers/friends");

const friendRouter = Router();

friendRouter.use((req, res, next) => {
  console.log(`${req.method} ${req.url} your ip is`, req.ip);
  next();
});

friendRouter
  .get("/", getFriends)
  .post("/", postFriend)
  .get("/:idFriends", getOneFriend);

module.exports = friendRouter;
