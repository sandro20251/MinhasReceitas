const modelo = require('../models/modeloTeste');

module.exports = class testeController {
    static async create2(req, res) {
        const { nome } = req.body;

        if (!nome) {
            return res.status(404).json({ message: "nome não encontrado" })
        }

        const objeto = new modelo({
            nome,
        })

        try {
            const novoObjeto = await objeto.save();
            res.status(201).json(novoObjeto);
        } catch (err) {
            return res.status(500).json({ message: err.message })
        }
    }

    static async read(req, res){
        try{
            const objetos = await modelo.find().lean();
            res.status(200).json(objetos);
        }catch(err){
            return res.status(500).json({message:err.message})
        }
    }
}

