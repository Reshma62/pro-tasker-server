const { addTaskService } = require("../services/task.service");

exports.AddTaskController = async (req, res) => {
  try {
    const { id } = req?.user;
    const { title, description } = req.body;
    const data = {
      title,
      description,
      userId: id,
    };
    const addTask = await addTaskService(data);

    res.status(200).json({
      status: "success",
      message: "Task added successfully",
      data: addTask,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "Internal server error",
    });
  }
};
