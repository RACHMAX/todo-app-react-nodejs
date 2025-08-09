const db = require("../config/db");

const TaskModel = {
  // Get All Tasks
  getAllTasks: async () => {
    const [rows] = await db.query("SELECT * FROM tasks");
    return rows;
  },

  // Get All Tasks by an User ID
  getTasksByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [userId]);
    return rows;
  },

  // Get a Specific Task by ID
  getTaskById: async (id) => {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);
    return rows[0];
  },

  // Get All Tasks under a Creation Date Range
  getTasksByDateRange: async (startDate, endDate) => {
    const [rows] = await db.query("SELECT * FROM tasks WHERE created_at BETWEEN ? and ?", [startDate, endDate]);
    return rows;
  },

  // Get All Tasks for a User ID that are Completed
  getCompletedTasksByUserId: async (userId) => {
    const [rows] = await db.query("SELECT * FROM tasks WHERE user_id = ? AND is_completed = TRUE", [userId]);
    return rows;
  },

  // Get All Tasks for a User ID that are under a Specific Category
  getTasksByCategory: async (userId, categoryId) => {
    const [rows] = await db.query("SELECT * FROM tasks WHERE user_id = ? AND category_id = ?");
    return rows;
  },

  // Get All Tasks for a User ID that are under a specific Priority
  getTasksByPriority: async (userId, priorityId) => {
    const [rows] = await db.query(
      "SELECT * FROM tasks WHERE user_id = ? AND priority_id = ?",
      [userId, priorityId]
    );
    return rows;
  },

  // Create a new Task
  createTask: async (taskData) => {
    const { user_id, title, description, due_date, is_completed, priority_id, category_id } = taskData;
    const [result] = await db.query(
      `INSERT INTO tasks (user_id, title, description, due_date, is_completed, priority_id, category_id) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [user_id, title, description, due_date, is_completed, priority_id, category_id]
    );
    return result.insertId;
  },

  // Update a Task
  updateTask: async (id, taskData) => {
    const { user_id, title, description, due_date, is_completed, priority_id, category_id } = taskData;
    const [result] = await db.query(
      `UPDATE tasks 
       SET user_id = ?, title = ?, description = ?, due_date = ?, is_completed = ?, priority_id = ?, category_id = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [user_id, title, description, due_date, is_completed, priority_id, category_id, id]
    );
    return result.affectedRows;
  },

  // Delete a Task
  deleteTask: async (id) => {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result.affectedRows;
  },

  // Delete All Tasks for a Given User
  deleteAllTasksByUserId: async (userId) => {
    const [result] = await db.query(
      "DELETE FROM tasks WHERE user_id = ?",
      [userId]
    );
    return result.affectedRows;
  }

};


module.exports = TaskModel;