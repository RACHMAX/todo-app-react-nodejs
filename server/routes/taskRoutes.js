
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authMiddleware = require("../middleware/auth"); // middleware to populate req.user

// Apply auth to all routes below
router.use(authMiddleware);

// GET all tasks (admin/general)
router.get("/", taskController.getAllTasks);

// GET all tasks for authenticated user
router.get("/my-tasks", taskController.getTasksByUserId);

// GET a specific task
router.get("/:id", taskController.getTaskById);

// GET tasks under date range
router.get("/date-range", taskController.getTasksByDateRange);

// GET completed tasks
router.get("/completed", taskController.getCompletedTasksByUserId);

// GET tasks by category
router.get("/category/:categoryId", taskController.getTasksByCategory);

// GET tasks by priority
router.get("/priority/:priorityId", taskController.getTasksByPriority);

// POST create a new task
router.post("/", taskController.createTask);

// PUT update a task
router.put("/:id", taskController.updateTask);

// DELETE a task
router.delete("/:id", taskController.deleteTask);

// DELETE all tasks for authenticated user
router.delete("/", taskController.deleteAllTasksByUserId);

module.exports = router;

