const express = require('express');
const router = express.Router();

// Root route for '/'
router.get('/', (req, res) => {
  res.type('text/plain').send('✨ Welcome to the CSE341 Node Project2 API! 🚀');
});

// Your actual API endpoints
router.use('/users', require('./users'));
router.use('/products', require('./products'));


module.exports = router;

