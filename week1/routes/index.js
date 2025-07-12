const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hello World');
});

router.use('/users', require('./users')); // ✔ correctly connects /users route

module.exports = router;
