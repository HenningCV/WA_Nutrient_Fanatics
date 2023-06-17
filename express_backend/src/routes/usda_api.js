import { Router } from "express";

import { getIngredientID, getCalories } from "../controller/usda_apiController.js";


const router = Router();

// Get food-ID
router.get('/search', getIngredientID);

// Get calories
router.get('/get', getCalories);


export { router };