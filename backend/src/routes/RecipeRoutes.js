const express = require('express');
const router = express.Router();
const recipeContorller = require('../controller/recipeController');
const authorization = require('../helpers/authorization');
const upload = require("../middlewares/upload");

// criar receita
router.post('/', authorization, upload.single("image"), recipeContorller.create);
// listar receitas
router.get('/', recipeContorller.readall);
// pesquisar receita por titulo
router.get('/portitulo', recipeContorller.searchTitle);
// buscar por categoria
router.get('/category', recipeContorller.searchCategory);
// receitas por usuario
router.get('/ByUser/:idUsuario', recipeContorller.recipesByUser);
// buscar receita
router.get('/:id', authorization, recipeContorller.read);
// atualizar receita
router.patch('/:id', authorization, recipeContorller.update);
// excluir receita
router.delete('/:id', authorization, recipeContorller.delete);
// curtindo receitas
router.post('/:idReceita/like', authorization, recipeContorller.like);
// descurtidno receitas
router.delete('/:idReceita/like', authorization, recipeContorller.deslike);
// contar Curtidas
router.get('/:idReceita/count', recipeContorller.count);
// comentar receita
router.post('/:idRecipe/comments', authorization, recipeContorller.createComment);
// buscar comentários da receita
router.get('/:idRecipe/comments', authorization, recipeContorller.allComments);
// adicionar receitas favoritas
router.post('/:idRecipe/favorite', authorization, recipeContorller.addFavorite);
// retirar dos favoritos
router.delete('/:idRecipe/favorite', authorization, recipeContorller.removeFavorite);
// alterar comentario
router.patch('/:idComment/comments', recipeContorller.updateComment);
// excluir comentário
router.delete('/:idComment/comments', authorization, recipeContorller.deleteComment);
router.get('/:idReceita/like/porUsuario', authorization, RecipeController.readLikeByUser);



module.exports = router;