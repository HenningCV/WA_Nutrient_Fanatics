import { Router } from "express";

import { getRecipe, getAllRecipes, createRecipe, updateRecipe, deleteRecipe } from '../controller/recipeController.js';


const router = Router();

// get recipe by id
router.get('/:id', getRecipe);

// get all recipes
router.get('/', getAllRecipes);

// create recipe
router.post('/', createRecipe);

// update recipe by id
router.patch('/:id', updateRecipe);

// delete recipe by id
router.delete('/:id', deleteRecipe);

export { router };