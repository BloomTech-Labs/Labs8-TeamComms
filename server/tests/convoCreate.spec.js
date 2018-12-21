const server = require("../server");
const mongoose = require("mongoose");
const request = require("supertest");

let token;

describe("Convo Create", () => {
  beforeAll(done => {
    request(server)
      .post("/api/users/register")
      .send({
        familyName: "doe",
        givenName: "john",
        email: "john@doe.com",
        password: "pass"
      })
      .then(response => {
        token = response.body.token;
        done();
      });
  });

  afterAll(done => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  it("POST: Does NOT work without all required fields", async () => {
    const res = await request(server)
      .post("/api/meeting/create")
      .set("Authorization", token)
      .send({ title: "Fail Meeting" });
    expect(res.status).toBe(400);
  });
  it("POST: Does NOT work without all required fields", async () => {
    const res = await request(server)
      .post("/api/meeting/create")
      .set("Authorization", token)
      .send({ description: "Fail Meeting" });
    expect(res.status).toBe(400);
  });
  it("POST: Does NOT work without questions, needs to be empty array", async () => {
    const res = await request(server)
      .post("/api/meeting/create")
      .set("Authorization", token)
      .send({
        title: "Successful Meeting",
        description: "Will be success",
        startTime: "2018-12-15T09:30:50.726Z",
        endTime: "2020-12-16T13:30Z"
      });
    expect(res.status).toBe(500);
  });
  it("POST: Does NOT work without token", async () => {
    const res = await request(server)
      .post("/api/meeting/create")
      .send({ title: "Fail Meeting" });
    expect(res.status).toBe(401);
  });

  it("POST: Does work with all required fields", async () => {
    const res = await request(server)
      .post("/api/meeting/create")
      .set("Authorization", token)
      .send({
        title: "Successful Meeting",
        description: "Will be success",
        startTime: "2018-12-15T09:30:50.726Z",
        endTime: "2020-12-16T13:30Z",
        questions: ["Test Question"]
      });
    expect(res.status).toBe(201);
  });
});
