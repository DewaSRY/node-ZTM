const app = require("../../app");
const { mongoConnect, mongoDisconect } = require("../../utils/mongoDB");
const requeest = require("supertest");

const compliteLauncheData = {
  mission: "ZTM55",
  rocket: "ZTM Experimental IS1",
  target: "Kepler-62 f",
  launchDate: "August 17, 2023",
};
const compliteLauncheDataWithoutDate = {
  mission: "ZTM55",
  rocket: "ZTM Experimental IS1",
  target: "Kepler-62 f",
};
const reciveLauncheData = {
  mission: "ZTM55",
  rocket: "ZTM Experimental IS1",
  target: "Kepler-62 f",
  launchDate: "2023-08-16T16:00:00.000Z",
  customer: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};
const stateEndPoint = "/v1/launches";
describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconect();
  });
  describe("Test Get /launches", () => {
    test("it should response with 200 success", async () => {
      // const response =
      await requeest(app)
        .get(stateEndPoint)
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("test POST /launch", () => {
    test("it should send laounc and response with 201 success", async () => {
      const response = await requeest(app)
        .post(stateEndPoint)
        .send(compliteLauncheData)
        .expect("Content-Type", /json/)
        .expect(201);
      expect(response.body).toMatchObject(reciveLauncheData);
      expect(response.body).toMatchObject(compliteLauncheDataWithoutDate);
    });
    test("It should catch missing require propertis", async () => {
      const response = await requeest(app)
        .post(stateEndPoint)
        .send(compliteLauncheDataWithoutDate)
        .expect(400)
        .expect("Content-Type", /json/);
      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
    test("It should catch invalid dates", async () => {
      const response = await requeest(app)
        .post(stateEndPoint)
        .send({
          mission: "ZTM55",
          rocket: "ZTM Experimental IS1",
          target: "Kepler-186 f dewa",
          launchDate: "hallo",
        })
        .expect(400)
        .expect("Content-Type", /json/);
      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
  describe("test DELETE /launch", () => {
    test("It should tyray to delete", async () => {
      // const response =
      await requeest(app)
        .delete(`${stateEndPoint}/100`)
        .expect("Content-Type", /json/)
        .expect(200);
    });
    test("It should tyray to delete and invalid", async () => {
      const response = await requeest(app)
        .delete(`${stateEndPoint}/0001`)
        .expect("Content-Type", /json/)
        .expect(404);
      expect(response.body).toStrictEqual({
        error: "Launch not Found",
      });
    });
  });
});
