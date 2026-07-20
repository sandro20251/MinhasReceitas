const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Banco de dados conectado com sucesso!");
    } catch (err) {

        console.log("Ocorreu um erro " + err.message);
        return;
    }

}

module.exports = connect;