const User = require("../../models/UserModel"); //Model
const hash = require("pbkdf2");
const jwt = require("jsonwebtoken");

const secret = "12345";
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
const userLogin = async (req, res) => {
  const creds = req.body;
  try {
    creds.password = hash
      .pbkdf2Sync(creds.password, "salt", 8, 20, "sha256")
      .toString("hex");

    const user = await User.findOne({
      username: creds.username,
      password: creds.password
    });

    if (!user) {
      throw new Error("Invalid Credentials");
    } else {
      res.send(generateToken(user));
    }
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = userLogin;
