const http = require("http");
const app = require("./app");
const { loadPlanetData } = require("./models/planets.model");
const { mongoConnect } = require("./utils/mongoDB");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await mongoConnect();
  await loadPlanetData();
  server.listen(PORT, () => {
    console.log(`listening on ${PORT}...`);
  });
}
startServer();
