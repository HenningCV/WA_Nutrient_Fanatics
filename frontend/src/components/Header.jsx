import React from 'react';
import { Link } from 'react-router-dom';
import {ReactComponent as NutrientFanaticsLogo} from "../assets/nutrient_fanatics_logo.svg";

function Header() {
    return (
        <header>
            <nav>
                <NutrientFanaticsLogo/>
                <ul>
                    <li>
                        <Link to="/">Recipes</Link>
                    </li>
                    <li>
                        <Link to="/add-recipe">Add Recipe</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;