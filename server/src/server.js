const http = require("http");
require("dotenv").config();
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");
const { mongoConnect } = require("./utils/mongoDB");
const { loadLaunchData } = require("./models/Lounch.model");
const PORT = 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetData();
  await loadLaunchData();
  server.listen(PORT, () => {
    console.log(`listening on ${PORT}...`);
  });
}
startServer();
