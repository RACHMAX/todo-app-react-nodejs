const TaskModel = require("../models/taskModel");

// Get all tasks
exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await TaskModel.getAllTasks();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all tasks by a user ID
exports.getTasksByUserId = async (req, res) => {
  try {
    const userId = req.user.id; // from auth middleware
    const tasks = await TaskModel.getTasksByUserId(userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.getTaskById(id);

    if (!task || task.user_id !== req.user.id) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tasks under a creation date range
exports.getTasksByDateRange = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const userId = req.user.id;

    const tasks = await TaskModel.getTasksByDateRange(userId, startDate, endDate);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET completed tasks for authenticated user
exports.getCompletedTasksByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    const tasks = await TaskModel.getCompletedTasksByUserId(userId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tasks by category for a user
exports.getTasksByCategory = async (req, res) => {
  try {
    const userId = req.user.id;
    const { categoryId } = req.params;

    const tasks = await TaskModel.getTasksByCategory(userId, categoryId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get tasks by priority for a user
exports.getTasksByPriority = async (req, res) => {
  try {
    const userId = req.user.id;
    const { priorityId } = req.params;

    const tasks = await TaskModel.getTasksByPriority(userId, priorityId);
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a new task for authenticated user
exports.createTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const taskData = { ...req.body, user_id: userId };
    const newTaskId = await TaskModel.createTask(taskData);
    res.status(201).json({ message: "Task created", taskId: newTaskId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update a task (must belong to user)
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.getTaskById(id);

    if (!task || task.user_id !== req.user.id) {
      return res.status(404).json({ error: "Task not found" });
    }

    await TaskModel.updateTask(id, req.body);
    res.status(200).json({ message: "Task updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a task (must belong to user)
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.getTaskById(id);

    if (!task || task.user_id !== req.user.id) {
      return res.status(404).json({ error: "Task not found" });
    }

    await TaskModel.deleteTask(id);
    res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE all tasks for authenticated user
exports.deleteAllTasksByUserId = async (req, res) => {
  try {
    const userId = req.user.id;
    await TaskModel.deleteAllTasksByUserId(userId);
    res.status(200).json({ message: "All tasks deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
