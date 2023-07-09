import React from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as NutrientFanaticsLogo} from "../assets/nutrient_fanatics_logo.svg";
import '../styles/Header.css'

function Header() {
    return (
        <header className="header">
            <NutrientFanaticsLogo className="logo-svg"/>
            <h1 className="logo">
                <Link to="/" className="logo-link">Nutrient Fanatics</Link>
            </h1>
            <nav className="nav">
                <Link to="/" className="page-link">Recipes</Link>
                <Link to="/add-recipe" className="page-link">Add Recipe</Link>
            </nav>
        </header>
    );
}

export default Header;