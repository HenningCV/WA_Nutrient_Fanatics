import mongoose from "mongoose";


const schema = mongoose.Schema;
const objectId = schema.ObjectId;


const recipeSchema = new schema({
    author: objectId,
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: false
    },
});

export const Recipe = mongoose.model('Recipe', recipeSchema);