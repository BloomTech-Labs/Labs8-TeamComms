const server = require("../server");
const mongoose = require("mongoose");
const request = require("supertest");

describe("userRegister", () => {
  it("Post: Does not work if all fields aren't filled out", done => {
    let data = {
      username: "jim",
      password: "hello",
      phone_number: "6198882517",
      email: "test@gmail.com"
    };
    request(server)
      .post("/api/users")
      .send(data)
      .expected(401);
  });
});
describe("userGet", () => {
  it("Get: Returns 404 if user doesn't exist", done => {
    request(server)
      .get("/api/users")
      .expected(404, done);
  });
});
