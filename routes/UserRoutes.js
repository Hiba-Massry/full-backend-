const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const router = express.Router();

// Register new user
router.post("/signup", async (req, res) => {
  try {
    const { User_name, email, password } = req.body;
    const NewUser = new User({
      User_name,
      email,
      password,
    });
    await NewUser.save();
    const token = jwt.sign({ id: NewUser._id }, process.env.SECRET_KEY);
    res
      .status(201)
      .json({ user: NewUser, message: "User is created Successfully", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Authenticate user
router.post("/signin", async (req, res) => {
  try {
    const { User_name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //bcrypt
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.json({ user: user, message: "Signed in successfully", token });
      } else {
        res.status(401).json({ message: "Invalid details" });
      }
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update user
router.put("/:userId", async (req, res) => {
  try {
    const { User_name, email, password } = req.body;
    const user = await User.findByIdAndUpdate(req.params.userId, {
      email,
      password,
    });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Get users list
router.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete user
router.delete("/:userId", async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.userId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
