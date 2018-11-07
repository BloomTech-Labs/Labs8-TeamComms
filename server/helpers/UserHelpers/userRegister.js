const User = require("../../models/UserModel"); //Model
const hash = require("pbkdf2");
const jwt = require("jsonwebtoken");

const secret = "12345";
let jwt_id = 8728391;

function generateToken(user) {
  const payload = {
    username: user.username,
    id: user._id
  };

  const options = {
    expiresIn: "24h",
    jwtid: (jwt_id++).toString()
  };

  return jwt.sign(payload, secret, options);
}

const userRegister = async (req, res) => {
  try {
    const user = new User(req.body); //document instance
    user.password = hash
      .pbkdf2Sync(user.password, "salt", 8, 20, "sha256")
      .toString("hex");

    await user.save();

    res.status(200).send(generateToken(user));
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = userRegister;
