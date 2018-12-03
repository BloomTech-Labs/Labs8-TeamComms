const express = require("express");
const Router = express.Router();

const hlpr = require("../helpers/ConvoHelpers/_ConvoModules");

Router.route("/create").post(hlpr.convoCreate);

Router.route("/update/:id").put(hlpr.convoUpdate);

Router.route("/retrieve").get(hlpr.convoRetrieve);

Router.route("/findbyid/:id").get(hlpr.convoFindById);

module.exports = Router;
