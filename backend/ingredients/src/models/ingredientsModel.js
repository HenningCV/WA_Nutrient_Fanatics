import mongoose from "mongoose";


const schema = mongoose.Schema;

const ingredientSchema = new schema({
    fdcId: {
        type: Number,
        required: true,
        unique: true,
        },
    name: {
        type: String,
        required: true,
    },
    kcal: {
        type: Number,
        required: true,
    },
    protein_in_g: {
        type: Number,
        required: true,
    },
    fat_in_g: {
        type: Number,
        required: true,
    },
    carb_in_g: {
        type: Number,
        required: true,
    }
})

export const Ingredient = mongoose.model('Ingredients', ingredientSchema);