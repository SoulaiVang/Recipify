import React, { useEffect, useState } from 'react';
import './IngredientPage.css';
import { useNavigate } from "react-router-dom";

const IngredientPage = () => {
  // Used for page redirection
  const navigate = useNavigate();

  // Update recipe list
  const [ingredientsList, setIngredientsList] = useState([]);
  const common_ingredients = ["Beef", "Bell Pepper", "Butter", "Chicken", "Eggs", "Garlic", "Lettuce", "Milk", "Olive Oil", "Onion", "Pasta", "Pepper", "Potatoes", "Rice", "Salt"]

  const handleCheckboxChange = (event, ingredient) => {
    const {checked} = event.target;
    if (checked) { // Checking for an ingredient to get checked 
      setIngredientsList((prevList) => [...prevList, ingredient]); // Add to the list
    } else { // If the ingredient is not checked then keep it out of the list
      removeIngredient(ingredient) // Removes items from the list
    }
  };

  const addIngredientImage = (ingredient) => {
    let newIngredient = '/assets/' + ingredient.toLowerCase().split(" ").join("") + '.png';
    console.log(newIngredient);
    return newIngredient;
  }

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
  }, [ingredientsList]);

  return (
    <div className="App">
      <div class="header-block">
        <header class="title-header">
          <a href="/" class="title-href">
            <img class="logo" src='../assets/logo.png' alt="Recipeify Logo"></img>
            <span className="title-span">Recipeify: Turning Your Pantry into Recipes</span>
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
              <img className="ingredient-image" src={addIngredientImage(ingredient)} alt='ingredient placeholder'></img>
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
