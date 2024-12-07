const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const router = express.Router();

// Register new user
router.post("/signup", async (req, res) => {
  try {
    const { user_name, email, password } = req.body;
    const newUser = new User({
      user_name,
      email,
      password,
    });
    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
    res
      .status(201)
      .json({ user: newUser, message: "User created successfully", token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Authenticate user
router.post("/signin", async (req, res) => {
  try {
    const { user_name, email, password } = req.body; // Changed from User_name to user_name
    const user = await User.findOne({ email });
    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
        res.json({ user, message: "Signed in successfully", token });
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
    const { email, password } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 8); // Hashing password if provided
      req.body.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true, // Returns the updated document
    });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get users list
router.get("/", async (req, res) => {
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
    if (response) {
      res.json({ message: "User deleted successfully", response });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Clear all data (new route for clearing data)
router.delete("/clear-all", async (req, res) => {
  try {
    // Fetch all collections
    const collections = await mongoose.connection.db.collections();

    // Check if there are any collections to clear
    if (collections.length === 0) {
      return res.status(200).json({ message: "No collections found to clear!" });
    }

    let hasData = false; // Track if any data was actually deleted

    // Loop through each collection and delete all documents
    for (const collection of collections) {
      const result = await collection.deleteMany({});
      if (result.deletedCount > 0) {
        hasData = true;
      }
      console.log(`Cleared data from collection: ${collection.collectionName}`);
    }

    // If no data was deleted from any collection
    if (!hasData) {
      return res
        .status(200)
        .json({ message: "No data found to clear in the collections!" });
    }

    // If data was successfully cleared
    res.status(200).json({ message: "All data has been cleared successfully!" });
  } catch (err) {
    console.error("Error clearing data:", err);
    res.status(500).json({ message: "Error clearing data", error: err.message });
  }
});

// Delete user by ID
router.delete("/:userId", async (req, res) => {
  try {
    const response = await User.findByIdAndDelete(req.params.userId);
    if (response) {
      res.json({ message: "User deleted successfully", response });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;