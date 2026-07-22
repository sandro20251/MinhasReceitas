const Recipe = require('../models/Recipe');
const mongoose = require('mongoose');

module.exports = class recipeController {
    // criar receita
    static create = async (req, res) => {
        const { title, description, category, ingredients, preparation } = req.body;

        if (!title) {
            res.status(422).json({ message: "Campo title não encontrado" });
            return;
        }

        if (!description) {
            res.status(422).json({ message: "Campo description não encontrado" });
            return;
        }

        if (!category) {
            res.status(422).json({ message: "Campo category não encontrado" });
            return;
        }

        if (!ingredients) {
            res.status(422).json({ message: "Campo ingredients não encontrado" });
            return;
        }

        if (!preparation) {
            res.status(422).json({ message: "Campo preparation não encontrado" });
            return;
        }

        const user = req.user;

        const recipe = new Recipe({
            title,
            description,
            category,
            ingredients,
            preparation,
            user: user.id
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
            const recipes = await Recipe.find().lean();
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
            res.status(404).json({ message: "id não encontrado" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "id inválido" });
            return;

        }


        try {
            const receita = await Recipe.findById(id);
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
            res.status(422).json({ message: "Campo title não encontrado" });
            return;
        }

        if (!description) {
            res.status(422).json({ message: "Campo descritpion não encontrado" });
            return;
        }

        if (!category) {
            res.status(422).json({ message: "Campo category não encontrado" });
            return;
        }

        if (!ingredients) {
            res.status(422).json({ message: "Campo ingredients não encontrado" });
            return;
        }

        if (!preparation) {
            res.status(422).json({ message: "Campo preparation não encontrado" });
            return;
        }



        const id = req.params.id;

        if (!id) {
            res.status(404).json({ message: "id não encontrado" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "id inválido" });
            return;

        }

        const recipe = await Recipe.findById(id);

        if (!recipe) {
            res.status(404).json({ message: "Receita não encontrada" });
            return;
        }

        const usuarioReceita = recipe.user.id;

        const user = req.user;

        if (user.id !== usuarioReceita) {
            res.status(422).json({ message: "Você não é o autor da receita então não pode alterar ela" });
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
            res.status(201).json({ message: "Receita alterada com sucesso!" })

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }
    // excluir receita
    static delete = async (req, res) => {
        const id = req.params.id;

        if (!id) {
            res.status(404).json({ message: "id não encontrado" });
            return;
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "id inválido" });
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
            res.status(422).json({ message: "Você não é o autor da receita então não pode excluir ela" });
            return;
        }

        try {

            await Recipe.deleteOne({ _id: id });
            res.status(200).json({ message: "Receita excluída com sucesso" });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }
}