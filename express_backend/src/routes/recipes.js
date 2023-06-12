import { Router } from "express";

import { Recipe } from "../models/recipe.js";
import { getRecipe, createRecipe, updateRecipe } from "../controller/recipeController.js";

const router = Router();

// get recipe by id
router.get('/:id', getRecipe);

// create recipe
router.post('/', createRecipe);

// update recipe by id
router.patch('/:id', updateRecipe);

export { router };