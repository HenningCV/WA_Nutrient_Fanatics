import { useState, useEffect } from "react";

export const RecipesList = () => {

    const[recipes, setRecipes] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:20073/recipes`)
            .then(response => response.json())
            .then(response => {
                if (response) {
                    console.log(response);
                    return <>
                        <div className="recipesList">
                            <p>I'm  a recipe list</p>
                            {
                                response.map(recipe => (
                                    <p>
                                        { recipe.toString() }
                                    </p>
                                ))
                            }
                        </div>
                    </>;
                }
            })
    }, [])
}
