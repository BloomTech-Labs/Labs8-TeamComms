const hash = require("pbkdf2");

const hashedPassword = password => {
  return hash.pbkdf2Sync(password, "salt", 8, 20, "sha256").toString("hex");
};

module.exports = hashedPassword;