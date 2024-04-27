import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "./SelectedRecipe.css";

const SelectedRecipe = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const recipe = JSON.parse(queryParams.get('recipe'));
    
    const [adv_information, setadv_information] = useState([]);
  
    //Probably shouldnt use UseEffect because it continuously calls the API
    useEffect(() => {
        const searchAPI = async () => {
            console.log("Recipes Searched")
            try {
                const apiKey = '22823358fa704146b115b682b4ff2505';
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe.title}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true`);
                setadv_information(response.data.results[0]);
                console.log(adv_information.analyzedInstructions);
            } catch(e) {
                console.log("Error fetching recipes:", e);
            }
        };
        searchAPI();
    }, []);

    return(
        <div className='recipe-page'>
            <button className='go-back' onClick={() => navigate(-1)}>
                Back to recipes
            </button>
            <h1 className='selected-recipe'>
                {recipe.title}
            </h1>
            <p>Preparation time: {adv_information.readyInMinutes} Minutes</p>
            <p>Number of servings: {adv_information.servings}</p>
            
            <p>Calorie breakdown: </p>
            <p>{adv_information?.nutrition?.caloricBreakdown?.percentProtein} % Protein</p>
            <p>{adv_information?.nutrition?.caloricBreakdown?.percentFat} % Fat</p>
            <p>{adv_information?.nutrition?.caloricBreakdown?.percentCarbs} % Carbohydrates</p>
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
            {/* <div className='instructions'> {adv_information.analyzedInstructions[0].steps.map((instruction, index) =>(
                <p className='step'> {adv_information.analyzedInstructions.steps[index].number}</p>
            ))} 
            </div> */}

        </div>
    );
}

export default SelectedRecipe;