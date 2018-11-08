const server = require("../server");
const mongoose = require("mongoose");
const request = require("supertest");

jest.unmock("mongoose");

describe("SomeTest", () => {
  beforeAll(done => {
    mongoose.connect("mongodb://127.0.0.1:27017/test");

    let db = mongoose.connection;

    db.on("error", err => {
      done.fail(err);
    });

    db.once("open", () => {
      done();
    });
  });

  it("proves that one equals one", () => {
    expect(1).toBe(1);
  });
});

describe("userRegister", function() {
  beforeAll(() => {
    mongoose.connect("mongodb://localhost/Testdb");
  });
  it("Post: Does not work if all fields aren't filled out", async done => {
    let data = {
      username: "jim",
      password: "hello",
      phone_number: 6198882517,
      email: "test@gmail.com"
    };
    const res = await request(server)
      .post("/api/user/register")
      .send(data)
      .set("Accept", "application/json");
    expect(res.status).toEqual(201);
  });
  afterAll(done => {
    mongoose.disconnect(done);
  });
});
// describe("userGet", () => {
//   it("Get: Returns 404 if user doesn't exist", done => {
//     request(server)
//       .get("/api/user")
//       .expect(404);
//   });
// });
