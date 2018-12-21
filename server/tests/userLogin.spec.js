const server = require("../server");
const mongoose = require("mongoose");
const request = require("supertest");

describe("User Login", () => {
  beforeAll(done => {
    request(server)
      .post("/api/users/register")
      .send({
        familyName: "doe",
        givenName: "john",
        email: "john@doe.com",
        password: "pass"
      })
      .end(() => done());
  });

  afterAll(done => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  it("POST: Does NOT work without all required fields", async () => {
    const res = await request(server)
      .post("/api/users/login")
      .send({ email: "john@doe.com" });
    expect(res.status).toBe(500);
  });

  it("POST: Does work with all required fields", async () => {
    const res = await request(server)
      .post("/api/users/login")
      .send({ email: "john@doe.com", password: "pass" });
    expect(res.status).toBe(200);
  });

  it("POST: Does NOT work if login is incorrect", async () => {
    const res = await request(server)
      .post("/api/users/login")
      .send({ email: "billy@bob.com", password: "pass" });
    expect(res.status).toBe(401);
  });
});
