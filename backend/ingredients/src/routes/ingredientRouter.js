import { Router } from "express";

import { getIngredient, getIngredientByName, getAllIngredients, createIngredient,  deleteIngredient } from "../controller/ingredientController.js";


const router = Router();

// get ingredient by id
router.get('/fdcid/:fdcid', getIngredient);

// get ingredient by name
router.get('/name/:name', getIngredientByName)

// get all ingredients
router.get('/', getAllIngredients)

// create ingredient
router.post('/', createIngredient);

// delete ingredient by id
router.delete('/:fdcId', deleteIngredient);

export { router };