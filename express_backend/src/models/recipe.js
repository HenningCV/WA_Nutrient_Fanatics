import mongoose from "mongoose";

const schema = mongoose.Schema;
const objectId = schema.ObjectId;

const recipeSchema = new schema({
    author: objectId,
    title: String,
    desc: String,
    date: Date
});

export const Recipe = mongoose.model('Recipe', recipeSchema);