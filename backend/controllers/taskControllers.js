const Task = require("../models/taskModels");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({
      userId: req.user.id,
    });

    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      priority: req.body.priority,
      status: req.body.status,
      dueDate: req.body.dueDate,
      userId: req.user.id,
    });

    await task.save();

    res.status(201).json(task);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const updateTask = async (req, res) => {
  await Task.findByIdAndUpdate(req.params.id, req.body);

  res.json({
    message: "Task Updated",
  });
};

const deleteTask = async (req, res) => {
  try {
    console.log("Task ID:", req.params.id);
    console.log("User:", req.user);

    const task = await Task.findOne({
      _id: req.params.id,
    });

    console.log("Task Found:", task);

    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    console.log("Deleted:", deletedTask);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json({
      message: "Task deleted successfully",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const numberOfTasks = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({
      userId: req.user.id,
    });

    res.status(200).json({
      totalTasks,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const pendingTasksCount = async (req, res) => {
  try {
    const pendingTasks = await Task.countDocuments({
      userId: req.user.id,
      status: "Pending",
    });

    res.status(200).json({
      pendingTasks,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const completedTasksCount = async (req, res) => {
  try {
    const completedTasks = await Task.countDocuments({
      userId: req.user.id,
      status: "Completed",
    });

    res.status(200).json({
      completedTasks,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  numberOfTasks,
  pendingTasksCount,
  completedTasksCount,
};
