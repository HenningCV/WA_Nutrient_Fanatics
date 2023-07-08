const api_key = 'Xxb4xFDH9WKXigQ6yxhYdknrwHKW2U1kcSlNhAWJ';

/**
 * @swagger
 * /calories/get:
 *   get:
 *     summary: get the different nutrients of an ingredient by its fcdid
 *     description: get the different nutrients of an ingredient by its fcdid
 *     parameters:
 *       - in: path
 *         name: fdcid
 *         schema:
 *           type: string
 *         required: true
 *         description: id of the ingredient for its nutrients
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
 *         description: The given ID doesn't exist in the USDA-database
 */
// Get calories
export const searchByFdcId = (req, res) => {

    const fdc_id = req.params['fdcid'];

    console.log('Parameter: ' + fdc_id);

    fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdc_id}?api_key=${api_key}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const foodNutrients = data['foodNutrients'];
                const calorieNutrient = foodNutrients.filter(f => f.nutrient.number === "208");
                const proteinNutrient = foodNutrients.filter(f => f.nutrient.number === "203");
                const fatNutrient = foodNutrients.filter(f => f.nutrient.number === "204");
                const carbNutrient = foodNutrients.filter(f => f.nutrient.number === "205");

                const calories = calorieNutrient[0].amount;
                const protein = proteinNutrient[0].amount;
                const fat = fatNutrient[0].amount;
                const carb = carbNutrient[0].amount;

                console.log(`calories: ${calorieNutrient[0].amount}`);
                console.log(`protein: ${proteinNutrient[0].amount}`);
                console.log(`fat: ${fatNutrient[0].amount}`);
                console.log(`carb: ${carbNutrient[0].amount}`);
                console.log('Fetch result: ' + foodNutrients);

                res.status(200).json({
                    kcal: calories,
                    protein_in_g: protein,
                    fat_in_g: fat,
                    carb_in_g: carb
                });
            } else {
                res.status(204).json('ID does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching ID: ' + error);
        });
};


/**
 * @swagger
 * /usda/search:
 *   get:
 *     summary: returns nutrients for the asked ingredient
 *     description: returns nutrients for the asked ingredient
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: name of the ingredient of which to get the nutrients
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
 *         description: The given ingredient doesn't exist in the USDA-database
 */
// Get ingredient-ID
export const searchByName = (req, res) => {

    const ingredient = req.params['name'];

    console.log('Parameter: ' + ingredient);

    fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${api_key}&query=${ingredient}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const ingredientID = data['foods'][0]['fdcId'];
                const ingredientDescription = data['foods'][0]['description'];
                console.log('Got fdcId: ' + ingredientID);
                console.log(`Got decribtion: ${ingredientDescription}`)

                const foods = data['foods'];
                const foodNutrients = foods[0].foodNutrients;
                const calorieNutrient = foodNutrients.filter(f => f.nutrientNumber == "208");
                const proteinNutrient = foodNutrients.filter(f => f.nutrientNumber == "203");
                const fatNutrient = foodNutrients.filter(f => f.nutrientNumber == "204");
                const carbNutrient = foodNutrients.filter(f => f.nutrientNumber == "205");


                const calories = calorieNutrient[0].value;
                const protein = proteinNutrient[0].value;
                const fat = fatNutrient[0].value;
                const carb = carbNutrient[0].value;

                console.log(`Calories: ${calories}`);
                console.log(`Proteins: ${protein}`);
                console.log(`Fat: ${fat}`);
                console.log(`Carbs: ${carb}`);

                res.status(200).json({
                    fdcId: ingredientID,
                    name: ingredientDescription,
                    kcal: calories,
                    protein_in_g: protein,
                    fat_in_g: fat,
                    carb_in_g: carb
                });
            } else {
                res.status(204).json('Ingredient does not exist.');
            }
        })
        .catch(error => {
            console.error('Error fetching ID: ' + error);
        });
};
