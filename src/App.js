import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import { useState } from 'react';
import RecipesPage from "./RecipesPage";
import IngredientPage from "./IngredientPage";
 

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
                </Routes>
            </BrowserRouter>
        </>
    );
}
 
export default App;