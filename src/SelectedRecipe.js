import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import Styling from "./SelectedRecipe.css";

const SelectedRecipe = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const recipe = JSON.parse(queryParams.get('recipe'));



    return(
        <div className='recipe-page'>
            <button className='go-back' onClick={() => navigate(-1)}>
                Back to recipes
            </button>
            <h1 className='selected-recipe'>
                {recipe.title}
            </h1>
            <h3 className='ingredients-label'>
                Ingredients:
            </h3>
            <div className='current-ingredients'>
                {recipe.missedIngredients.map((title, index) => (
                    <p>
                        {recipe.missedIngredients[index].name}  -  {recipe.missedIngredients[index].amount} {recipe.missedIngredients[index].unit}
                    </p>
                ))}
                {recipe.usedIngredients.map((title, index) => (
                    <p>
                        {recipe.usedIngredients[index].name}  -  {recipe.usedIngredients[index].amount} {recipe.usedIngredients[index].unit}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default SelectedRecipe;