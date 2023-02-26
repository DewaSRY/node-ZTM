const {
  arrayAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/Lounch.model");

function getAllLaunches(req, res) {
  return res.status(200).json(arrayAllLaunches());
}

function postAddnewLaunch(req, res) {
  const launch = req.body;
  if (!launch.mission || !launch.rocket || !launch.target || !launch.launchDate)
    return res.status(400).json({
      error: "Missing required launch property",
    });

  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    // || launch.launchDate < new Date(Date.now()) add it and get frustration
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }

  addNewLaunch(launch);
  return res.status(201).json(launch);
}
function deleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!existsLaunchWithId(launchId)) {
    return res.status(404).json({
      error: "Launch not Found",
    });
  }
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  getAllLaunches,
  postAddnewLaunch,
  deleteLaunch,
};
// "mission":"ZTM55",
// "rocket":"ZTM Experimental IS1",
// "destination":"Kepler-186 f dewa",
// "launchDate":"Febuary 17, 2030"
