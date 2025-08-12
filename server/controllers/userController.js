const UserModel = require("../models/userModel");

// Get All Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const newUserId = await UserModel.createUser(req.body);
    res.status(201).json({ message: "User created", userId: newUserId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a user
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await UserModel.updateUser(id, req.body);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const affectedRows = await UserModel.deleteUser(id);
    if (affectedRows === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
