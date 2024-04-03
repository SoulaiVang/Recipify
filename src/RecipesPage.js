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
    const [currentRecipe, setRecipe] = useState();
    const [currentRecipePicture, setRecipePicture] = useState();
  
    useEffect(() => {
        console.log(ingredientsList)
        const searchAPI = async () => {
        try {
            const apiKey = 'bda3bd4db6b64554b0f86c009afbccd8';
            const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredientsList.join(',')}`);
            setRecipes(response.data.results);
            setRecipe(response.data.results[0].title);
            setRecipePicture(response.data.results[0].image);
        } catch(e) {
            console.log("Error fetching recipes:", e);
        }
        };
        searchAPI();
    }, [ingredientsList]);
 
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
                {recipes.map((title, index) => (
                    <div key={index}>
                        <h3>{recipes[index].title}</h3>
                        <img className="recipePicture" src={recipes[index].image} alt='No picture' />
                    </div>
                ))}       
            </div>
        </>
    );
};
 
export default RecipesPage;