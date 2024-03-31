const express = require("express");
const {
  RegisterController,
  LoginController,
} = require("../../controller/AuthController");

const _ = express.Router();
_.get("/getAuthUser");
_.post("/signup", RegisterController);
_.post("/login", LoginController);

_.post("/create-token");

module.exports = _;
