const express = require("express");
const Router = express.Router();


const hlpr = require('../helpers/ConvoHelpers/_ConvoModules');


Router.route('/create').post(hlpr.convoCreate);

module.exports = Router;
