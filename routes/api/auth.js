const express = require("express");

const _ = express.Router();

_.post("/registation");
_.post("/login");
_.get("/getAuthUser");
_.post("/create-token");

module.exports = _;
