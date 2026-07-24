const express = require('express');
const router = express.Router();
const recipeContorller = require('../controller/recipeController');
const authorization = require('../helpers/authorization');

// criar receita
router.post('/', authorization, recipeContorller.create);
// listar receitas
router.get('/', recipeContorller.readall);
// receitas por usuario
router.get('/ByUser/:idUsuario', recipeContorller.recipesByUser);
// buscar receita
router.get('/:id', authorization, recipeContorller.read);
// atualizar receita
router.patch('/:id', authorization, recipeContorller.update);
// excluir receita
router.delete('/:id', authorization, recipeContorller.delete);

module.exports = router;