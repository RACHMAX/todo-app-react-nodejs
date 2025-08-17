const CategoryModel = require("../models/categoryModel");

// GET all categories for authenticated user
exports.getAllCategories = async (req, res) => {
  try {
    const userId = req.user.id;
    const categories = await CategoryModel.getAllCategories(userId);
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a category by ID (must belong to user)
exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.getCategoryById(id);
    if (!category || category.user_id !== req.user.id) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a new category for authenticated user
exports.createCategory = async (req, res) => {
  try {
    const categoryData = { ...req.body, user_id: req.user.id };
    const newCategoryId = await CategoryModel.createCategory(categoryData);
    res.status(201).json({ message: "Category created", categoryId: newCategoryId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update a category (must belong to user)
exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.getCategoryById(id);
    if (!category || category.user_id !== req.user.id) {
      return res.status(404).json({ error: "Category not found" });
    }

    await CategoryModel.updateCategory(id, req.body);
    res.status(200).json({ message: "Category updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE a category (must belong to user)
exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await CategoryModel.getCategoryById(id);
    if (!category || category.user_id !== req.user.id) {
      return res.status(404).json({ error: "Category not found" });
    }

    await CategoryModel.deleteCategory(id);
    res.status(200).json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
