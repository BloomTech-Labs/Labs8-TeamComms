const jwt = require("jsonwebtoken");
// const dotenv = require('dotenv').config()
const zoomKey = process.env.ZOOM_KEY;
const zoomSecret = process.env.ZOOM_SECRET;

const generateZoomToken = () => {
  var payload = {
    iss: zoomKey,
    // token valid for 6 seconds for security
    exp: new Date().getTime() + 6000
  };
  const options = {
    noTimestamp: true
  };
  return jwt.sign(payload, zoomSecret, options);
};
module.exports = generateZoomToken;
