const express = require('express');
const cors = require('cors');
const connect = require('./src/dataBase/connection');
require('dotenv').config();

const porta = process.env.PORTA || 5000;
const app = express();
connect();

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// rotas

app.use('/', require('./src/routes/routeTeste'));

app.listen(porta, () => {
    console.log(`O express está escutando a porta ${porta}`);
})