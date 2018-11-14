const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const passportSetup = require("./services/passport-setup");

const apiRoutes = require("./routes/apiRoutes");

// const whitelist = [
//   "https://team-comm.netlify.com/",
//   "http://localhost:3000/",
//   "*"
// ];

// const corsOptions = {
//   origin: function(origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   }
// };

mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    process.env.MONGOLAB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("**Connected to Mongo**"))
  .catch(err => console.log(err.message));

const server = express();

server.use(cors());
server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(passport.initialize());

server.use("/api", apiRoutes);

const port = 3300;
server.listen(process.env.PORT || port, function() {
  console.log(
    `\n=== Web API Listening on http://localhost:${port}... *.* ===\n`
  );
});

module.exports = server;
