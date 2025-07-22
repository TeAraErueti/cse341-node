const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const validation = require('../middleware/validateUser');

router.get('/', usersController.getAll);

router.get('/:id', validation.checkId, usersController.getSingle);

router.post('/', validation.saveUser, usersController.createUser);

router.put('/:id', validation.checkId, validation.saveUser, usersController.updateUser);

router.delete('/:id', validation.checkId, usersController.deleteUser);

module.exports = router;

