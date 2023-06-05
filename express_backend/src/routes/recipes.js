import { Router } from "express";
import { Recipe } from "../models/recipe.js";

const router = Router();


/**
 * @swagger
 * /recipe:
 *     get:
 *       summary: Finds all recipes
 *       description: Retrieves all recipes from the database
 */
router.get("/", async (req, res) => {

    //res.send("This is the recipe-page!")

    const rec = new Recipe({title: 'Rührei', body: 'Zutaten: 4 Eier, Öl, Salz, Pfeffer', date: Date.now()});
    rec.save();

    const recipes = await Recipe.find({});

    return res.status(200).json({
        recipes: recipes
    });
});

export { router };