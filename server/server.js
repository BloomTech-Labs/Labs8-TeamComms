const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
var express = require("express");
dotenv.config();
const passport = require("passport");
const passportSetup = require("./services/passport-setup");
const apiRoutes = require("./routes/_apiRoutes");

const server = express();
let allowedOrigins = ["http:/localhost:3000", "https://team-comm.netlify.com/"];

// var corsOptions = {
//   origin: function (origin, callback) {
//     if (allowedOrigins.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
server.use(cors());
server.options("*", cors());
server.use(function(req, res, next) {

  var origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  next();
});
let app = server.listen(process.env.PORT || 8080, () => {
  console.log(`\n=== Web API Listening on http://localhost:8080... *.* ===\n`);
});

// SocketIo handlers
let io = require("socket.io").listen(app);
let ioHandler = require("./services/socketio")(io);

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());
server.use(passport.initialize());

mongoose.set("useCreateIndex", true);
mongoose
  .connect(
    process.env.MONGOLAB_URL,
    { useNewUrlParser: true }
  )
  .then(() => console.log("**Connected to Mongo**"))
  .catch(err => console.log(err.message));

server.use("/api", apiRoutes);

module.exports = server;
