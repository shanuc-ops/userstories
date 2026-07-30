// authRoutes.js
const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');
const { ObjectId } = require('mongodb');

// REGISTER API (/api/auth/register)
router.post('/auth/register', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Please provide username, email, and password' });
    }

    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Insert new user
    const result = await db.collection('users').insertOne({
      username,
      email,
      password, // Note: In production, ensure passwords are appropriately hashed (e.g., using bcrypt)
      createdAt: new Date()
    });

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
});

// LOGIN API (/api/auth/login)
router.post('/auth/login', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide email and password' });
    }

    const user = await db.collection('users').findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // In production, generate a JWT token here
    res.status(200).json({ message: 'Login successful', userId: user._id, email: user.email });
  } catch (err) {
    res.status(500).json({ error: 'Login failed', details: err.message });
  }
});

// UPDATE USER INFORMATION API (/api/auth/user/:id)
router.put('/auth/user/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const userId = req.params.id;
    const { username, email } = req.body;

    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ error: 'Invalid user ID format' });
    }

    const updateFields = {};
    if (username) updateFields.username = username;
    if (email) updateFields.email = email;
    updateFields.updatedAt = new Date();

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User information updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update user information', details: err.message });
  }
});

module.exports = router;
