const { arrayAllPlanets } = require("../../models/planets.model");
async function getAllPlanets(req, res) {
  return res.status(200).json(await arrayAllPlanets());
}
module.exports = getAllPlanets;
