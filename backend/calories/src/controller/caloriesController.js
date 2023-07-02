const api_key = 'Xxb4xFDH9WKXigQ6yxhYdknrwHKW2U1kcSlNhAWJ';

/**
 * @swagger
 * /calories/get:
 *   get:
 *     summary: get the diffrent nutrients by fcdId
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
export const searchByFdcId = (req, res) => {

    let fdc_id = req.query['fdcid'];
    let amount = req.query['amount'];

    console.log('Query Parameter: ' + fdc_id);

    fetch(`https://api.nal.usda.gov/fdc/v1/food/${fdc_id}?api_key=${api_key}`)
        .then(response => response.json())
        .then(data => {
            if (data) {
                const foodNutrients = data['foodNutrients'];
                const calorieNutrient = foodNutrients.filter(f => f.nutrient.number === "208");
                const proteinNutrient = foodNutrients.filter(f => f.nutrient.number === "203");
                const fatNutrient = foodNutrients.filter(f => f.nutrient.number === "204");
                const carbNutrient = foodNutrients.filter(f => f.nutrient.number === "205");

                const calories = calorieNutrient[0].amount * 0.01 * amount;
                const protein = proteinNutrient[0].amount * 0.01 * amount;
                const fat = fatNutrient[0].amount * 0.01 * amount;
                const carb = carbNutrient[0].amount * 0.01 * amount;

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
export const searchByName = (req, res) => {

    let ingredient = req.query['food'];
    let amount = req.query['amount']

    console.log('Query parameter: ' + ingredient);

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


                const calories = calorieNutrient[0].value * 0.01 * amount;
                const protein = proteinNutrient[0].value * 0.01 * amount;
                const fat = fatNutrient[0].value * 0.01 * amount;
                const carb = carbNutrient[0].value * 0.01 * amount;

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
