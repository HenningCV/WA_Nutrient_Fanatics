import { Router } from "express";

import { getIngredient, getAllIngredients, createIngredient,  deleteIngredient } from "../controller/ingredientController.js";


const router = Router();

// get ingredient by id
router.get('/:fdcId', getIngredient);

// get all ingredients
router.get('/', getAllIngredients)

// create ingredient
router.post('/', createIngredient);

// delete ingredient by id
router.delete('/:fdcId', deleteIngredient);

export { router };