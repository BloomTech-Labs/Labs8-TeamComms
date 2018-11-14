const express = require("express");
const Router = express.Router();

const hlpr = require("../helpers/UserHelpers/UserModules");

// @route   /api/users/
// @desc    Add, Remove, Update

//TODO -- Have user is_active checks

/*
    Route - /api/users/register
    Req -  familyName, givenName, password, email
    Res - Token, {displayName, name, email, phone_number, organization} 
*/
Router.route("/register").post(hlpr.userRegister);

/*
    Route - /api/users/login
    Req - email, password
    Res - Token, {username, email, phone_number, organization} 
*/
Router.route("/login").post(hlpr.userLogin);

/*
    Route - /api/users/update
    Req - username, email, phone_number, oldPw, newPw
    Res - Token, {username, email, phone_number, organization} 
*/
Router.route("/update").put(hlpr.userEdit);

module.exports = Router;
