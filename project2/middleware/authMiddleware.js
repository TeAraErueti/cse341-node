// project2/middleware/authMiddleware.js

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: '❌ Unauthorized. Please log in via GitHub.' });
};

module.exports = ensureAuthenticated;