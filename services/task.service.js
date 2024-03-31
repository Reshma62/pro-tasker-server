const Task = require("../models/task.model");

exports.addTaskService = async (data) => {
  const result = await new Task(data).save();
  return result;
};
exports.getTaskService = async (data) => {
  const result = await Task.find();
  return result;
};
