
const api_key = 'Xxb4xFDH9WKXigQ6yxhYdknrwHKW2U1kcSlNhAWJ';


/**
 * @swagger
 * /usda/search:
 *   get:
 *     summary: Returns ID of an ingredient
 *     description: Returns the USDA-ID of a given ingredient
 *     parameters:
 *       - in: query
 *         name: food
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ingredient of which to get the information of
 *     responses:
 *       '200':
 *         description: ID of the ingredient
 *         content:
 *           text/plain:
 *             schema:
 *               type: int
 *               example: 454004
 *       '204':
 *         description: The given ingredient doesn't exist in the USDA-database
 */
// Get ingredient-ID
export const getIngredientID = (req, res) => {

    let ingredient = req.query['food'];

    console.log('Query parameter: ' + ingredient);

    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${api_key}&query=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const ingredientID = data['foods'][0]['fdcId'];
                console.log('Got fdcID: ' + ingredientID);

                res.status(200).json(ingredientID);
            }
            else {
                res.status(204).json('Ingredient does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching ID: ' + error);
        });
};


/**
 * @swagger
 * /usda/get:
 *   get:
 *     summary: placeholder
 *     description: placeholder
 *     parameters:
 *       - in: query
 *         name: fdcid
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the ingredient of which to get the information of
 *     responses:
 *       '200':
 *         description: placeholder
 *       '204':
 *         description: The given ID doesn't exist in the USDA-database
 */
// Get calories
export const getCalories = (req, res) => {

    let fdc_id = req.query['fdcid'];

    console.log('Query Parameter: ' + fdc_id);

    fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdc_id}?api_key=${api_key}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const foodNutrients = data['foodNutrients'];
                console.log('Fetch result: ' + foodNutrients)

                res.status(200).json(foodNutrients);
            }
            else {
                res.status(204).json('ID does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching ID: ' + error);
        });
};