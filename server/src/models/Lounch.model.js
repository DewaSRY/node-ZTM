const launches = new Map();
let letLastFlightNumber = 100;
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
launches.set(launch.flightNumber, launch);

function arrayAllLaunches() {
  return Array.from(launches.values());
}
function addNewLaunch(launch) {
  letLastFlightNumber++;
  launches.set(
    letLastFlightNumber,
    Object.assign(launch, {
      flightNumber: letLastFlightNumber,
      customer: ["NASA", "ZTM"],
      upcoming: true,
      success: true,
    })
  );
}
function existsLaunchWithId(launchId) {
  return launches.has(launchId);
}
function abortLaunchById(launchId) {
  const abort = launches.get(launchId);
  abort.upcoming = false;
  abort.success = false;
  return abort;
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
