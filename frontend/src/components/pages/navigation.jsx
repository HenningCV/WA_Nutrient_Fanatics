import { Link } from "react-router-dom";

export const Navigation = () => {
    return (
        <div>
            I'm a Navigation
            <ul>
                <li>
                    <Link to="/recipe">Recipe</Link>
                </li>
                <li>
                    <Link to="/recipes">RecipeS</Link>
                </li>
            </ul>
        </div>
    )
}
