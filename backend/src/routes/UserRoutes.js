const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const authorization = require('../helpers/authorization');
// cadastro
router.post('/register', UserController.register);
// Login
router.post('/login', UserController.login);
// buscar receitas favoritas
router.get('/all/favorites', authorization, UserController.readFavorite);

// Buscar dados do usuario
router.get('/:id', authorization, UserController.getPeople);

module.exports = router;