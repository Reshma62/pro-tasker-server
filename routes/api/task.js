const express = require("express");

const _ = express.Router();

_.post("/addTasks");
_.get("/getTasks");
_.patch("/updateById/:id");
_.delete("/deleteById/:id");

module.exports = _;
