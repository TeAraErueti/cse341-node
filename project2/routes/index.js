const express = require('express');
const router = express.Router();

// Root route for '/'
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the cse341 node project2 root endpoint!' });
});

// Your actual API endpoints
router.use('/users', require('./users'));

module.exports = router;
