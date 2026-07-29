// giftRoutes.js
const express = require('express');
const router = express.Router();
const connectToDatabase = require('./db');

// GET all gifts (/api/gifts)
router.get('/gifts', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const gifts = await db.collection('gifts').find({}).toArray();
    res.status(200).json(gifts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch gifts', details: err.message });
  }
});

// GET a single gift by ID (/api/gifts/:id)
router.get('/gifts/:id', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { ObjectId } = require('mongodb');
    const giftId = req.params.id;
    
    if (!ObjectId.isValid(giftId)) {
      return res.status(400).json({ error: 'Invalid gift ID format' });
    }

    const gift = await db.collection('gifts').findOne({ _id: new ObjectId(giftId) });
    
    if (!gift) {
      return res.status(404).json({ error: 'Gift not found' });
    }

    res.status(200).json(gift);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch the gift', details: err.message });
  }
});

module.exports = router;
