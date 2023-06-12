import express, { Router } from "express";
import { Recipe } from "../models/recipe.js";

const router = Router();

router.use(express.json());

/**
 * @swagger
 * /recipe:
 *     get:
 *       summary: Finds all recipes
 *       description: Retrieves all recipes from the database
 *       responses:
 *         '201':
 *           description: A recipe object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: Scrambled Eggs
 *                   desc:
 *                     type: string
 *                     example: 4 eggs, salt, pepper
 *                   date:
 *                     type: date
 *                     example: 2023-06-12T09:11:10.303Z
 *                   id:
 *                     type: string
 *                     example: 6486e12e1848915af487e38d
 *
 */
router.get("/", async (req, res) => {

    const recipes = await Recipe.find({});

    return res.status(200).json({
        recipes: recipes
    });
});


/**
 * @swagger
 * /recipe:
 *    post:
 *       summary: Add a recipe
 *       description: Add a recipe to the database
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 desc:
 *                   type: string
 *       responses:
 *         '201':
 *           description: A recipe object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                     example: Scrambled Eggs
 *                   desc:
 *                     type: string
 *                     example: 4 eggs, salt, pepper
 *                   date:
 *                     type: date
 *                     example: 2023-06-12T09:11:10.303Z
 *                   id:
 *                     type: string
 *                     example: 6486e12e1848915af487e38d
 */
router.post('/', (req, res) => {

    const newRecipe = new Recipe({ title: req.body.title,
                                        desc: req.body.desc,
                                        date: Date.now() });
    newRecipe.save();

    res.status(201).json(newRecipe);
})

export { router };