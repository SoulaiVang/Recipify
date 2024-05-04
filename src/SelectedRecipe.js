import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "./SelectedRecipe.css";

const SelectedRecipe = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const recipe = JSON.parse(queryParams.get('recipe'));
    
    const [adv_information, setadv_information] = useState({});
  
    //Probably shouldnt use UseEffect because it continuously calls the API
    useEffect(() => {
        const searchAPI = async () => {
            try {
                const apiKey = '22823358fa704146b115b682b4ff2505';
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe.title}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true`);
                setadv_information(response.data.results[0] || {});
            } catch(e) {
                console.log("Error fetching recipes:", e);
            }
        };
        searchAPI();
    }, []);

    return(
        <div className='recipe-page'>
            <button className='go-back' onClick={() => navigate(-1)}>
                Back to Recipes
            </button>
            <a href={adv_information.sourceUrl} className='recipe-url' target="_blank">Visit Original Recipe's Website</a>
            <h1 className='selected-recipe'>
                {recipe.title}
            </h1>
            
            {/* Advanced info(time, servings, nutritional facts) */ }
            <div className='recipe-header'>
                <img src={adv_information.image} alt='Recipe image' className='recipe-picture'></img>
                <div className='basic-info'>
                    <div className='info'>
                        <img src='./assets/clock.png' alt='Servings photo' className='item'></img>
                        <p className='item'>Preparation Time (Minutes): {adv_information.readyInMinutes || "NOT AVAILABLE"} </p>
                    </div>
                    <div className='info'>
                        <img src='./assets/servings.png' alt='Servings photo' className='item2'></img>
                        <p className='item'>Number of Servings: {adv_information.servings || "NOT AVAILABLE"}</p>
                    </div>

                    {/* Nutrition Information */}
                    <div className='nutrition-list'>
                    <h3 className='info-label'>Calorie Breakdown: </h3>
                    <p>Protein Percentage: {adv_information.nutrition?.caloricBreakdown?.percentProtein + "%" || "NOT AVAILABLE"}</p>
                    <p>Fat Percentage: {adv_information.nutrition?.caloricBreakdown?.percentFat + "%" || "NOT AVAILABLE"}</p>
                    <p>Carbohydrates Percentage: {adv_information.nutrition?.caloricBreakdown?.percentCarbs + "%" || "NOT AVAILABLE"}</p>
                    </div>
                </div>

                {/* Ingredients */}
                <div className='ingredient-list-info'>
                    <h3 className='info-label'>
                        Ingredients:
                    </h3>
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

            {/* Instructions */}
            <div className='instructions-list'>
                <h3 className='list-label'>
                    Instructions:
                </h3>
                {
                    Object.keys(adv_information).length === 0 ? (
                        <p>NO INSTRUCTIONS AVAILABLE</p>
                    ) : (
                        adv_information.analyzedInstructions[0].steps.map((step_object) => {
                            return(<p>{step_object.number}. {step_object.step}</p>);
                        })
                    )
                }
            </div>

        </div>
    );
    
}

export default SelectedRecipe;