const requeest = require("supertest");

const compliteLauncheData = {
  mission: "ZTM55",
  rocket: "ZTM Experimental IS1",
  target: "Kepler-186 f dewa",
  launchDate: "August 17, 2023",
};
const compliteLauncheDataWithoutDate = {
  mission: "ZTM55",
  rocket: "ZTM Experimental IS1",
  target: "Kepler-186 f dewa",
};
const reciveLauncheData = {
  mission: "ZTM55",
  rocket: "ZTM Experimental IS1",
  target: "Kepler-186 f dewa",
  launchDate: "2023-08-16T16:00:00.000Z",
  flightNumber: 101,
  customer: ["NASA", "ZTM"],
  upcoming: true,
  success: true,
};

const app = require("../../app");
describe("Test Get /launches", () => {
  test("it should response with 200 success", async () => {
    // const response =
    await requeest(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("test POST /launch", () => {
  test("it should send laounc and response with 201 success", async () => {
    const response = await requeest(app)
      .post("/launches")
      .send(compliteLauncheData)
      .expect("Content-Type", /json/)
      .expect(201);
    expect(response.body).toMatchObject(reciveLauncheData);
    expect(response.body).toMatchObject(compliteLauncheDataWithoutDate);
  });
  test("It should catch missing require propertis", async () => {
    const response = await requeest(app)
      .post("/launches")
      .send(compliteLauncheDataWithoutDate)
      .expect(400)
      .expect("Content-Type", /json/);
    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });
  test("It should catch invalid dates", async () => {
    const response = await requeest(app)
      .post("/launches")
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
    const response = await requeest(app)
      .delete("/launches/100")
      .expect("Content-Type", /json/)
      .expect(200);
  });
  test("It should tyray to delete and invalid", async () => {
    const response = await requeest(app)
      .delete("/launches/1")
      .expect("Content-Type", /json/)
      .expect(404);
    expect(response.body).toStrictEqual({
      error: "Launch not Found",
    });
  });
});
