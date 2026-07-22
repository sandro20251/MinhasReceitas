const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
// cadastro
router.post('/register', UserController.register);
// Login
router.post('/login', UserController.login);

module.exports = router;