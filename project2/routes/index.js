const express = require('express');
const router = express.Router();

// Root route for '/'
router.get('/', (req, res) => {
  res.json({ 
    message: "✨ Welcome to the CSE341 Node Project2 API! 🚀",
    info: "Use the /users endpoint to manage users."
  });
});

// Your actual API endpoints
router.use('/users', require('./users'));

module.exports = router;
