const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./validation/ErrorHandling/errorHandler");
var express = require("express");
dotenv.config();
const passport = require("passport");
const passportSetup = require("./services/passport-setup");
const apiRoutes = require("./routes/_apiRoutes");

const server = express();

server.use(cors());
server.options("*", cors());
let app;
if (process.env.NODE_ENV !== "test") {
  app = server.listen(process.env.PORT || 8080, () => {
    console.log(
      `\n=== Web API Listening on http://localhost:8080... *.* ===\n`
    );
  });
}
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
server.use(errorHandler);

module.exports = server;
