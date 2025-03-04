import React, { useEffect, useState } from 'react';
import './IngredientPage.css';
import { useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';

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
  }, [addIngredient]);

  return (
      <>
        <Navbar></Navbar>

        <div className="main-interface">
          <div className="add-ingredients">
            <div className="search">
              <input
                type="text"
                placeholder="Input ingredients here..."
                className="add-ingredients-input" />
              <button className="add-ingredient-button" onClick={addIngredient}></button>
            </div>
            <h1>
              Please add one ingredient at a time
            </h1>
            <div className='ingredient-checkboxes'>
              {common_ingredients.map((ingredient, index) => (
                <label
                  key={index}
                  className={`ingredient-label ${containsIngredient(ingredient) ? 'selected' : ''}`}
                >
                  <input
                    type="checkbox"
                    value={ingredient}
                    checked={containsIngredient(ingredient)}
                    onChange={(event) => handleCheckboxChange(event, ingredient)}
                    className="hidden-checkbox" />
                  <img
                    className={`ingredient-image ${containsIngredient(ingredient) ? 'selected' : ''}`}
                    src={addIngredientImage(ingredient)}
                    alt={ingredient} />
                  {ingredient}
                </label>
              ))}
            </div>
          </div>

          <div className="right-panel">
            <h1 className="current-ingredients-label">
              Current Ingredients:
            </h1>
            <ul className="ingredient-list">
              {ingredientsList.map((ingredient, index) => (
                <li className='selected-ingredient'
                  key={index}
                  onClick={() => removeIngredient(ingredient)}
                >
                  {ingredient}
                </li>
              ))}
            </ul>
            <div className="button-container">
              <button className="button clear-ingredients-button" onClick={resetIngredients}>
                Clear
              </button>
              <button className="button search-button" onClick={() => navigate(`/recipes?ingredients=${ingredientsList.join(',')}`)}>
                Search
              </button>
            </div>
          </div>
      </div>
    </>
  );
}

export default IngredientPage;
