import { Ingredient } from "../models/ingredientsModel.js";


/**
 * @swagger
 * /ingredient/{fdcId}:
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
 *                   example: 14.3
 *
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
 * /ingredient:
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
 *                 type: ObjectId
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
        protein_in_g: req.body['protein in g'],
        fat_in_g: req.body['fat in g'],
        carb_in_g: req.body['carb in g']
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
 * /ingredient/{fdcId}:
 *     delete:
 *       summary: Delete an ingredient
 *       description: Delete a ingredient from the database
 *       parameters:
 *         - in: path
 *           name: fdcId
 *           schema:
 *             type: ObjectId
 *           required: true
 *           description: fdcID of the ingredient to delete
 *       responses:
 *         '200':
 *           description: The deleted ingredient object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   fdcId:
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