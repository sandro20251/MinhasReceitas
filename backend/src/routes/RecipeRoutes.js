const express = require('express');
const router = express.Router();
const recipeContorller = require('../controller/recipeController');
const authorization = require('../helpers/authorization');

// criar receita
router.post('/', authorization, recipeContorller.create);
// listar receitas
router.get('/', authorization, recipeContorller.readall);
// buscar receita
router.get('/:id', authorization, recipeContorller.read);
// atualizar receita
router.patch('/:id', authorization, recipeContorller.update);
// excluir receita
router.delete('/:id', authorization, recipeContorller.delete);

module.exports = router;