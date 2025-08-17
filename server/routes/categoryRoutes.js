const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const authMiddleware = require("../middleware/auth");

// All category routes require auth
router.use(authMiddleware);

router.get("/", categoryController.getAllCategories);       // list user's categories
router.get("/:id", categoryController.getCategoryById);     // get category by ID
router.post("/", categoryController.createCategory);        // create category
router.put("/:id", categoryController.updateCategory);      // update category
router.delete("/:id", categoryController.deleteCategory);   // delete category

module.exports = router;
