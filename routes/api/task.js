const express = require("express");
const verifiToken = require("../../middleware/verifiToken");
const {
  AddTaskController,
  GetTasksController,
  UpdateTasksController,
  DeleteTasksController,
} = require("../../controller/TaskController");

const _ = express.Router();

_.post("/addTasks", verifiToken, AddTaskController);
_.get("/getTasks", verifiToken, GetTasksController);
_.patch("/updateById/:id", UpdateTasksController);
_.delete("/deleteById/:id", DeleteTasksController);

module.exports = _;
