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
            console.log("Recipes Searched")
            try {
                const apiKey = '3305701f558f4c9fb84207d5f712276f';
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
                Back to recipes
            </button>
            <h1 className='selected-recipe'>
                {recipe.title}
            </h1>
            
            {/* Advanced info(time, servings, nutritional facts) */ }
            
            <div className='time'>
                <img src='./assets/clock.png' alt='clock photo' className='item'></img>
                <p className='item'>Preparation time(Minutes): {adv_information.readyInMinutes || "NOT AVAILABLE"} </p>
            </div>
            <div className='servings'>
                <img src='./assets/servings.png' alt='clock photo' className='item2'></img>
                <p className='item'>Number of servings: {adv_information.servings || "NOT AVAILABLE"}</p>
            </div>
            
            <div className='list'>
                <h3 className='list-label'>Calorie breakdown: </h3>
                <p>Protein percentage: {adv_information.nutrition?.caloricBreakdown?.percentProtein || "NOT AVAILABLE"}</p>
                <p>Fat percentage: {adv_information.nutrition?.caloricBreakdown?.percentFat || "NOT AVAILABLE"}</p>
                <p>Carbohydrates percentage:{adv_information.nutrition?.caloricBreakdown?.percentCarbs || "NOT AVAILABLE"}</p>
            </div>
            
            {/* Ingredients */}
            <div className='list'>
                <h3 className='list-label'>
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

            {/* Instructions */}
            <div className='list'>
                <h3 className='list-label'>
                    Instructions:
                </h3>
                {
                    Object.keys(adv_information).length === 0 ? (
                        <p>NO INSTRUCTIONS AVAILABLE</p>
                    ) : (
                        adv_information.analyzedInstructions[0].steps.map((step_object) => {
                            console.log("about to map elem:", step_object);
                            return(<p>{step_object.number}. {step_object.step}</p>);
                        })
                    )
                }
            </div>

            <a href={adv_information.sourceUrl} className='recipe-url' target="_blank">Visit Recipe Page</a>

        </div>
    );
    
}

export default SelectedRecipe;