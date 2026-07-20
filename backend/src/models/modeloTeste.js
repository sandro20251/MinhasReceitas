
const mongoose = require('mongoose');
const { Schema } = mongoose;

const modeloTeste = mongoose.model('Teste', new Schema({
    nome: { type: String }
}, { timesTamps: true }));

module.exports = modeloTeste;