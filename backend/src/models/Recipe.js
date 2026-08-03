const mongoose = require('mongoose');
const { Schema } = mongoose;

const Recipe = mongoose.model('Recipe', new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: String },
    preparation: { type: String },
    image: {
        type: String,
        default: null
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

}, { timestamps: true }))


module.exports = Recipe;