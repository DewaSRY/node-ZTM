const mongoLaunches = require("./Lounch.mongo");
const planets = require("./planets.mongo");
const launches = new Map();
let LATES_LAST_NUMBER = 100;
const launch = {
  flightNumber: 100,
  mission: "kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27 ,2030"),
  target: "kepler-442 b",
  customer: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};
saveLaunce(launch);
async function arrayAllLaunches() {
  return await mongoLaunches.find({});
}

async function addNewLaunch(launch) {
  const newFlightNumber = (await getLatesFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    flightNumber: newFlightNumber,
    customer: ["NASA", "ZTM"],
    upcoming: true,
    success: true,
  });
  await saveLaunce(newLaunch);
}
async function saveLaunce(data) {
  const planet = planets.find({
    kepler_name: data.target,
  });
  if (!planet) {
    throw new Error("No Maching Planet was found");
  } else {
    await mongoLaunches.findOneAndUpdate(
      {
        flightNumber: data.flightNumber,
      },
      data,
      {
        upsert: true,
      }
    );
  }
}
async function getLatesFlightNumber() {
  const latesLaucnch = await mongoLaunches.findOne().sort("-flightNumber");
  if (!latesLaucnch) {
    return LATES_LAST_NUMBER;
  }
  return latesLaucnch.flightNumber;
}

async function existsLaunchWithId(launchId) {
  return await mongoLaunches.findOne({
    flightNumber: launchId,
  });
}
async function abortLaunchById(launchId) {
  const abort = await mongoLaunches.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );
  return abort.modifiedCount === 1;
}

module.exports = {
  arrayAllLaunches,
  addNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};

// console.log(JSON.stringify(launches));
// console.log(arrayAllLaunches());

// console.log(Array.from(launches.values()));
