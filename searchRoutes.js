// searchRoutes.js
const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// GET /api/search/category/:category - Filter items by category
router.get('/search/category/:category', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const categoryName = req.params.category;
    
    // Query the database filtering by category
    const items = await db.collection('gifts').find({ category: categoryName }).toArray();
    
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: 'Failed to filter items by category', details: err.message });
  }
});

module.exports = router;
