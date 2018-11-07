const User = require("../../models/UserModel"); //Model
const hash = require("pbkdf2");
const jwt = require("jsonwebtoken");

const userLogin = async (req,res) => {
    try {

    }
    catch(err){
        res.status(401).send(err.message)
    }
}
