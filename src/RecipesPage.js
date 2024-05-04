import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
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
                console.log("data retrieved" + response.data);
            } catch(e) {
                console.log("Error fetching recipes:", e);
            }
        };
        searchAPI();
    }, []);
 
    return (
        <div className='page'>
            <button className='go-back' onClick={() => navigate(-1)}>
                Return to Search
            </button>
            <h1 className='ingredients'>
                Current Ingredients: {ingredientsList.join(", ")}
                <img src='./assets/logo.png' className='logo-recipes' alt='logo'></img>
            </h1>
            
            <div className='recipes'>
                <h2 className='display-label'>
                    See Recipes Below:
                </h2>
                <div className='all-recipes'>
                    {recipes.map((title, index) => (
                        <div className='recipe-overview' key={index}>
                            <h3 className='recipe-title'
                                onClick={() => navigate(`/selected-recipe?recipe=${JSON.stringify(recipes[index])}`)}
                            >{recipes[index].title}</h3>
                            <p className='used-count'>Used ingredient count: {recipes[index].usedIngredientCount} / {recipes[index].usedIngredientCount + recipes[index].missedIngredientCount}</p>
                            <p className='needed-count'>Number of ingredients still needed: {recipes[index].missedIngredientCount}</p>
                            <div className='recipe-info'>
                                <img className="recipe-picture" onClick={() => navigate(`/selected-recipe?recipe=${JSON.stringify(recipes[index])}`)} src={recipes[index].image} alt='recipe' />
                                <div className='ingredients-info'>
                                    <p className='used-ingredients-label'>Used ingredients from list: {recipes[index].usedIngredients.map((missedIngredients, index2) =>(
                                        <p className='used-ingredients'> - {recipes[index].usedIngredients[index2].name}</p>
                                    ))}</p>
                                    <p className='missing-ingredients-label'>Ingredients still needed: {recipes[index].missedIngredients.map((missedIngredients, index2) =>(
                                        <p className='missing-ingredients'> - {recipes[index].missedIngredients[index2].name}</p>
                                    ))}</p>
                                </div>
                            </div>
                        </div>
                    ))}     
                </div>
            </div>
        </div>
    );
};
 
export default RecipesPage;