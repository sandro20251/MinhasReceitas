const mongoose = require('mongoose');
const { Schema } = mongoose;

const Like = mongoose.model('Like', new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    }
}, { timestamps: true }))

module.exports = Like;