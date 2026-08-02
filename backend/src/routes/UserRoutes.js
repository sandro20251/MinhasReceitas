const express = require('express');
const router = express.Router();
const UserController = require('../controller/userController');
const authorization = require('../helpers/authorization');
const upload = require('../middlewares/upload')
// cadastro
router.post('/register', UserController.register);
// Login
router.post('/login', UserController.login);
// buscar receitas favoritas
router.get('/all/favorites', authorization, UserController.readFavorite);

// Buscar dados do usuario
router.get('/:id', authorization, UserController.getPeople);
// upload avatar
router.post(
    '/avatar',
    authorization,
    upload.single('avatar'),
    UserController.uploadAvatar
);
// deletar usuários
router.delete('/excluirConta', authorization, UserController.delete);

module.exports = router;