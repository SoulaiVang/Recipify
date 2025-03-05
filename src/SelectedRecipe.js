import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "./SelectedRecipe.css";
import Navbar from './components/Navbar';

const SelectedRecipe = () =>{

    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const recipe = JSON.parse(queryParams.get('recipe'));
    
    const [adv_information, setadv_information] = useState({});
    const apiKey = process.env.REACT_APP_API_KEY;
  
    // TODO: Store data as to not call API during every render/page refresh
    useEffect(() => {
        const searchAPI = async () => {
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe.title}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true`);
                setadv_information(response.data.results[0] || {});
            } catch(e) {
                console.log("Error fetching recipes:", e);
            }
        };
        searchAPI();
    }, [recipe.title, apiKey]);

    return(
        <>
            <Navbar></Navbar>
            <div className='recipe-page'>
                <button className='go-back' onClick={() => navigate(-1)}>
                    Back to Recipes
                </button>
                <a href={adv_information.sourceUrl} className='recipe-url' target="_blank" rel="noreferrer">Visit Original Recipe's Website</a>
                
                <h1 className='selected-recipe'>
                    {recipe.title}
                </h1>

                <div className='recipe-header'>
                    <img src={adv_information.image} alt={recipe.title} className='recipe-picture'></img>
                    
                        <div className='info-container'>
                            <div className='info'>
                                <img src='./assets/clock.png' alt='An icon of a clock for the preparation time' className='item'></img>
                                <h2 className='item'>Preparation Time (Minutes): {adv_information.readyInMinutes || "NOT AVAILABLE"}</h2>
                            </div>
                            <div className='info'>
                                <img src='./assets/servings.png' alt='An icon of utensils for the number of servings' className='item2'></img>
                                <h2 className='item'>Number of Servings: {adv_information.servings || "NOT AVAILABLE"}</h2>
                            </div>
                        </div>

                        {/* Nutrition Information */}
                        <div className='nutrition-list'>
                            <h2 className='info-label'>Calorie Breakdown:</h2>
                            <h3>Protein: {adv_information.nutrition?.caloricBreakdown?.percentProtein + "%" || "NOT AVAILABLE"}</h3>
                            <h3>Fat: {adv_information.nutrition?.caloricBreakdown?.percentFat + "%" || "NOT AVAILABLE"}</h3>
                            <h3>Carbs: {adv_information.nutrition?.caloricBreakdown?.percentCarbs + "%" || "NOT AVAILABLE"}</h3>
                        </div>
                </div>

                {/* Ingredients */}
                <div className='ingredient-list-info'>
                    <h2 className='info-label'>Ingredients:</h2>
                    <ul>
                        {recipe.missedIngredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.name} - {ingredient.amount} {ingredient.unit}
                            </li>
                        ))}
                        {recipe.usedIngredients.map((ingredient, index) => (
                            <li key={index}>
                                {ingredient.name} - {ingredient.amount} {ingredient.unit}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Instructions */}
                <div className='instructions-list'>
                    <h2 className='list-label'>Instructions:</h2>
                    {
                        Object.keys(adv_information).length === 0 ? (
                            <p>NO INSTRUCTIONS AVAILABLE</p>
                        ) : (
                            adv_information.analyzedInstructions[0].steps.map((step_object, index) => {
                                return(<p key={index}>{step_object.number}. {step_object.step}</p>);
                            })
                        )
                    }
                </div>
            </div>
        </>
    );
    
}

export default SelectedRecipe;