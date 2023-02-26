const { arrayAllPlanets } = require("../../models/planets.model");
function getAllPlanets(req, res) {
  return res.status(200).json(arrayAllPlanets());
}
module.exports = getAllPlanets;
