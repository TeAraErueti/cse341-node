const express = require('express');
const router = express.Router();

// ✅ Auth middleware from auth.js logic
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ message: '❌ Unauthorized. Please log in via GitHub.' });
};

// ✅ Protect root route with GitHub OAuth login
router.get('/', ensureAuthenticated, (req, res) => {
  res.type('text/plain').send(`✨ Welcome ${req.user.username}! You're logged in via GitHub.`);
});

// ✅ Leftm public so can use their own selective route-level auth
router.use('/users', require('./users'));
router.use('/products', require('./products'));

module.exports = router;

