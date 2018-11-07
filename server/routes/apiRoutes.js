const express = require("express");
const userRoutes = require("./userRoutes");

const router = express.Router();

router.use("/users", userRoutes);
// router.use("/convo", convoRoutes);

module.exports = router;
