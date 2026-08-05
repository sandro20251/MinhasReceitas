const User = require('../models/User');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bcrypt = require('bcrypt');
const createToken = require('../helpers/createToken');
const mongoose = require('mongoose');
const Favorite = require('../models/Favorite');
const Recipe = require('../models/Recipe');

const Comments = require('../models/Comments');
const Likes = require('../models/Like');
const getToken = require('../helpers/gettoken');
const getUserByToken = require('../helpers/getUserByToken');


module.exports = class UserController {

    // cadastro
    static register = async (req, res) => {
        const { name, email, password, conf } = req.body;

        if (!name) {
            res.status(422).json({ message: "Digite o usuário" });
            return;
        }

        if (!email) {
            res.status(422).json({ message: "O email é obrigatório" });
            return;
        }

        if (!password) {
            res.status(422).json({ message: "A senha é obrigatória" });
            return;
        }
        if (!conf) {
            res.status(422).json({ message: "O A confirmação de senha é obrigatória" });
            return;
        }


        if (!emailRegex.test(email)) {
            return res.status(422).json({
                message: "E-mail inválido."
            });
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(422).json({ message: "Este e-mail já está em uso" });
            return;
        }

        if (password !== conf) {
            res.status(422).json({ message: "As senhas não conferem" });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const user = new User({
            name,
            email,
            password: hash
        })

        try {
            await user.save();
            return res.status(201).json({ message: "Cadastro concluído com sucesso" });

        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // login
    static login = async (req, res) => {
        const { email, password } = req.body;

        if (!email) {
            res.status(422).json({ message: "O campo email é obrigatório" });
            return;
        }
        if (!password) {
            res.status(422).json({ message: "A senha é obrigatória" });
            return;
        }
        if (!emailRegex.test(email)) {
            return res.status(422).json({
                message: "E-mail inválido."
            });
        }

        try {
            const user = await User.findOne({ email });

            if (!user) {
                res.status(404).json({ message: "Usuário não encontrado" });
                return;
            }

            const compare = await bcrypt.compare(password, user.password);

            if (!compare) {
                res.status(401).json({ message: "Email ou senha inválidos" });
                return;
            }

            const token = createToken(user);

            return res.status(200).json({
                message: "Login realizado com sucesso",
                token
            });
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }

    // resgatar dados do usuario

    static getPeople = async (req, res) => {
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            res.status(422).json({ message: "Id inválido" });
            return;
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            res.status(404).json({ message: "Usuário não encontrado" });
            return;
        }

        try {
            res.status(200).json(user);
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }
    }

    // buscar receitas favoritas
    static readFavorite = async (req, res) => {
        const userId = req.user.id;

        try {
            const favoritos = await Favorite.find({ user: userId }).populate("recipe", "title description category id image");
            res.status(200).json(favoritos);
            return;
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }

    static delete = async (req, res) => {
        const user = req.user;

        try {

            await Recipe.deleteMany({ user: user._id });
            await Favorite.deleteMany({ user: user._id });
            await Comments.deleteMany({ user: user._id });
            await Likes.deleteMany({
                recipeId: {
                    $in: (await Recipe.find({ user: user._id })).map(r => r._id)
                }
            });
            await User.deleteOne({ _id: user.id });
            res.status(200).json({ message: "Usuário excluído com sucesso" });
            return;
        } catch (err) {
            res.status(500).json(err.message);
            return;
        }


    }

    // Atualizando foto de perfil

    static uploadAvatar = async (req, res) => {

        try {

            if (!req.file) {
                return res.status(422).json({
                    message: "Envie uma imagem"
                });
            }

            const userId = req.user.id;

            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({
                    message: "Usuário não encontrado"
                });
            }

            user.avatar = req.file.filename;

            await user.save();

            return res.status(200).json({
                message: "Foto de perfil atualizada com sucesso",
                avatar: user.avatar
            });

        } catch (err) {

            console.log(err);

            return res.status(500).json({
                message: err.message
            });

        }

    }
    //  buscar receita em favoritos
    static readFavoriteByUser = async (req, res) => {
        const token = await getToken(req);
        const user2 = await getUserByToken(token);
        const idReceita = req.params.idReceita;
        try {
            const receitaFavorita = await Favorite.find({ recipe: idReceita, user: user2 });
            res.status(200).json({ message: "Receita favorita encontrada com sucesso" });
        } catch (err) {
            res.status(500).json({ message: err.message });
            return;
        }

    }

}

