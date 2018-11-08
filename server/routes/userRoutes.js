const express = require("express");
const Router = express.Router();

const hlpr = require("../helpers/UserHelpers/UserModules");

// @route   /api/users
// @desc    Add, Remove, Edit

Router.route("/").get(hlpr.userGetAll);
Router.route("/register").post(hlpr.userRegister);
Router.route("/login").post(hlpr.userLogin);
Router.route("/edit").put(hlpr.userEdit);

//put == findbyidandupdate(id, new info)

module.exports = Router;
