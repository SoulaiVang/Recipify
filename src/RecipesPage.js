import React from 'react';
import { useNavigate } from "react-router-dom";

import './IngredientPage.js'
import './RecipesPage.css';

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
            <div className='recipe-display'>
                <p className='display-label'>
                    Your recipe(s) will be displayed below
                </p>
                <p className='recipe'>
                {/* Top Recipe: {currentRecipe} */}
                </p>
                {/* <img className="recipePicture" src={currentRecipePicture} alt='No recipe chosen yet'> */}
                {/* </img> */}
                {/* <button onClick={() => navigate("/recipes")}>
                        Recipes Redirect
                </button> */}
            </div>
        </>
    );
};
 
export default RecipesPage;