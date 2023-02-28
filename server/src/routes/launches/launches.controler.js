const {
  arrayAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/Lounch.model");

async function getAllLaunches(req, res) {
  return res.status(200).json(await arrayAllLaunches());
}

async function postAddnewLaunch(req, res) {
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
  await addNewLaunch(launch);
  return res.status(201).json(launch);
}
async function deleteLaunch(req, res) {
  const launchId = Number(req.params.id);
  if (!(await existsLaunchWithId(launchId))) {
    return res.status(404).json({
      error: "Launch not Found",
    });
  }
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Failed to delete",
    });
  }
  return res.status(200).json({
    ok: true,
  });
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
