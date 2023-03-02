const requeest = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconect } = require("../../utils/mongoDB");
const { loadPlanetData } = require("../../models/planets.model");

describe("Test Get /planets", () => {
  beforeAll(async () => {
    await mongoConnect();
    await loadPlanetData();
  });
  afterAll(async () => {
    await mongoDisconect();
  });
  test("it should response with 200 success", async () => {
    // const response =
    await requeest(app).get("/v1/planet").expect(200);
  });
});
