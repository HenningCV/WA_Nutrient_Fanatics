import { Router } from "express";

import { getIngredient, createIngredient,  deleteIngredient } from "../controller/ingredientController.js";


const router = Router();

// get recipe by id
router.get('/:fdcId', getIngredient);

// create recipe
router.post('/', createIngredient);

// delete recipe by id
router.delete('/:fdcId', deleteIngredient);

export { router };