import React, { useEffect, useState } from 'react';
import './IngredientPage.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const IngredientPage = () => {
  // Used for page redirection
  const navigate = useNavigate();

  // Update recipe list
  const [ingredientsList, setIngredientsList] = useState([]);
  const common_ingredients = ["Eggs", "Chicken", "Jasmine Rice", "Pasta", "Milk", "Bell Pepper", "Potatoes", "Garlic", "Onion", "Olive Oil", "Butter", "Salt", "Pepper", "Lettuce", "Ground Beef"]

  const handleCheckboxChange = (event, ingredient) => {
    const {checked} = event.target;
    if (checked) { // Checking for an ingredient to get checked 
      setIngredientsList((prevList) => [...prevList, ingredient]); // Add to the list
    } else { // If the ingredient is not checked then keep it out of the list
      setIngredientsList((prevList) => prevList.filter(item => item !== ingredient)); // Removes items from the list
    }
  };

  const addIngredient = async () => {
    const ingredientInput = document.querySelector('.add-ingredients-input');
    const newIngredient = ingredientInput.value.trim();

    if (newIngredient !== '') {
      setIngredientsList((prevList) => [...prevList, newIngredient]);
      ingredientInput.value = ''; // Clear the input field after adding the ingredient
    }
  };

  const removeIngredient = (ingredient) => {
    setIngredientsList((prevList) => prevList.filter(item => item !== ingredient))
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

    setIngredientImages();

  }, [ingredientsList]);

  return (
    <div className="App">
      <div class="header-block">
        <header class="title-header">
          <a href="/" class="title-href">
            <span class="title-span">Recipeify: Turning Your Pantry into Recipes</span>
          </a>
        </header>
      </div>
      <div className="main-interface">
        <div className="add-ingredients">
          <input
            type="text"
            placeholder="Input ingredients here..."
            className="add-ingredients-input"
          />
          <p className="add-ingredients-instructions">
            Please add one ingredient at a time
          </p>
          <button className="add-ingredient-button" onClick={addIngredient}>
              Add Ingredient
          </button>
          <div className='ingredient-checkboxes'>
          {common_ingredients.map((ingredient, index) => (
            <label key={index}>
              <input 
              type="checkbox" 
              value={ingredient}
              checked={ingredientsList.includes(ingredient)}
              onChange={(event) => handleCheckboxChange(event, ingredient)}
              /> 
              {ingredient}
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
              <span 
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
