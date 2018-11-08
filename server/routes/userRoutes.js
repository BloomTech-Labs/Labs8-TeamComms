const express = require("express");
const Router = express.Router();

const hlpr = require("../helpers/UserHelpers/UserModules");

// @route   /api/users/
// @desc    Add, Remove, Edit

/*
    Route - /api/users/register
    Req - username, password, email, phone_number, organization(optional)
    Res - Token, {username, email, phone_number, organization} 
*/
Router.route("/register").post(hlpr.userRegister);
/*
    Route - /api/users/login
    Req - username, password,
    Res - Token, {username, email, phone_number, organization} 
*/
Router.route("/login").post(hlpr.userLogin);
/*
    Route - /api/users/edit
    Req - (All Optional) username, password, email, phone_number, organization
    Res - Token, {username, email, phone_number, organization} 
*/
Router.route("/edit").put(hlpr.userEdit);

module.exports = Router;
