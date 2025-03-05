import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import './RecipesPage.css';
import Navbar from './components/Navbar';

const RecipesPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const ingredientsList = queryParams.get('ingredients') ? queryParams.get('ingredients').split(',') : [];

    const [recipes, setRecipes] = useState([]);
    const apiKey = process.env.REACT_APP_API_KEY;
  
    // TODO: Store data as to not call API during every render/page refresh
    useEffect(() => {
        const searchAPI = async () => {
            console.log("Recipes Searched");
            try {
                const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${apiKey}&ingredients=${ingredientsList.join(',')}`);
                setRecipes(response.data);
                console.log("Data retrieved" + response.data);
            } catch(e) {
                console.log("Error fetching recipes:", e);
            }
        };
        searchAPI();
    }, [ingredientsList, apiKey]);
 
    return (
        <>
            <Navbar></Navbar>
            <div className='page'>
                <button className='go-back' onClick={() => navigate(-1)}>
                    Return to Search
                </button>
                <h1 className='ingredients'>
                    Current Ingredients: {ingredientsList.join(", ")}
                </h1>
                
                <div className='recipes'>
                    <div className='all-recipes'>
                        {recipes.map((title, index) => (

                            <div className='recipe-card' key={index} onClick={() => navigate(`/selected-recipe?recipe=${JSON.stringify(recipes[index])}`)}>

                                <div className='recipe-overview'>
                                    <img className="recipe-picture" onClick={() => navigate(`/selected-recipe?recipe=${JSON.stringify(recipes[index])}`)} src={recipes[index].image} alt={recipes[index].title} />
                                    <div className='recipe-text'>
                                        <h3 className='recipe-title'
                                            onClick={() => navigate(`/selected-recipe?recipe=${JSON.stringify(recipes[index])}`)}
                                        >{recipes[index].title}</h3>
                                        <h4 className='used-count'>Used ingredient count: {recipes[index].usedIngredientCount} / {recipes[index].usedIngredientCount + recipes[index].missedIngredientCount}</h4>
                                        <h4 className='needed-count'>Number of ingredients still needed: {recipes[index].missedIngredientCount}</h4>
                                    </div>
                                </div>
                                
                                <div className='recipe-info'>
                                    <div className='ingredients-info'>

                                        <div className='used-ingredients-container'>
                                            <h5 className='used-ingredients-label'>Used ingredients from list:</h5>
                                            <ul>{recipes[index].usedIngredients.map((missedIngredients, index2) =>(
                                                <li className='used-ingredients' key={index2}>{recipes[index].usedIngredients[index2].name}</li>
                                            ))}</ul>
                                        </div>

                                        <div className='missing-ingredients-container'>
                                            <h5 className='missing-ingredients-label'>Ingredients still needed: </h5>
                                            <ul>{recipes[index].missedIngredients.map((missedIngredients, index2) =>(
                                                <li className='missing-ingredients' key={index2}>{recipes[index].missedIngredients[index2].name}</li>
                                            ))}</ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}     
                    </div>
                </div>
            </div>
        </>
    );
};
 
export default RecipesPage;