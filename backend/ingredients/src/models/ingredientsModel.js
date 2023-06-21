import mongoose, {Schema} from "mongoose";


const schema = mongoose.Schema;
const objectId = schema.ObjectId;

const ingredientSchema = new schema({
    fdcId: objectId,
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
    carbs_in_g: {
        type: Number,
        required: true,
    }
})

export const ingredient = mongoose.model('Ingredient', ingredientSchema);