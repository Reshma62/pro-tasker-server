const express = require("express");
const verifiToken = require("../../middleware/verifiToken");
const { AddTaskController } = require("../../controller/TaskController");

const _ = express.Router();

_.post("/addTasks", verifiToken, AddTaskController);
_.get("/getTasks");
_.patch("/updateById/:id");
_.delete("/deleteById/:id");

module.exports = _;
