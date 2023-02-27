const requeest = require("supertest");
const app = require("../../app");

describe("Test Get /planets", () => {
  test("it should response with 200 success", async () => {
    // const response =
    await requeest(app).get("/planet").expect(200);
  });
});
