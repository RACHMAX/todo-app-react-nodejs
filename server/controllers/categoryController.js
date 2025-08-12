
const CategoryModel = require("../models/categoryModel");

// Get all categories (optionally for a specific user)
exports.getAllCategories = async (req, res) => {
    try {
        const { userId } = req.query; // Optional: pass ?userId= in query
        const categories = await CategoryModel.getAllCategories(userId || null);
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await CategoryModel.getCategoryById(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Create new category
exports.createCategory = async (req, res) => {
    try {
        const newCategoryId = await CategoryModel.createCategory(req.body);
        res.status(201).json({ message: "Category created", categoryId: newCategoryId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Update a category
exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await CategoryModel.updateCategory(id, req.body);
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category updated" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await CategoryModel.deleteCategory(id);
        if (affectedRows === 0) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json({ message: "Category deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
