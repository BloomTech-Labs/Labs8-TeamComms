const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");

mongoose
  .connect("mongodb://localhost/Testdb")
  .then(() => console.log("**Connected to Mongo**"))
  .catch(err => console.log(err.message));

const server = express();

server.use(express.json());
server.use(morgan("dev"));
server.use(helmet());

server.use("/api", apiRoutes);




const port = 3300;
server.listen(port, function() {
  console.log(
    `\n=== Web API Listening on http://localhost:${port}... *.* ===\n`
  );
});
