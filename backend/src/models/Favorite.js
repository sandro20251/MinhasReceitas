const mongoose = require('mongoose');
const { Schema } = mongoose;


const FavoriteSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true
    }

}, { timestamps: true });


FavoriteSchema.index(
    {
        user: 1,
        recipe: 1
    },
    {
        unique: true
    }
);


const Favorite = mongoose.model('Favorite', FavoriteSchema);


module.exports = Favorite;