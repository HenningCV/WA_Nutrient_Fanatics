import {useState, useEffect, useCallback} from "react";
import {useLocation} from "react-router-dom";
import "../../styles/recipeDetails.css"

export const RecipeDetails = () => {

    // States recipe API
    const [recipeName, setRecipeName] = useState("");
    const [recipeDescription, setRecipeDescription] = useState("");
    const [recipeInstructions, setRecipeInstructions] = useState("");
    const [recipeImageName, setRecipeImageName] = useState("");
    const [recipeIngredientIds, setRecipeIngredientIds] = useState([]);
    const [recipeIngredientAmounts, setRecipeIngredientAmounts] = useState([]);

    // States ingredient API
    const [recipeIngredientNames, setRecipeIngredientNames] = useState([]);

    // States nutrients
    const [recipeTotalCalories, setRecipeTotalCalories] = useState(0.0);
    const [recipeTotalProtein, setRecipeTotalProtein] = useState(0.0);
    const [recipeTotalFat, setRecipeTotalFat] = useState(0.0);
    const [recipeTotalCarb, setRecipeTotalCarb] = useState(0.0);
    const [loading, setLoading] = useState(true);

    // IP API 
    const [marketDistance, setMarketDistance] = useState(null);

    // Utils
    const [error, setError] = useState(null);
    const location = useLocation();
    const recipeId = location.state.recipeId;

    // fetching functions
    const fetchIngredients = useCallback(async (fdcIds, amounts) => {
        console.log("Enter fetchIngredients")
        // creating repository arrays
        const ingredientNames = [];
        const ingredientCalories = [];
        const ingredientProteins = [];
        const ingredientFats = [];
        const ingredientCarbs = [];

        let index = 0;

        // Get Information for every fdc id
        for (const fdcId of fdcIds) {
            console.log("Actual fdcId: " + fdcId);
            const data = await fetch(`http://localhost:20075/ingredients/fdcid/${fdcId}`)
            const json = await data.json();

            // Setting information
            const currentAmount = amounts.at(index);
            console.log("Current Amount: " + currentAmount);
            const ingredient = json.ingredient;
            console.log("Actual Ingredient: " + ingredient.toString());
            const ingredientName = ingredient["name"];
            console.log("Actual Name: " + ingredientName);
            const ingredientCalorie = ingredient["kcal"] * 0.01 * currentAmount;
            console.log("Actual Calories: " + ingredientCalorie);
            const ingredientProtein = ingredient["protein_in_g"] * 0.01 * currentAmount;
            console.log("Actual Proteins: " + ingredientProtein);
            const ingredientFat = ingredient["fat_in_g"] * 0.01 * currentAmount;
            console.log("Actual Fats: " + ingredientFat);
            const ingredientCarb = ingredient["carb_in_g"] * 0.01 * currentAmount;
            console.log("Actual Carbs: " + ingredientCarb);

            // Saving information in the repositories
            ingredientNames.push(ingredientName);
            ingredientCalories.push(ingredientCalorie);
            ingredientProteins.push(ingredientProtein);
            ingredientFats.push(ingredientFat);
            ingredientCarbs.push(ingredientCarb);

            index++;
        }

        // Setting total nutrients
        const totalCalories = ingredientCalories.reduce((pv, cv) => pv + cv, 0);
        console.log("total calories: " + totalCalories);
        const totalProteins = ingredientProteins.reduce((pv, cv) => pv + cv, 0);
        console.log("total proteins: " + totalProteins);
        const totalFats = ingredientFats.reduce((pv, cv) => pv + cv, 0);
        console.log("total fats: " + totalFats);
        const totalCarbs = ingredientCarbs.reduce((pv, cv) => pv + cv, 0);
        console.log("total carbs: " + totalCarbs);

        // Applying information
        setRecipeIngredientNames(ingredientNames);
        setRecipeTotalCalories(totalCalories);
        setRecipeTotalProtein(totalProteins);
        setRecipeTotalFat(totalFats);
        setRecipeTotalCarb(totalCarbs);
    }, []);
    const fetchDistance = useCallback(async () => {
        const data = await fetch('http://localhost:20077/ip/calculate-distance');
        const distance = await data.text();
        setMarketDistance(distance);
    }, []);
    const fetchRecipe = useCallback(async (fdcId) => {
        console.log("Enter fetchRecipe")
        const data = await fetch(`http://localhost:20073/recipes/${fdcId}`);
        const json = await data.json();
        console.log("json: " + json);

        // Setting information
        const recipe = json.recipe;
        const recipeName = recipe.name;
        console.log("Recipe Name:" + recipeName)
        const recipeDescription = recipe.desc;
        const recipeInstructions = recipe.instructions;
        const recipeImageName = recipe.imageName;
        const recipeIngredientIds = recipe.ingredientIds;
        console.log("IngredientIds: " + recipeIngredientIds)
        const recipeIngredientAmounts = recipe.ingredientAmountsInGram;

        // Applying information
        setRecipeName(recipeName);
        setRecipeDescription(recipeDescription);
        setRecipeInstructions(recipeInstructions)
        setRecipeImageName(recipeImageName);
        setRecipeIngredientIds(recipeIngredientIds);
        setRecipeIngredientAmounts(recipeIngredientAmounts);

        await fetchIngredients(recipeIngredientIds, recipeIngredientAmounts)
    }, [fetchIngredients]);

    useEffect(() => {
        fetchRecipe(recipeId).then(() => fetchDistance())
            .catch(err => setError(err))
            .finally(() => setLoading(false));
    }, [fetchDistance, fetchRecipe, recipeId])

    return (
        <div className="main-content">
            {loading && <div className="section-loading">Loading...</div>}
            {error && (
                <div className="section-error">{`There is a problem fetching the post data - ${error}`}</div>
            )}
            <section className="section-container" key={"recipePageContent"}>
                <div className="section-group" key={"recipeContent"}>
                    <h1 className="section-main-title" key={"recipeName"}>{recipeName}</h1>
                    <img className="section-image" src={process.env.PUBLIC_URL + "/images/" + recipeImageName} alt={recipeImageName}/>
                    <p className="section-p" key={"recipeDescription"}>{recipeDescription}</p>
                    <h2 className="section-title" key={"instructionsHeader"}>Instructions</h2>
                    <p className="section-p" key={"recipeInstructions"}>{recipeInstructions}</p>
                    <h2 className="section-title" key={"ingredientsHeader"}>Ingredients</h2>
                    <ul className="section-list" key={"ingredientList"}>
                        {recipeIngredientIds && recipeIngredientIds.map((recipeIngredientId, i) => (
                            <li className="section-list-item" key={"ingredientId" + i}>{concatIngredient(recipeIngredientAmounts[i], recipeIngredientNames[i])}</li>
                        ))}
                    </ul>
                    <h2 className="section-title" key={"nutrientsHeader"}>Nutrients</h2>
                    <p className="section-p" key={"calories"}>Calories: {recipeTotalCalories} kcal</p>
                    <p className="section-p" key={"proteins"}>Proteins: {recipeTotalProtein} g</p>
                    <p className="section-p" key={"fat"}>Fats: {recipeTotalFat} g</p>
                    <p className="section-p" key={"carbs"}>Carbs: {recipeTotalCarb} g</p>
                </div>
                <div className="section-group" key={"nearMarketContent"}>
                    <h2 className="section-title" key={"nearMarketHeaderQuestion"}>No ingredients at home?</h2>
                    <p className="section-p" key={"nearMarketHeaderOffering"}>The next market is only {marketDistance}km away from you!</p>
                </div>
        </section>
        </div>
    )
}

function concatIngredient(ingredientAmount, ingredientName) {
    return ingredientAmount + "g " + ingredientName;
}