import './App.css';
import {BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Recipes } from "./components/pages/recipes";
import { Recipe } from "./components/pages/recipe";
import { Navigation } from "./components/pages/navigation";


function App() {
    return (
        <div>
            I'm AppJS
            <BrowserRouter>
                <Routes>
                    <Route path="/"        element={ <Navigation /> } />
                    <Route path="/recipes" element={ <Recipes />    } />
                    <Route path="/recipe"  element={ <Recipe />     } />
                    <Route path="*"        element={ <Navigate to="/" /> }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;