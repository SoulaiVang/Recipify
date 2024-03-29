import React from 'react';
import { useNavigate } from "react-router-dom";

import './IngredientPage.js'

const RecipesPage = () => {
    const navigate = useNavigate();
 
    return (
        <>
            <h1>
                This is where the recipes will be displayed
            </h1>
            <button onClick={() => navigate(-1)}>
                Go Back
            </button>
        </>
    );
};
 
export default RecipesPage;