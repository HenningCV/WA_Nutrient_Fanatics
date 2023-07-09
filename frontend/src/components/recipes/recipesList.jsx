import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../../styles/recipeList.css';


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
        <div className="main-content">
            { loading && <div className="section-loading">Loading...</div> }
            { error && (
                <div className="section-error">{`There is a problem fetching the recipes - ${error}`}</div>
            )}
            <section className="recipeSection">
                <div className="recipeRow">
                    { recipes && recipes.map((recipe, i) => (
                        <div key={i} className={"recipeContainer"}>
                            <img src={process.env.PUBLIC_URL + "/images/" + recipe["imageName"]} alt={recipe["name"]} className={"recipeImage"} />
                            <div className={"recipeContent"}>
                                <Link to="/recipe" state={{recipeId: recipe["_id"]}} className={"recipeName"} key={i}>{ recipe["name"] }</Link>
                                <p className={"recipeDesc"}>{ recipe["desc"] }</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}
