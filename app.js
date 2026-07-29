// app.js
const express = require('express');
const app = express();
const searchRoutes = require('./searchRoutes');
const giftRoutes = require('./giftRoutes');

app.use(express.json());

// Mount the search and gift routes
app.use('/api', searchRoutes);
app.use('/api', giftRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.send('Welcome to the Fullstack Capstone Project API');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
