const mongoose = require('mongoose');
const { Schema } = mongoose;

const Comment = mongoose.model('Comments', new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    recipe: {
        type: Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    },
    text: { type: String, required: true }
}, { timestamps: true }))

module.exports = Comment;