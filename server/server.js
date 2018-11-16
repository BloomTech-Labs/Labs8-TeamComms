const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
var express = require("express");
dotenv.config();
const passport = require("passport");
const passportSetup = require("./services/passport-setup");

var app = express();
const socketapp = require("http").Server(app);
var io = require("socket.io")(socketapp);

const server = express();

io.on("connection", function(socket) {
  console.log("New client connected, id " + socket.id);

  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on("change color", color => {
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log("Color Changed to: ", color);
    io.sockets.emit("change color", color);
  });
  let tempArray = [];
  socket.on("update text", text => {
    tempArray.push(text);
    console.log(text);
    // once we get a 'change color' event from one of our clients, we will send it to the rest of the clients
    // we make use of the socket.emit method again with the argument given to use from the callback function above
    console.log("Document updated with: ", text);
    io.sockets.emit("update text", text);
  });

  // disconnect is fired when a client leaves the server
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

socketapp.listen(8080, function() {
  console.log(`\n=== SocketIO Listening on http://localhost:8080... *.* ===\n`);
});

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
