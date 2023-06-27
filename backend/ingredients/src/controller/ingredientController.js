import { Ingredient } from "../models/ingredientsModel.js";


/**
 * @swagger
 * /ingredients/{fdcId}:
 *   get:
 *     summary: Finds an ingredient by its fdcId
 *     description: Retrieves the ingredient for a given id from the database
 *     parameters:
 *       - in: path
 *         name: fdcId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ingredient to get
 *     responses:
 *       '200':
 *         description: An ingredient object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fdcId:
 *                   type: Number
 *                   example: 454004
 *                 name:
 *                   type: string
 *                   example: Apple
 *                 kcal:
 *                   type: Number
 *                   example: 52.0
 *                 protein_in_g:
 *                   type: Number
 *                   example: 0.0
 *                 fat_in_g:
 *                   type: Number
 *                   example: 0.65
 *                 carb_in_g:
 *                   type: Number
 *                   example: 14.3
 *       '204':
 *         description: No ingredient for the given ID was found
 */
export const getIngredient = (req, res) => {
    const id = req.params['fdcId'];

    Ingredient.find({fdcId: id})
        .then(ingredient => {
            if (ingredient) {
                console.log('Ingredient found: ', ingredient['name']);
                return res.status(200).json({ ingredient: ingredient });
            }
            else {
                console.log('Ingredient not found.');
                res.status(204).json('Ingredient does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching Ingredient: ',error);
        });
};


/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Finds all ingredients
 *     description: Retrieves all ingredients in the database
 *     parameters:
 *     responses:
 *       '200':
 *         description: Ingredient objects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   fdcId:
 *                     type: Number
 *                     example: 454004
 *                   name:
 *                     type: string
 *                     example: Apple
 *                   kcal:
 *                     type: Number
 *                     example: 52.0
 *                   protein_in_g:
 *                     type: Number
 *                     example: 0.0
 *                   fat_in_g:
 *                     type: Number
 *                     example: 0.65
 *                   carb_in_g:
 *                     type: Number
 *                     example: 14.3
 *       '204':
 *         description: No ingredients found
 */
export const getAllIngredients = (req, res) => {
    Ingredient.find({})
        .then(ingredients => {
            if (ingredients) {
                console.log('Ingredients found: ', ingredients);
                return res.status(200).json({ ingredients: ingredients });
            }
            else {
                console.log('Ingredient not found.');
                res.status(204).json('Ingredients do not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching Ingredient: ',error);
        });
};


/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Add an ingredient
 *     description: Add an ingredient to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fdcId:
 *                 type: Number
 *               name:
 *                 type: string
 *               kcal:
 *                 type: Number
 *               protein_in_g:
 *                 type: Number
 *               fat_in_g:
 *                 type: Number
 *               carb_in_g:
 *                 type: Number
 *     responses:
 *       '201':
 *         description: The created ingredient object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fdcId:
 *                   type: ObjectId
 *                   example: 454004
 *                 name:
 *                   type: string
 *                   example: Apple
 *                 kcal:
 *                   type: Number
 *                   example: 52.0
 *                 protein_in_g:
 *                   type: Number
 *                   example: 0.0
 *                 fat_in_g:
 *                   type: Number
 *                   example: 0.65
 *                 carb_in_g:
 *                   type: Number
 *                   example: 14.03
 */
export const createIngredient = async (req, res) => {

    const newIngredient = new Ingredient({
        fdcId: req.body['fdcId'],
        name: req.body['name'],
        kcal: req.body['kcal'],
        protein_in_g: req.body['protein_in_g'],
        fat_in_g: req.body['fat_in_g'],
        carb_in_g: req.body['carb_in_g']
    });

    try {
        const savedIngredient = await newIngredient.save();

        console.log('Ingredient saved: ', savedIngredient);
        res.status(201).json(savedIngredient);

    } catch (error) {
        console.error('Error saving recipe: ', error);
    }
};


/**
 * @swagger
 * /ingredients/{fdcId}:
 *   delete:
 *     summary: Delete an ingredient by its fdcId
 *     description: Retrieves the ingredient for a given id from the database
 *     parameters:
 *       - in: path
 *         name: fdcId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ingredient to delete
 *     responses:
 *       '200':
 *         description: An ingredient object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fdcId:
 *                   type: Number
 *                   example: 454004
 *                 name:
 *                   type: string
 *                   example: Apple
 *                 kcal:
 *                   type: Number
 *                   example: 52.0
 *                 protein_in_g:
 *                   type: Number
 *                   example: 0.0
 *                 fat_in_g:
 *                   type: Number
 *                   example: 0.65
 *                 carb_in_g:
 *                   type: Number
 *                   example: 14.3
 *       '204':
 *         description: No ingredient for the given ID was found
 */
export const deleteIngredient = async (req, res) => {
    const fdcId = req.params['fdcId'];

    try {
        const ingredient = await Ingredient.findOneAndDelete({fdcId: fdcId});

        console.log('Recipe deleted: ', ingredient);
        res.status(200).json(ingredient);
    }
    catch (error) {
        console.error('Error deleting recipe: ', error);
    }
};