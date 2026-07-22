const mongoose = require('mongoose');
const { Schema } = mongoose;
const User = require('../models/User');

const Recipe = mongoose.model('Recipe', new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: String },
    preparation: { type: String },
    image: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true }))



module.exports = Recipe;