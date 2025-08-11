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
        const { userId } = req.params;
        const taskByUser = await TaskModel.getTasksByUserId(userId);
        res.json(taskByUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a specific task by ID
exports.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const taskById = await TaskModel.getTaskById(id);
        res.json(taskById);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all tasks under a creation date range
exports.getTasksByDateRange = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        const taskByDateRange = await TaskModel.getTasksByDateRange(startDate, endDate);
        res.json(taskByDateRange);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get completed tasks by user ID
exports.getCompletedTasksByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const completedTasksByUser = await TaskModel.getCompletedTasksByUserId(userId);
        res.json(completedTasksByUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get tasks by category for a user
exports.getTasksByCategory = async (req, res) => {
    try {
        const { userId, categoryId } = req.params;
        const tasksByCategory = await TaskModel.getTasksByCategory(userId, categoryId);
        res.json(tasksByCategory);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get tasks by priority for a user
exports.getTasksByPriority = async (req, res) => {
    try {
        const { userId, priorityId } = req.params;
        const tasksByPriority = await TaskModel.getTasksByPriority(userId, priorityId);
        res.json(tasksByPriority);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create a new task
exports.createTask = async (req, res) => {
    try {
        const newTaskId = await TaskModel.createTask(req.body);
        res.status(201).json({ message: "Task created", taskId: newTaskId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a task
exports.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        await TaskModel.updateTask(id, req.body);
        res.status(200).json({ message: "Task Updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a task
exports.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        await TaskModel.deleteTask(id);
        res.status(200).json({ message: "Task Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete all tasks for a given user
exports.deleteAllTasksByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        await TaskModel.deleteAllTasksByUserId(userId);
        res.status(200).json({ message: "Tasks Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
