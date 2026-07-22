const User = require('../models/User');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bcrypt = require('bcrypt');
const createToken = require('../helpers/createToken');
module.exports = class UserController {

    // cadastro
    static register = async (req, res) => {
        const { name, email, password, conf } = req.body;

        if (!name) {
            res.status(422).json({ message: "O campo nome é obrigatório" });
            return;
        }

        if (!email) {
            res.status(422).json({ message: "O campo email é obrigatório" });
            return;
        }

        if (!password) {
            res.status(422).json({ message: "O campo password é obrigatório" });
            return;
        }
        if (!conf) {
            res.status(422).json({ message: "O campo conf é obrigatório" });
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
            const novoUser = await user.save();
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
            res.status(422).json({ message: "O campo password é obrigatório" });
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

    // Atualização
    static update = async (req, res) => {

    }


}