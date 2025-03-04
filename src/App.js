import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import LandingPage from "./LandingPage";
import RecipesPage from "./RecipesPage";
import IngredientPage from "./IngredientPage";
import SelectedRecipe from "./SelectedRecipe";
 
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={<LandingPage />}
                    />
                    <Route
                        exact
                        path="/lookup"
                        element={<IngredientPage />}
                    />
                    <Route
                        exact
                        path="/recipes"
                        element={<RecipesPage />}
                    />
                    <Route
                        exact
                        path="selected-recipe"
                        element={<SelectedRecipe />}
                    />
                </Routes>
            </BrowserRouter>
        </>
    );
}
 
export default App;