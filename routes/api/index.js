const express = require("express");
const _ = express.Router();

const authentication = require("./auth.js");
const tasks = require("./task.js");

_.use("/auth", authentication);
_.use("/task", tasks);

module.exports = _;
