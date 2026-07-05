const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddlewares")

const {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    numberOfProjects
} = require("../controllers/projectControllers");

router.get("/", authMiddleware, getProjects);

router.post("/", authMiddleware, createProject);

router.put("/:id", authMiddleware, updateProject);

router.delete("/:id", authMiddleware, deleteProject);

router.get("/count", authMiddleware, numberOfProjects);

module.exports = router;