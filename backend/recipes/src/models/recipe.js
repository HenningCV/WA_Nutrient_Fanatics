import mongoose from "mongoose";


const schema = mongoose.Schema;
const objectId = schema.ObjectId;


const recipeSchema = new schema({
    author: objectId,
    name: {
        type: String,
        required: true,
        unique: true,
    },
    desc: {
        type: String,
        required: true,
    },
    imagePath: {
        type: String,
        required: false,
        default: '../images/scrambled_eggs.jpg',
    },
    ingredientIds: {
        type: [Number],
        required: true,
    },
    ingredientAmountsInGram: {
        type: [Number],
        required: true,
    },
});

export const Recipe = mongoose.model('Recipe', recipeSchema);