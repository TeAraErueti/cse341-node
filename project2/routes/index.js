const express = require('express');
const router = express.Router();

// ✅ Your actual API endpoints
router.use('/users', require('./users'));

module.exports = router;