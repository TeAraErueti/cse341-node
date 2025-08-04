const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validateUser');
const ensureAuthenticated = require('../middleware/authMiddleware'); 

// Public: Get all users 
router.get('/', usersController.getAll);

// Protected: Get a single user by ID
router.get('/:id', ensureAuthenticated, validation.checkId, usersController.getSingle);

// Protected: Create a new user
router.post('/', ensureAuthenticated, validation.saveUser, usersController.createUser);

// Protected: Update a user
router.put('/:id', ensureAuthenticated, validation.checkId, validation.saveUser, usersController.updateUser);

// Protected: Delete a user
router.delete('/:id', ensureAuthenticated, validation.checkId, usersController.deleteUser);

module.exports = router;
