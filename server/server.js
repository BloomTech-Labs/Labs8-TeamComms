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

// server.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

//   //intercepts OPTIONS method
//   if ('OPTIONS' === req.method) {
//     //respond with 200
//     res.sendStatus(200);
//   }
//   else {
//   //move on
//     next();
//   }
// });

server.use(cors());
server.options("*", cors());

// server.options(
//   "*",
//   cors({
//     origin: "http://localhost:3000",
//     optionsSuccessStatus: 200,
//     credentials: false,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: [
//       "Content-Type",
//       "x-access-token",
//       "Authorization",
//       "Origin",
//       "X-Requested-With",
//       "Accept"
//     ]
//   })
// );

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
