const axios = require("axios");
const mongoLaunches = require("./Lounch.mongo");
const planets = require("./planets.mongo");

let LATES_LAST_NUMBER = 100;
const SPACEX_API_URL = "https://api.spacexdata.com/v4/launches/query";

// const launch = {
//   mission: "Find new Eart", //name
//   rocket: "Explorer IS1", //rocket.name
//   launchDate: new Date("December 27 ,2035"), //date_local
//   target: "kepler-442 b", //not Aplicable
//   customer: ["NASA", "ZTM"], //payload.customers for each payload
//   upcoming: true, //upcoming
//   success: true, //success
// };
// saveLaunce(launch);

async function populateLaunceFromSpaceX() {
  const response = await axios.post(SPACEX_API_URL, {
    query: {},
    options: {
      pagination: false,
      populate: [
        {
          path: "rocket",
          select: {
            name: 1,
          },
        },
        {
          path: "payloads",
          select: {
            customers: 1,
          },
        },
      ],
    },
  });
  if (response.status !== 200) {
    console.log("Problem when launch data");
    throw new Error("Launch data faild");
  }
  const launchDocs = response.data.docs;
  for (const launchDoc of launchDocs) {
    const payloads = launchDoc["payloads"];
    const customers = payloads.flatMap((payload) => {
      return payload["customers"];
    });
    const launch = {
      flightNumber: launchDoc["flight_number"],
      mission: launchDoc["name"],
      rocket: launchDoc["rocket.name"],
      launchDate: launchDoc["date_local"],
      // target: launchDoc["not Aplicable"], //
      customer: customers, //
      upcoming: launchDoc["upcoming"],
      success: launchDoc["success"],
    };
    console.log(`${launch.flightNumber} ${launch.mission}`);
    await saveLaunce(launch);
  }
}
async function findLaunch(filter) {
  return await mongoLaunches.findOne(filter);
}
async function existsLaunchWithId(launchId) {
  return await findLaunch({
    flightNumber: launchId,
  });
}

async function loadLaunchData() {
  const firstLaunchDataCheck = await findLaunch({
    flightNumber: 1,
  });
  if (firstLaunchDataCheck) {
    return console.log("Data alredy Dowenload");
  } else {
    console.log("Dowenload Launch data.....");
    await populateLaunceFromSpaceX();
  }
}

async function arrayAllLaunches(skip, limit) {
  return await mongoLaunches
    .find({})
    .sort("flightNumber")
    /*
      OR Use .sort({
        flightNumber:1
    })  To get sorting value
    */

    .skip(skip)
    .limit(limit);
}

async function addNewLaunch(launch) {
  const planet = planets.find({
    kepler_name: data.target,
  });
  if (!planet) {
    throw new Error("No Maching Planet was found");
  } else {
    const newFlightNumber = (await getLatesFlightNumber()) + 1;
    const newLaunch = Object.assign(launch, {
      flightNumber: newFlightNumber,
      customer: ["NASA", "ZTM"],
      upcoming: true,
      success: true,
    });
    await saveLaunce(newLaunch);
  }
}
async function saveLaunce(data) {
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
async function getLatesFlightNumber() {
  const latesLaucnch = await mongoLaunches.findOne().sort("-flightNumber");
  if (!latesLaucnch) {
    return LATES_LAST_NUMBER;
  }
  return latesLaucnch.flightNumber;
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
  loadLaunchData,
};
