import React, { useEffect, useState } from 'react';
import './IngredientPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import logo from './assets/logo.png';
import searchIcon from './assets/searchicon.png';
import test from './assets/tomato.png';

const IngredientPage = () => {
  // Used for page redirection
  const navigate = useNavigate();

  // Update recipe list
  const [ingredientsList, setIngredientsList] = useState([]);
  const common_ingredients = [ "Bell Pepper", "Butter", "Chicken", "Eggs", "Garlic", "Ground Beef", "Jasmine Rice", "Lettuce", "Milk", "Olive Oil", "Onion", "Pasta", "Pepper", "Potatoes", "Salt"]

  const handleCheckboxChange = (event, ingredient) => {
    const {checked} = event.target;
    if (checked) { // Checking for an ingredient to get checked 
      setIngredientsList((prevList) => [...prevList, ingredient]); // Add to the list
    } else { // If the ingredient is not checked then keep it out of the list
      removeIngredient(ingredient) // Removes items from the list
    }
  };

  const addIngredient = async () => {
    const ingredientInput = document.querySelector('.add-ingredients-input');
    const newIngredient = ingredientInput.value.trim();

    if (newIngredient !== '') {
      // If ingredient was already added, do nothing. Otherwise, add it to list
      setIngredientsList((prevList) => containsIngredient(newIngredient) ? prevList : [...prevList, newIngredient]); 
      ingredientInput.value = ''; // Clear the input field after adding the ingredient
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredientsList((prevList) => prevList.filter(item => item.toLowerCase() !== ingredient.toLowerCase()))
  }

  const containsIngredient = (ingredient) => {
    // Only checks for case sensitivity
    for (const item of ingredientsList) {
      if (item.toLowerCase() === ingredient.toLowerCase()) {
        return true
      }
    }
    return false
  }

  const resetIngredients = async () => {
    setIngredientsList(() => []);
  }

  // Used to set ingredient images
  const [ingredientImages, setImages] = useState([]);

  const searchAPI = async (ingredient) => {
    console.log("Ingredients Searched")
    try {
        const apiKey = '22823358fa704146b115b682b4ff2505';
        const response = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${apiKey}&query=${ingredient}&number=1`);
        console.log(response.data.results);
        setImages(response.data);
    } catch(e) {
        console.log("Error fetching ingredient:", e);
    }
  };
  
  // To loop through the ingredient list to get each ingredient image
  const setIngredientImages = async () => {
    common_ingredients.forEach(element => {
      searchAPI(element);
    });
  }

  useEffect(() => {
    if (document.readyState !== "loading") {
      const ingredientInput = document.querySelector('.add-ingredients-input');
  
      if (ingredientInput != null) {
        ingredientInput.addEventListener("keydown", function(press) {
          if (press.code === "Enter" || press.code === "Return") {
            addIngredient();
          }
        })
      }
    }

    //setIngredientImages();

  }, [ingredientsList]);

  return (
    <div className="App">
      <div class="header-block">
        <header class="title-header">
          <a href="/" class="title-href">
            <img class="logo" src={logo} alt="Recipeify Logo"></img>
            <span class="title-span">Recipeify: Turning Your Pantry into Recipes</span>
          </a>
        </header>
      </div>
      <div className="main-interface">
        <div className="add-ingredients">
          <div className="search">
            <input
              type="text"
              placeholder="Input ingredients here..."
              className="add-ingredients-input"
            />
            <button className="add-ingredient-button" onClick={addIngredient}></button>
          </div>
          <p className="add-ingredients-instructions">
            Please add one ingredient at a time
          </p>
          <div className='ingredient-checkboxes'>
          {common_ingredients.map((ingredient, index) => (
            <label key={index}>
              {ingredient}
              <img className="ingredient-image" src={test}></img>
              <input 
              type="checkbox" 
              value={ingredient}
              checked={containsIngredient(ingredient)}
              onChange={(event) => handleCheckboxChange(event, ingredient)}
              /> 
              {/* <img className="ingredientImage" src={ingredientImages[0].image} alt=''></img> */}
            </label>
          ))}
          </div>
        </div>
        <div className="right-panel">
          <p className="current-ingredients-label">
            Current Ingredients:
          </p>
          <p className="ingredient-list">
            {ingredientsList.map((ingredient, index) => (
              <span className='selected-ingredient'
                key={index}
                onClick={() => removeIngredient(ingredient)}
                >
                {ingredient}
                <br />
              </span>
            ))}
          </p>
          <button className="clear-ingredients-button" onClick={resetIngredients}>
              Clear Ingredients
          </button>
          <button className="search-button" onClick={() => navigate(`/recipes?ingredients=${ingredientsList.join(',')}`)}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default IngredientPage;
