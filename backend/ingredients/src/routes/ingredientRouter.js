import { Router } from "express";

import { getIngredient, createIngredient,  deleteIngredient } from "../controller/ingredientController.js";


const router = Router();

// get recipe by id
router.get('/:id', getIngredient);

// create recipe
router.post('/', createIngredient);

// delete recipe by id
router.delete('/:id', deleteIngredient);

export { router };