const express = require("express");

const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const stripeRoutes = require("./stripeRoutes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/stripe", stripeRoutes);
// router.use("/convo", convoRoutes);

module.exports = router;
