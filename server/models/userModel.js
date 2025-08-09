const db = require("../config/db");

const UserModel = {
  // Get All Users
  getAllUsers: async () => {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  },

  // Get a User by ID
  getUserById: async (id) => {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0]; // single user
  },

  // Create a new User
  createUser: async (userData) => {
    const { username, email, password } = userData;
    const [result] = await db.query(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password]
    );
    return result.insertId;
  },

  // Update a User
  updateUser: async (id, userData) => {
    const { username, email, password } = userData;
    const [result] = await db.query(
      `UPDATE users 
       SET username = ?, email = ?, password = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [username, email, password, id]
    );
    return result.affectedRows;
  },

  // Delete a User
  deleteUser: async (id) => {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = UserModel;
