const server = require("../server");
const mongoose = require("mongoose");
const request = require("supertest");

describe("User Register", () => {

  afterAll(done => {
    mongoose.connection.db.dropDatabase(done);
    mongoose.disconnect();
  });

  it("POST: Does NOT work without all required fields", async () => {
    const res = await request(server)
      .post("/api/users/register")
      .send({ email: "john@doe.com" });
    expect(res.status).toBe(400);
  });
  it("POST: Works with all required fields and returns token", async () => {
    const res = await request(server)
      .post("/api/users/register")
      .send({
        email: "john@doe.com",
        familyName: "doe",
        givenName: "john",
        password: "password"
      });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
