const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const stripeRoutes = require("./stripeRoutes");
const passport = require("passport");
const convoRoutes = require('./convoRoutes');

const router = express.Router();

router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/stripe", stripeRoutes);
router.use("/meeting", passport.authenticate('jwt',{session: false}), convoRoutes);

module.exports = router;
