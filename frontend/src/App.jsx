import './App.css';
import React from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Recipes from './components/pages/recipes';
import Recipe from './components/pages/recipe'
import AddRecipe from './components/pages/addRecipe';
import Header from './components/Header';

function App() {
    return (
        <Router>
            <div>
                <Header />
                <Routes>
                    <Route exact path="/" element={<Recipes/>} />
                    <Route path="/recipe" element={<Recipe/>} />
                    <Route path="/add-recipe" element={<AddRecipe/>} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;