const friends = require("../Models/Friends.model");
function getFriends(req, res) {
  res.send(JSON.stringify(friends));
}
function postFriend(req, res) {
  const { name } = req.body;
  if (!name) {
    res.status(400).json({
      error: "don't do it dude",
    });
  } else {
    const newFrieends = {
      name: name,
      id: Math.random(),
    };
    friends.push(newFrieends);
    res.status(200).json(friends);
  }
}

function getOneFriend(req, res) {
  const idFriends = Number(req.params.idFriends);
  const Friends = friends[idFriends];
  if (Friends) {
    res.status(200).json(JSON.stringify(Friends));
  } else {
    res.status(404).json("sory friends not fount");
  }
}
module.exports = {
  getFriends,
  postFriend,
  getOneFriend,
};
