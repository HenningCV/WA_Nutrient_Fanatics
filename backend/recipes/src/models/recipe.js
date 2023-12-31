import mongoose from "mongoose";


const schema = mongoose.Schema;
const objectId = schema.ObjectId;


const recipeSchema = new schema({
    author: objectId,
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    instructions: {
        type: String,
        required: true,
    },
    imageName: {
        type: String,
        required: false,
        default: 'recipe.jpg',
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