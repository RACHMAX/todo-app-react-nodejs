const UserModel = require("../models/userModel");

// GET all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET authenticated user's info
exports.getMyUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await UserModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a new user (registration)
exports.createUser = async (req, res) => {
  try {
    const newUserId = await UserModel.createUser(req.body);
    res.status(201).json({ message: "User created", userId: newUserId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT update authenticated user's info
exports.updateMyUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const affectedRows = await UserModel.updateUser(userId, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE authenticated user
exports.deleteMyUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const affectedRows = await UserModel.deleteUser(userId);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
