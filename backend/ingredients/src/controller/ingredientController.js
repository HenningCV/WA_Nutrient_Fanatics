import {Ingredient} from "../models/ingredientsModel.js";


/**
 * @swagger
 * /ingredients/fdcid/{fdcid}:
 *   get:
 *     summary: Finds an ingredient by its fdcId
 *     description: Retrieves the ingredient for a given id from the database
 *     parameters:
 *       - in: path
 *         name: fdcId
 *         schema:
 *           type: string
 *         required: true
 *         description: fdcid of the ingredient to get
 *     responses:
 *       '200':
 *         description: An ingredient object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fdcId:
 *                   type: string
 *                   example: 454004
 *                 name:
 *                   type: string
 *                   example: Apple
 *                 kcal:
 *                   type: number
 *                   example: 52.0
 *                 protein_in_g:
 *                   type: number
 *                   example: 0.0
 *                 fat_in_g:
 *                   type: number
 *                   example: 0.65
 *                 carb_in_g:
 *                   type: number
 *                   example: 14.3
 */
export const getIngredient = (req, res) => {
    const id = req.params['fdcid'];

    Ingredient.findOne({fdcId: id})
        .then(ingredient => {
            if (ingredient) {
                console.log('Ingredient found: ', ingredient['name']);
                return res.status(200).json({ingredient: ingredient});
            } else {
                console.log('Ingredient not found.');
                res.status(204).json('Ingredient does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching Ingredient: ', error);
        });
};

/**
 * @swagger
 * /ingredients/name/{name}:
 *   get:
 *     summary: Finds an ingredient by its name
 *     description: Retrieves the ingredient for a given name from the database
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: name of the ingredient to get
 *     responses:
 *       '200':
 *         description: An ingredient object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fdcId:
 *                   type: string
 *                   example: 454004
 *                 name:
 *                   type: string
 *                   example: Apple
 *                 kcal:
 *                   type: number
 *                   example: 52.0
 *                 protein_in_g:
 *                   type: number
 *                   example: 0.0
 *                 fat_in_g:
 *                   type: number
 *                   example: 0.65
 *                 carb_in_g:
 *                   type: number
 *                   example: 14.3
 */
export const getIngredientByName = (req, res) => {
    const name = req.params['name'];

    Ingredient.findOne({name: name})
        .then(ingredient => {
            if (ingredient) {
                console.log('Ingredient found: ', ingredient['name']);
                return res.status(200).json({ingredient: ingredient});
            } else {
                console.log('Ingredient not found.');
                res.status(204).json('Ingredient does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching Ingredient: ', error);
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
 *                     type: string
 *                     example: 454004
 *                   name:
 *                     type: string
 *                     example: Apple
 *                   kcal:
 *                     type: number
 *                     example: 52.0
 *                   protein_in_g:
 *                     type: number
 *                     example: 0.0
 *                   fat_in_g:
 *                     type: number
 *                     example: 0.65
 *                   carb_in_g:
 *                     type: number
 *                     example: 14.3
 */
export const getAllIngredients = (req, res) => {
    Ingredient.find({})
        .then(ingredients => {
            if (ingredients) {
                console.log('Ingredients found: ', ingredients);
                return res.status(200).json({ingredients: ingredients});
            } else {
                console.log('Ingredient not found.');
                res.status(204).json('Ingredients do not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching Ingredient: ', error);
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
 *                 type: string
 *               name:
 *                 type: string
 *               kcal:
 *                 type: number
 *               protein_in_g:
 *                 type: number
 *               fat_in_g:
 *                 type: number
 *               carb_in_g:
 *                 type: number
 *     responses:
 *       '201':
 *         description: The created ingredient object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 fdcId:
 *                   type: string
 *                   example: 454004
 *                 name:
 *                   type: string
 *                   example: Apple
 *                 kcal:
 *                   type: number
 *                   example: 52.0
 *                 protein_in_g:
 *                   type: number
 *                   example: 0.0
 *                 fat_in_g:
 *                   type: number
 *                   example: 0.65
 *                 carb_in_g:
 *                   type: number
 *                   example: 14.03
 *
 */
export const createIngredient = async (req, res) => {

        const fdcId = req.body['fdcId'];

    const newIngredient = new Ingredient({
        fdcId: req.body['fdcId'],
        name: req.body['name'],
        kcal: req.body['kcal'],
        protein_in_g: req.body['protein_in_g'],
        fat_in_g: req.body['fat_in_g'],
        carb_in_g: req.body['carb_in_g']
    });

    const ingredientAlreadyExists = await Ingredient.exists({fdcId: fdcId});

    try {
        if (ingredientAlreadyExists) {
            console.log('Ingredient already exists');
            res.status(202).send('Ingredient already exists');
        } else {
            const savedIngredient = await newIngredient.save();

            console.log('Ingredient saved: ', savedIngredient);
            res.status(201).json(savedIngredient);
        }


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
 *                   type: string
 *                   example: 454004
 *                 name:
 *                   type: string
 *                   example: Apple
 *                 kcal:
 *                   type: number
 *                   example: 52.0
 *                 protein_in_g:
 *                   type: number
 *                   example: 0.0
 *                 fat_in_g:
 *                   type: number
 *                   example: 0.65
 *                 carb_in_g:
 *                   type: number
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
    } catch (error) {
        console.error('Error deleting recipe: ', error);
    }
};