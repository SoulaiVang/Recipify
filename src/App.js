import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
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