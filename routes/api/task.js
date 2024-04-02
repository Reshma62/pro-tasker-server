const express = require("express");
const verifiToken = require("../../middleware/verifiToken");
const {
  AddTaskController,
  GetTasksController,
  UpdateTasksController,
  DeleteTasksController,
  GetTaskByIdController,
} = require("../../controller/TaskController");

const _ = express.Router();

_.post("/addTasks", verifiToken, AddTaskController);
_.get("/getTasks", GetTasksController);
_.get("/test", GetTasksController);
_.get("/getTasksById/:id", verifiToken, GetTaskByIdController);
_.patch("/updateById/:id", verifiToken, UpdateTasksController);
_.delete("/deleteById/:id", verifiToken, DeleteTasksController);

module.exports = _;
