const Project = require("../models/projectmodels");
const User = require("../models/userModels");
const { completedTasksCount, pendingTasksCount } = require("./taskControllers");

const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({
      userId: req.user.id,
    });

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const createProject = async (req, res) => {
  try {
    console.log("req.user:", req.user);

    const user = await User.findById(req.user.id);
    console.log("user:", user);

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
      userId: user._id,
    });

    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      message: err.message,
    });
  }
};

const updateProject = async (req, res) => {
  await Project.findByIdAndUpdate(req.params.id, req.body);

  res.json({
    message: "Project Updated",
  });
};

const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const numberOfProjects = async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments({
      userId: req.user.id,
    });

    res.status(200).json({
      totalProjects,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  numberOfProjects,
};
