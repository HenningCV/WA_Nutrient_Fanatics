import { useState, useEffect } from "react";

export const RecipesList = () => {

    const [recipes, setRecipes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState(null);

    useEffect(() => {
        fetch('http://localhost:20073/recipes')
            .then(response => response.json())
            .then(data => {
                if (data) {
                    console.log(data);
                    setRecipes(data);
                }
                else {
                    console.log("No Response from http://localhost:20073/recipes");
                }
            })
            .catch(err => setError(err.message))
            .finally(() => setLoading(false))
    }, [])


    return (
        <div>
            <h3>I'm  a recipe list</h3>
            { loading && <div>Loading...</div> }
            { error && (
                <div>{`There is a problem fetching the post data - ${error}`}</div>
            )}
            { recipes && recipes.map((recipe, i) => (
                <p key={i}>
                    { recipe["name"] }
                </p>
            ))}
        </div>
    )
}
