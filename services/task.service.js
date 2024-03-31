const Task = require("../models/task.model");

exports.addTaskService = async (data) => {
  const result = await new Task(data).save();
  return result;
};
exports.getTaskService = async (query, skip, size) => {
  const result = await Task.find(query)
    .populate("userId", "name email")
    .skip(skip)
    .limit(size);
  return result;
};
exports.updateTaskService = async (id, data) => {
  const result = await Task.findByIdAndUpdate(id, data, { new: true }); //return the updated document
  return result;
};
exports.deleteTaskService = async (id) => {
  const result = await Task.findByIdAndDelete(id);
  return result;
};
