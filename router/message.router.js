const { Router } = require("express");

const { postMessege, getMeeseger } = require("../Controllers/Meeseges");

const messagerouter = Router();

messagerouter.get("/", getMeeseger).post("/", postMessege);
module.exports = messagerouter;
