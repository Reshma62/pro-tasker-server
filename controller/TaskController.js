const { ObjectId } = require("mongodb");
const {
  addTaskService,
  getTaskService,
  updateTaskService,
  deleteTaskService,
  getTaskByIdService,
} = require("../services/task.service");
// add task
exports.AddTaskController = async (req, res) => {
  try {
    const { id } = req?.user;
    const { userId } = req?.query;
    if (id !== userId) {
      return res.json({
        status: "fail",
        message: "Unathoured access",
        // data: addTask,
      });
    }
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

// get tasks
exports.GetTasksController = async (req, res) => {
  try {
    const id = req?.user?._id;

    const { userId } = req?.query;

    console.log(userId, "============", id);

    // Comparing ObjectIds
    if (id.toString() !== userId.toString()) {
      return res.json({
        status: "fail",
        message: "Unauthorized access",
      });
    }

    const page = parseInt(req.query.page) || 0;
    const size = parseInt(req.query.size) || 10;
    let skip = page * size;
    let query = {};
    if (req?.user) {
      query = { userId: id };
    }
    // filter any field from the request body like userId or any field
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key) && key !== "page" && key !== "size") {
        query[key] = req.query[key];
      }
    }
    const getTasks = await getTaskService(query, skip, size);

    res.status(200).json({
      status: "success",
      message: "Data retrieved successfully",
      data: getTasks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "Internal server error",
    });
  }
};

// get task by id

exports.GetTaskByIdController = async (req, res) => {
  try {
    const { id } = req?.params;

    const singleTask = await getTaskByIdService(id);
    res.status(200).json({
      status: "success",
      message: "Get  data By id",
      data: singleTask,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "Internal server error",
    });
  }
};
// Update tasks

exports.UpdateTasksController = async (req, res) => {
  try {
    const { id } = req?.params;
    const { title, description, status } = req.body;
    const data = { title, description, status };
    const updateTasks = await updateTaskService(id, data);

    res.status(200).json({
      status: "success",
      message: "data updated successfully",
      data: updateTasks,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "Internal server error",
    });
  }
};

// delete tasks

exports.DeleteTasksController = async (req, res) => {
  try {
    const { id } = req?.params;
    const deleteTask = await deleteTaskService(id);

    res.status(200).json({
      status: "success",
      message: "Data delete successfully",
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message || "Internal server error",
    });
  }
};
