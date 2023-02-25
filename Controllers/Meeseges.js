const path = require("path");

function getMeeseger(req, res) {
  const photoFromFriends = path.join(
    __dirname,
    "../public/image/skimountain.jpg"
  );
  res.sendFile(photoFromFriends);
}
function postMessege(req, res) {
  console.log("Updating messages...");
  res.send("<ul><li>Loading.....</li></ul>");
}
module.exports = {
  getMeeseger,
  postMessege,
};
