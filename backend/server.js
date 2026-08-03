const express = require('express');
const cors = require('cors');
const connect = require('./src/dataBase/connection');
require('dotenv').config();
const path = require("path");

const porta = process.env.PORTA || 5000;
const app = express();
connect();



const allowedOrigins = [
    "http://localhost:3000",
    "https://minhas-receitas-p6oe.vercel.app",
    "https://minhas-receitas-rouge.vercel.app"
];

app.use(cors({
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS não permitido"));
        }
    }
}));

app.use(express.json());

app.use(
    "/uploads",
    express.static(path.join(__dirname, "uploads"))
);

// rotas

app.use('/users', require('./src/routes/UserRoutes'));
app.use('/recipes', require('./src/routes/RecipeRoutes'));

app.listen(porta, () => {
    console.log(`O express está escutando a porta ${porta}`);
})