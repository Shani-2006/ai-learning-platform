const User = require("../models/User");

const createUser = async (req, res, next) => {
  try {
    const { name, phone } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    const user = await User.create({ name, phone });

    res.status(201).json({
      message: "User created successfully",
      user
    });
  } catch (err) {
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getUsers
};