const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares")

const router = express.Router();

const {getTasks,createTask,updateTask,deleteTask,numberOfTasks,pendingTasksCount,completedTasksCount} = require("../controllers/taskControllers")

router.get("/", authMiddleware, getTasks);

router.post("/", authMiddleware, createTask);

router.put("/:id",authMiddleware, updateTask)

router.delete("/:id",authMiddleware, deleteTask)
router.get("/count", authMiddleware, numberOfTasks);
router.get("/pending", authMiddleware, pendingTasksCount)
router.get("/completed", authMiddleware, completedTasksCount);

module.exports = router;