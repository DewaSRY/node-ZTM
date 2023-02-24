const { parse } = require("csv-parse");
const fs = require("fs");

const confirmPlaned = [];

function ishabitablePlanet(planet) {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] < 1.11 &&
    planet["koi_prad"] < 1.6
  );
}
fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (data) => {
    if (ishabitablePlanet(data)) {
      confirmPlaned.push(data);
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(confirmPlaned);
    console.log(confirmPlaned.length, "was good enought");
    for (planet of confirmPlaned) {
      console.log(planet["kepler_name"]);
    }
    console.log("done");
  });
