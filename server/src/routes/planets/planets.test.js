const requeest = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconect } = require("../../utils/mongoDB");

describe("Test Get /planets", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconect();
  });
  test("it should response with 200 success", async () => {
    // const response =
    await requeest(app).get("/planet").expect(200);
  });
});
