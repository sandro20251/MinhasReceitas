const express = require('express');
const cors = require('cors');

const porta = 5000;
const app = express();

app.use(express.json());

app.use(cors({ credentials: true, origin: "http://localhost:3000/" }));

// rotas


app.listen(porta, () => {
    console.log(`O express está escutando a porta ${porta}`);
})