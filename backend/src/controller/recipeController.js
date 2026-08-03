const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');
const Like = require('../models/Like');
const Comment = require('../models/Comments');
const Favorite = require('../models/Favorite');


module.exports = class recipeController {
    // criar receita
    static create = async (req, res) => {
        const { title, description, category, ingredients, preparation, } = req.body;

        const image = req.file
            ? req.file.filename
            : null;

        if (!title) {
            res.status(422).json({ message: "O título da receita é obrigatório" });
            return;
        }

        if (!description) {
            res.status(422).json({ message: "A descrição da receita é obrigatória" });
            return;
        }

        if (!category) {
            res.status(422).json({ message: "A categoria da receita é obrigatória" });
            return;
        }

        if (!ingredients) {
            res.status(422).json({ message: "Os ingredientes são obrigatórios" });
            return;
        }

        if (!preparation) {
            res.status(422).json({ message: "O modo de preparo é obrigatório" });
            return;
        }

        const user = req.user;

        const recipe = new Recipe({
            title,
            description,
            category,
            ingredients,
            preparation,
            image,
            user: req.user.id
        })

        try {
            await recipe.save();
            res.status(201).json({ message: "Receita criada com sucesso!" });
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }

    // listar receitas
    static readall = async (req, res) => {
        try {
            const recipes = await Recipe.find().populate("user", "name avatar _id");;
            res.status(200).json(recipes);
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // buscar receita
    static read = async (req, res) => {
        const id = req.params.id;

        if (!id) {
            res.status(404).json({ message: "ID não encontrado" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido" });
            return;

        }

        try {
            const receita = await Recipe.findById(id).populate("user", "name avatar _id");
            res.status(200).json(receita);
            return;

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }

    // atualizar receita
    static update = async (req, res) => {
        const { title, description, category, ingredients, preparation } = req.body;

        if (!title) {
            res.status(422).json({ message: "O título da receita é obrigatório" });
            return;
        }

        if (!description) {
            res.status(422).json({ message: "A descrição da receita é obrigatória" });
            return;
        }

        if (!category) {
            res.status(422).json({ message: "A categoria da receita é obrigatória" });
            return;
        }

        if (!ingredients) {
            res.status(422).json({ message: "Os ingredientes são obrigatórios" });
            return;
        }

        if (!preparation) {
            res.status(422).json({ message: "O modo de preparo é obrigatório" });
            return;
        }

        const id = req.params.id;

        if (!id) {
            res.status(404).json({ message: "ID não encontrado" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido" });
            return;

        }

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            res.status(404).json({ message: "Receita não encontrada" });
            return;
        }

        const usuarioReceita = receita.user.toString();

        console.log("USUÁRIO LOGADO:", user.id);
        console.log("DONO DA RECEITA:", usuarioReceita);

        const user = req.user;

        if (user.id !== usuarioReceita) {
            res.status(422).json({
                message: "Você não tem permissão para excluir esta receita"
            });
            return;
        }

        const receita = {
            title,
            description,
            category,
            ingredients,
            preparation

        }

        try {

            await Recipe.updateOne({ _id: id }, receita);
            res.status(200).json({ message: "Receita alterada com sucesso!" })

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // excluir receita
    static delete = async (req, res) => {
        const id = req.params.id;

        if (!id) {
            res.status(404).json({ message: "ID não encontrado" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido" });
            return;

        }
        const receita = await Recipe.findById(id);

        if (!receita) {
            res.status(404).json({ message: "Receita não encontrada" });
            return;
        }
        const usuarioReceita = receita.user.id;

        const user = req.user;

        if (user.id !== usuarioReceita) {
            res.status(422).json({ message: "Você não tem permissão para excluir esta receita" });
            return;
        }

        try {
            await Comment.deleteMany({
                recipe: id
            });

            await Favorite.deleteMany({
                recipe: id
            });

            await Like.deleteMany({
                recipeId: id
            });

            await Recipe.deleteOne({ _id: id });
            res.status(200).json({ message: "Receita excluída com sucesso" });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // buscar receita por usuario

    static recipesByUser = async (req, res) => {
        const idUsuario = req.params.idUsuario;

        if (!mongoose.Types.ObjectId.isValid(idUsuario)) {
            res.status(422).json({ message: "ID inválido" });
            return;
        }

        const receitas = await Recipe.find({ user: idUsuario }).sort({ createdAt: -1 }).populate("user", "name image");

        if (receitas.length === 0) {
            res.status(404).json({ message: "Nenhuma receita encontrada" });
            return;
        }

        try {
            res.status(200).json(receitas);
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // curtir receitas

    static like = async (req, res) => {

        const idReceita = req.params.idReceita;

        if (!mongoose.Types.ObjectId.isValid(idReceita)) {
            res.status(422).json({ message: "ID inválido" });
            return;
        }

        const receita = await Recipe.findById(idReceita);

        if (!receita) {
            res.status(404).json({ mensagem: "Nenhuma receita encontrada" });
            return;
        }

        const user = req.user;

        if (!user) {
            res.status(422).json({ message: "Usuario não encontrado" });
            return;
        }

        const idUser = req.user.id;
        const receitaCurtida = await Like.findOne({ userId: idUser, recipeId: idReceita });


        if (receitaCurtida) {
            res.status(422).json({ message: "Você já curtiu essa receita" });
            return;
        }

        const like = new Like({
            userId: idUser,
            recipeId: idReceita
        })



        try {
            const curtir = await like.save();
            res.status(201).json({ message: "Receita curtida com sucesso." });

            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }

    // descurtindo receita

    static deslike = async (req, res) => {
        const idReceita = req.params.idReceita;

        if (!mongoose.Types.ObjectId.isValid(idReceita)) {
            res.status(422).json({ message: "ID inválido" });
            return;
        }

        const receita = await Recipe.findById(idReceita);

        if (!receita) {
            res.status(404).json({ menssage: "Nenhuma receita encontrada" });
            return;
        }

        const idUser = req.user.id;

        const curtida = await Like.findOne({
            userId: idUser,
            recipeId: idReceita
        });

        if (!curtida) {
            res.status(404).json({ message: "Você ainda não curtiu este post" });
            return;
        }

        try {
            await Like.findOneAndDelete({
                userId: idUser,
                recipeId: idReceita
            });
            res.status(201).json({ message: "Curtida removida com sucesso." });
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }

    // consultando curitdas por receita 

    static count = async (req, res) => {
        const idReceita = req.params.idReceita;

        if (!mongoose.Types.ObjectId.isValid(idReceita)) {
            res.status(422).json({ message: "ID inválido" });
            return;
        }

        const receita = await Recipe.findById(idReceita);

        if (!receita) {
            res.status(404).json({ message: "Receita não encontrada" });
            return;
        }

        try {

            const total = await Like.countDocuments({
                recipeId: idReceita
            });

            res.status(200).json(total);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // adicionar comentario

    static createComment = async (req, res) => {
        const userId = req.user.id;

        const idRecipe = req.params.idRecipe;

        if (!mongoose.Types.ObjectId.isValid(idRecipe)) {
            res.status(422).json({ message: "ID inválido" });
            return;
        }

        const recipe = await Recipe.findById(idRecipe);

        if (!recipe) {
            res.status(404).json({ message: "Receita não encontrada" });
            return;
        }

        const { text } = req.body;

        if (!text) {
            res.status(422).json({ message: "Digite um comentário antes de enviar." });
            return;
        }

        const comment = new Comment({
            text: text,
            user: userId,
            recipe: idRecipe,
        })

        try {
            const novoComentario = await comment.save();
            res.status(200).json(novoComentario);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // ler comentatrios da receita

    static allComments = useCallback(async (id) => {

        const token = localStorage.getItem("token");

        const res = await fetch(`${url}/${id}/comments`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        });

        const json = await res.json();

        setComentarios(json);

    }, []);
    // Favoritando receita

    static addFavorite = async (req, res) => {


        try {
            const userId = req.user.id;
            const idRecipe = req.params.idRecipe;

            const exists = await Favorite.findOne({
                user: userId,
                recipe: idRecipe
            });

            if (exists) {
                return res.status(422).json({
                    message: "Receita já favoritada."
                });
            }
            if (!mongoose.Types.ObjectId.isValid(idRecipe)) {
                res.status(422).json({ message: "ID inválido" });
                return;
            }

            const receita = await Recipe.findById(idRecipe);

            if (!receita) {
                res.status(404).json({ message: "Receita não encontrada" });
                return;
            }

            const favorite = new Favorite({
                user: userId,
                recipe: idRecipe
            })

            const newFavorite = await favorite.save();
            res.status(201).json(newFavorite);

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // Desfavoritando Receita

    static removeFavorite = async (req, res) => {
        try {
            const userId = req.user.id;
            const idRecipe = req.params.idRecipe;

            if (!mongoose.Types.ObjectId.isValid(idRecipe)) {
                res.status(422).json({ message: "ID inválido" });
                return;
            }

            const receita = await Recipe.findById(idRecipe);

            if (!receita) {
                res.status(404).json({ message: "Receita não encontrada" });
                return;
            }

            await Favorite.deleteOne({
                user: userId,
                recipe: idRecipe
            });
            res.status(200).json({ message: "Receita removida dos favoritos com sucesso." });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // fazendo pesquisa de título

    static searchTitle = async (req, res) => {
        const { titleSearch } = req.query;

        if (!titleSearch) {
            return res.status(422).json({
                message: "Informe um título para pesquisa."
            });
        }

        try {
            const recipe = await Recipe.find({

                title: {
                    $regex: titleSearch,
                    $options: "i"
                }
            });

            return res.status(200).json(recipe);

        } catch (err) {
            return res.status(500).json({
                message: err.message
            });
        }
    }
    // Filtrando por categoria

    static searchCategory = async (req, res) => {
        const { category } = req.query;

        try {
            const receitas = await Recipe.find({
                category: category
            })
            return res.status(200).json(receitas);
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // Atualizando comentário

    static updateComment = async (req, res) => {
        const id = req.params.idComment;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido" });
            return;
        }

        const comment2 = await Comment.findById(id);

        if (!comment2) {
            res.status(404).json({ message: "Comentário não encontrado" });
            return;
        }

        const { text } = req.body;

        const objeto = {
            text,
        }

        try {

            await Comment.updateOne({ _id: id }, objeto);
            res.status(200).json({ message: "Comentário atualizado com sucesso" });
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
    // Deletando comentário

    static deleteComment = async (req, res) => {
        const id = req.params.idComment;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "ID inválido" });
            return;
        }

        const comentario = await Comment.findById(id);

        if (!comentario) {
            res.status(404).json({ message: "Comenário não encontrado" });
            return;
        }

        const user = req.user;

        if (comentario.user.toString() !== user.id) {
            return res.status(403).json({
                message: "Você não tem permissão."
            });
        }

        try {
            await Comment.deleteOne({ _id: id });
            res.status(200).json({ message: "Comentário excluido com sucesso" });
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
}