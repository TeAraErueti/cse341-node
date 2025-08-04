const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start GitHub auth
router.get('/auth/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

// GitHub callback
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  (req, res) => {
    // Successful login
    res.redirect('/');
  }
);

// Logout
router.get('/auth/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/');
  });
});

// Success route
router.get('/auth/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ message: '✅ Authenticated via GitHub', user: req.user });
  } else {
    res.status(401).json({ message: '❌ Not authenticated' });
  }
});

// Failure route
router.get('/auth/failure', (req, res) => {
  res.status(401).json({ message: '❌ GitHub authentication failed' });
});

module.exports = router;
