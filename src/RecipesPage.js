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
        <>
            <h1>
                This is where the recipes will be displayed
            </h1>
            <h2>
                Your current ingredients: {ingredientsList.join(", ")}
            </h2>
            <button onClick={() => navigate(-1)}>
                Go Back
            </button>
            
            <div className='recipes'>
                <h2 className='display-label'>
                    Your recipe(s) will be displayed below
                </h2>
                <h4> 
                    {recipes.map((title, index) => (
                        <div key={index}>
                            <h3>{recipes[index].title}</h3>
                            <p>Used ingredient count: {recipes[index].usedIngredientCount}</p>
                            <p>Number of ingredients still needed: {recipes[index].missedIngredientCount}</p>
                            <img className="recipePicture" src={recipes[index].image} alt='' />
                        </div>
                    ))}       
                </h4>
            </div>
        </>
    );
};
 
export default RecipesPage;