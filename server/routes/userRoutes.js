const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/auth");

// Public routes
router.post("/register", userController.createUser); // registration

// Routes requiring authentication
router.use(authMiddleware);

router.get("/me", userController.getMyUser);       // get own info
router.put("/me", userController.updateMyUser);    // update own info
router.delete("/me", userController.deleteMyUser); // delete own account

// Admin-only: list all users (optional, adjust auth middleware)
router.get("/", userController.getAllUsers);

module.exports = router;
