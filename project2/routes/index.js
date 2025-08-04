const express = require('express');
const router = express.Router();

const ensureAuthenticated = require('../middleware/authMiddleware');

router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(`
      <h1>🚀 Welcome, ${req.user.username}!</h1>
      <p>You are logged in via GitHub.</p>
      <a href="/auth/logout">Logout</a>
    `);
  } else {
    res.send(`
      <h1>✨ Welcome to the CSE341 Node Project2 API!</h1>
      <p><a href="/auth/github">🔐 Login with GitHub</a></p>
    `);
  }
});

router.use('/users', require('./users'));
router.use('/products', require('./products'));

module.exports = router;
