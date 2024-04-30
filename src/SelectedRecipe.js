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
    // var analyzedInstructions = useState();
  
    //Probably shouldnt use UseEffect because it continuously calls the API
    useEffect(() => {
        const searchAPI = async () => {
            console.log("Recipes Searched")
            try {
                const apiKey = '22823358fa704146b115b682b4ff2505';
                const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${recipe.title}&addRecipeInformation=true&addRecipeInstructions=true&addRecipeNutrition=true`);
                setadv_information(response.data.results[0]);
                // analyzedInstructions = adv_information.analyzedInstructions;
                // console.log(analyzedInstructions[0].steps[0].step)
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
                <p className='item'>Preparation time: {adv_information.readyInMinutes} Minutes</p>
            </div>
            <div className='servings'>
                <img src='./assets/servings.png' alt='clock photo' className='item2'></img>
                <p className='item'>Number of servings: {adv_information.servings}</p>
            </div>
            
            <div className='list'>
                <h3 className='list-label'>Calorie breakdown: </h3>
                <p>{adv_information?.nutrition?.caloricBreakdown?.percentProtein} % Protein</p>
                <p>{adv_information?.nutrition?.caloricBreakdown?.percentFat} % Fat</p>
                <p>{adv_information?.nutrition?.caloricBreakdown?.percentCarbs} % Carbohydrates</p>
            </div>
            
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

            <div className='list'> 
                <h3 className='list-label'>
                    Instructions:
                </h3>
                <p>
                    {adv_information.analyzedInstructions[0].steps[0].number} . {adv_information.analyzedInstructions[0].steps[0].step} 
                </p>
                <p>
                    {adv_information.analyzedInstructions[0].steps[1].number} . {adv_information.analyzedInstructions[0].steps[1].step} 
                </p>
            </div>

            {/* <div className='list'>
                <h3 className='list-label'>
                    Instructions:
                </h3>
                {adv_information.analyzedInstructions[0].steps.map((name, index) => (
                    <p>{name.number} . {name.step}</p>
                ))}
            </div> */}

            <a href={adv_information.sourceUrl} className='recipe-url' target="_blank">Visit Recipe Page</a>

        </div>
    );
}

export default SelectedRecipe;