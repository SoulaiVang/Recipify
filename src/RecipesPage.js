import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';

// import IngredientPage from './IngredientPage';
import './RecipesPage.css';

const RecipesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ingredientsList = queryParams.get('ingredients') ? queryParams.get('ingredients').split(',') : [];

    const [recipes, setRecipes] = useState([]);
  
    //Probably shouldnt use UseEffect because it continuously calls the API
    useEffect(() => {
        const searchAPI = async () => {
            console.log("Recipes Searched")
            try {
                const apiKey = '22823358fa704146b115b682b4ff2505';
                const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsList.join(',')}`);
                setRecipes(response.data);
            } catch(e) {
                console.log("Error fetching recipes:", e);
            }
        };
        searchAPI();
    }, []);
 
    return (
        <div className='page'>
            <button onClick={() => navigate(-1)}>
                Go Back
            </button>
            
            <h1 className='ingredients'>
                Your current ingredients: {ingredientsList.join(", ")}
            </h1>
            
            <div className='recipes'>
                <h2 className='display-label'>
                    Your recipe(s) will be displayed below
                </h2>
                <h4> 
                    {recipes.map((title, index) => (
                        <div key={index}>
                            <h3 className='recipe-title'>{recipes[index].title}</h3>
                            <p>Used ingredient count: {recipes[index].usedIngredientCount}</p>
                            {/* <p>Unused ingredient count: {recipes[index].unusedIngredients.length()}</p> */}
                            <p>Number of ingredients still needed: {recipes[index].missedIngredientCount}</p>
                            <div className='recipe-info'>
                                <img className="recipePicture" src={recipes[index].image} alt='' />
                                <p className='used-ingredients-label'>Used ingredients from list: {recipes[index].usedIngredients.map((missedIngredients, index2) =>(
                                    <p className='used-ingredients'> - {recipes[index].usedIngredients[index2].name}</p>
                                ))}</p>
                                <p className='missing-ingredients-label'>Ingredients still need: {recipes[index].missedIngredients.map((missedIngredients, index2) =>(
                                    <p className='missing-ingredients'> - {recipes[index].missedIngredients[index2].name}</p>
                                ))}</p>
                            </div>
                        </div>
                    ))}     
                </h4>
            </div>
        </div>
    );
};
 
export default RecipesPage;