
const db = require("../config/db");

const CategoryModel = {
  // Get All Categories (optionally for a specific user)
  getAllCategories: async (userId = null) => {
    if (userId) {
      const [rows] = await db.query("SELECT * FROM categories WHERE user_id = ?", [userId]);
      return rows;
    } else {
      const [rows] = await db.query("SELECT * FROM categories");
      return rows;
    }
  },

  // Get a Category by ID
  getCategoryById: async (id) => {
    const [rows] = await db.query("SELECT * FROM categories WHERE id = ?", [id]);
    return rows[0];
  },

  // Create a new Category
  createCategory: async (categoryData) => {
    const { user_id, name } = categoryData;
    const [result] = await db.query(
      `INSERT INTO categories (user_id, name) VALUES (?, ?)`,
      [user_id, name]
    );
    return result.insertId;
  },

  // Update a Category
  updateCategory: async (id, categoryData) => {
    const { name } = categoryData;
    const [result] = await db.query(
      `UPDATE categories 
       SET name = ?, updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, id]
    );
    return result.affectedRows;
  },

  // Delete a Category
  deleteCategory: async (id) => {
    const [result] = await db.query("DELETE FROM categories WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = CategoryModel;
