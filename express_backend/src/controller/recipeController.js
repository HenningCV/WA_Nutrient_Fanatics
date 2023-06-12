import { Recipe } from "../models/recipe.js";


/**
 * @swagger
 * /recipes/{recipeId}:
 *   get:
 *     summary: Finds a recipe by its id
 *     description: Retrieves the recipe for a given id from the database
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the receipt to get
 *     responses:
 *       '201':
 *         description: A recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 title:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: 4 eggs, salt, pepper
 *                 date:
 *                   type: date
 *                   example: 2023-06-12T09:11:10.303Z
 */
export const getRecipe = (req, res) => {
    const id = req.params.id;

    Recipe.findById(id)
        .then(recipe => {
            if (recipe) {
                console.log('Recipe found: ', recipe.title);
                return res.status(200).json({
                    recipe: recipe
                });
            }
            else {
                console.log('Recipe not found.');
                res.status(204).json("Recipe doesn't exist.");
            }
        })
        .catch(error => {
            console.error('Error fetching recipe: ',error);
        });
};


/**
 * @swagger
 * /recipes:
 *   post:
 *     summary: Add a recipe
 *     description: Add a recipe to the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *     responses:
 *       '201':
 *         description: The created recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 title:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: 4 eggs, salt, pepper
 *                 date:
 *                   type: date
 *                   example: 2023-06-12T09:11:10.303Z
 */
export const createRecipe = async (req, res) => {
    console.log('POST route reached!');
    //console.log(Object.keys(req));

    const newRecipe = new Recipe({ title: req.body.title,
                                    desc: req.body.desc,
                                    date: Date.now() });

    res.status(201).json(newRecipe);

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
 *     summary: Update a recipe
 *     description: Update the information of an existing recipe
 *     parameters:
 *       - in: path
 *         name: recipeId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the receipt to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               desc:
 *                 type: string
 *     responses:
 *       '200':
 *         description: The updated recipe object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 6486e12e1848915af487e38d
 *                 title:
 *                   type: string
 *                   example: Scrambled Eggs
 *                 desc:
 *                   type: string
 *                   example: 4 eggs, salt, pepper
 *                 date:
 *                   type: date
 *                   example: 2023-06-12T09:11:10.303Z
 */
export const updateRecipe = async (req, res) => {
    console.log('PATCH Route reached!');

    const recipeId = req.params.id;

    try {
        const recipe = await Recipe.findByIdAndUpdate(recipeId, {
            title: req.body.title,
             desc: req.body.desc,
             date: Date.now(),
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
 *       summary: Delete a recipe
 *       description: Delete a recipe from the database
 *       parameters:
 *         - in: path
 *           name: recipeId
 *           schema:
 *             type: string
 *           required: true
 *           description: ID of the receipt to delete
 *       responses:
 *         '200':
 *           description: The deleted recipe object
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 6486e12e1848915af487e38d
 *                   title:
 *                     type: string
 *                     example: Scrambled Eggs
 *                   desc:
 *                     type: string
 *                     example: 4 eggs, salt, pepper
 *                   date:
 *                     type: date
 *                     example: 2023-06-12T09:11:10.303Z
 */
export const deleteRecipe = async (req, res) => {
    console.log('DELETE Route reached!');

    const recipeId = req.params.id;

    try {
        const recipe = await Recipe.findByIdAndDelete(recipeId);

        console.log('Recipe deleted: ', recipe);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error('Error deleting recipe: ', error);
    }
};