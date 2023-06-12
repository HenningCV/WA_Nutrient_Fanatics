import { Recipe } from "../models/recipe.js";

import express from "express";

/**
 * @swagger
 * /recipe:
 *     get:
 *       summary: Finds a recipe by its id
 *       description: Retrieves the recipe for a given id from the database
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
                console.log('Recipe not found');
                res.status(204).json("Recipe doesn't exist");
            }
        })
        .catch(error => {
            console.error(error);
        });
};


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
export const createRecipe = async (req, res) => {
    console.log('POST Route reached!');

    //const recipe = req.body;
    console.log(Object.keys(req));
    console.log(req.body.desc);

    const newRecipe = new Recipe({ title: req.body.title,
        desc: req.body.desc,
        date: Date.now() });


    res.status(201).json(newRecipe);

    try {
        const savedRecipe = await newRecipe.save();
        console.log('Recipe saved:', savedRecipe);
        res.status(201).json(savedRecipe);

    } catch (error) {
        console.error('Error saving recipe:', error);
    }
};


export const updateRecipe = async (req, res) => {
    console.log('PATCH Route reached!');

    const recipeId = req.params.id;

    const updatedRecipe = req.body;

    try {
        const recipe = await Recipe.findByIdAndUpdate(recipeId, {
            title: updatedRecipe.email,
            desc: updatedRecipe.password,
            date: Date.now(),
        }, { new: true });

        console.log('Recipe updated:', recipe);
        res.status(200).json(recipe);
    }
    catch (error) {
        console.error('Error updating recipe:', error);
    }
};