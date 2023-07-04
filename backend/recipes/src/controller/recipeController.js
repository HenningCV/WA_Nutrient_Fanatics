import { Recipe } from "../models/recipe.js";


/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Find recipe by ID
 *     description: Gets the recipe for a given ID from the database
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recipe to get
 *     responses:
 *       '200':
 *         description: Recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 name:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: A simple dish for students.
 *                 instructions:
 *                   type:
 *                   example: Mix the 4 eggs with salt and pepper.
 *                 imageName:
 *                   type: string
 *                   example: scrambled_eggs.jpg
 *                 ingredientIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [100001, 100002, 100003]
 *                 ingredientAmountsInGram:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [50, 1400, 360]
 *       '204':
 *         description: No recipe for the given ID was found
 */
export const getRecipe = (req, res) => {
    const id = req.params['id'];

    Recipe.findById(id)
        .then(recipe => {
            if (recipe) {
                console.log('Recipe found: ', recipe['name']);
                return res.status(200).json({ recipe: recipe });
            }
            else {
                console.log('Recipe not found.');
                res.status(204).json('Recipe does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching recipe: ', error);
        });
};


/**
 * @swagger
 * /recipes:
 *   get:
 *     summary: Get all recipes
 *     description: Get all existing recipes from the database
 *     responses:
 *       '200':
 *         description: Array of recipe objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6486e12e1848915af487e38d
 *                   name:
 *                     type: string
 *                     example: Scrambled Eggs
 *                   desc:
 *                     type: string
 *                     example: A simple dish for students.
 *                   instructions:
 *                     type:
 *                     example: Mix the 4 eggs with salt and pepper.
 *                   imageName:
 *                     type: string
 *                     example: scrambled_eggs.jpg
 *                   ingredientIds:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     minItems: 1
 *                     example: [100001, 100002, 100003]
 *                   ingredientAmountsInGram:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     minItems: 1
 *                     example: [50, 1400, 360]
 *       '204':
 *         description: No recipes in database
 */
export const getAllRecipes = (req, res) => {

    Recipe.find()
        .then(recipes => {
            if (recipes) {
                console.log('Recipes found: ' + recipes);
                return res.status(200).json(recipes);
            }
            else {
                console.log('No recipes in database.');
                res.status(204).json('No recipes in database.');
            }
        })
        .catch(error => {
            console.error('Error fetching recipes: ', error);
        });
};


/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Add recipe
 *     description: Add a recipe to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Scrambled Eggs
 *               desc:
 *                 type: string
 *                 example: A simple dish for students.
 *               instructions:
 *                 type:
 *                 example: Mix the 4 eggs with salt and pepper.
 *               imageName:
 *                 type: string
 *                 example: scrambled_eggs.jpg
 *               ingredientIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [100001, 100002, 100003]
 *               ingredientAmountsInGram:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [50, 1400, 360]
 *     responses:
 *       '201':
 *         description: The created recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 name:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: A simple dish for students.
 *                 instructions:
 *                   type:
 *                   example: Mix the 4 eggs with salt and pepper.
 *                 imageName:
 *                   type: string
 *                   example: scrambled_eggs.jpg
 *                 ingredientIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [100001, 100002, 100003]
 *                 ingredientAmountsInGram:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [50, 1400, 360]
 */
export const createRecipe = async (req, res) => {
    //console.log(Object.keys(req));

    const newRecipe = new Recipe({
        name: req.body['name'],
        desc: req.body['desc'],
        instructions: req.body['instructions'],
        imageName: req.body['imageName'],
        ingredientIds: req.body['ingredientIds'],
        ingredientAmountsInGram: req.body['ingredientAmountsInGram']
    });

    // check if recipe already exist

    try {
        const savedRecipe = await newRecipe.save();

        console.log('Recipe saved: ', savedRecipe);
        res.status(201).json(savedRecipe);

    } catch (error) {
        console.error('Error saving recipe: ', error);
    }
};


/**
 * @swagger
 * /recipes/{recipeId}:
 *   patch:
 *     summary: Update recipe
 *     description: Update the information of an existing recipe
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the recipe to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Scrambled Eggs
 *               desc:
 *                 type: string
 *                 example: A simple dish for students.
 *               instructions:
 *                 type:
 *                 example: Mix the 4 eggs with salt and pepper.
 *               imageName:
 *                 type: string
 *                 example: scrambled_eggs.jpg
 *               ingredientIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [100001, 100002, 100003]
 *               ingredientAmountsInGram:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 minItems: 1
 *                 example: [50, 1400, 360]
 *     responses:
 *       '200':
 *         description: The updated recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 name:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: A simple dish for students.
 *                 instructions:
 *                   type:
 *                   example: Mix the 4 eggs with salt and pepper.
 *                 imageName:
 *                   type: string
 *                   example: scrambled_eggs.jpg
 *                 ingredientIds:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [100001, 100002, 100003]
 *                 ingredientAmountsInGram:
 *                   type: array
 *                   items:
 *                     type: integer
 *                   minItems: 1
 *                   example: [50, 1400, 360]
 */
export const updateRecipe = async (req, res) => {
    const recipeId = req.params['id'];

    try {
        const recipe = await Recipe.findByIdAndUpdate(recipeId, {
            name:                    req.body['name'],
            desc:                    req.body['desc'],
            imageName:               req.body['imageName'],
            ingredientIds:           req.body['ingredientIds'],
            ingredientAmountsInGram: req.body['ingredientAmountsInGram']
        }, { new: true });

        console.log('Recipe updated: ', recipe);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error('Error updating recipe: ', error);
    }
};


/**
 * @swagger
 * /recipes/{recipeId}:
 *     delete:
 *       summary: Delete recipe
 *       description: Delete an existing recipe from the database
 *       parameters:
 *         - in: path
 *           name: recipeId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the recipe to delete
 *       responses:
 *         '200':
 *           description: The deleted recipe object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 6486e12e1848915af487e38d
 *                   name:
 *                     type: string
 *                     example: Scrambled Eggs
 *                   desc:
 *                     type: string
 *                     example: A simple dish for students.
 *                   instructions:
 *                     type:
 *                     example: Mix the 4 eggs with salt and pepper.
 *                   imageName:
 *                     type: string
 *                     example: scrambled_eggs.jpg
 *                   ingredientIds:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     minItems: 1
 *                     example: [100001, 100002, 100003]
 *                   ingredientAmountsInGram:
 *                     type: array
 *                     items:
 *                       type: integer
 *                     minItems: 1
 *                     example: [50, 1400, 360]
 */
export const deleteRecipe = async (req, res) => {
    const recipeId = req.params['id'];

    try {
        const recipe = await Recipe.findByIdAndDelete(recipeId);

        console.log('Recipe deleted: ', recipe);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error('Error deleting recipe: ', error);
    }
};