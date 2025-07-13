const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

// Simple test route to confirm router is working
router.get('/test', (req, res) => {
  res.json({ message: '✅ Test users route working' });
});

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.post('/', usersController.createUser);

router.put('/:id', usersController.updateUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;
