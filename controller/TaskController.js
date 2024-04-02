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
  // return res.send("Hello World");
  try {
    const id = req?.user?._id;
    console.log(id);
    const page = parseInt(req.query.page); //2
    const size = parseInt(req.query.size); //5
    let skip = page * size;
    let query = {};
    if (req?.user) {
      query = { userId: id };
    }
    // filter any field  from the request body like userId or any field
    for (const key in req.query) {
      if (req.query.hasOwnProperty(key) && key !== "page" && key !== "size") {
        query[key] = req.query[key];
      }
    }
    const getTasks = await getTaskService(query, skip, size);

    res.status(200).json({
      status: "success",
      message: "Get data successfully",
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
