import React, { useEffect, useState } from 'react';
import './IngredientPage.css';
import axios from 'axios';

function App() {
  // Update recipe list
  const [ingredientsList, setIngredientsList] = useState([]);
  // const currentIngredients = ingredientsList.join(', ');

  const addIngredient = async () => {
    const ingredientInput = document.querySelector('.add-ingredients-input');
    const newIngredient = ingredientInput.value.trim();

    if (newIngredient !== '') {
      setIngredientsList((prevList) => [...prevList, newIngredient]);
      ingredientInput.value = ''; // Clear the input field after adding the ingredient
    }
  };

  const resetIngredients = async () => {
    setIngredientsList(() => []);
    setRecipe("No recipes found.");
    setRecipePicture("");
  }

  //Search for recipes
  const [currentRecipe, setRecipe] = useState();
  const [currentRecipePicture, setRecipePicture] = useState();

  const searchAPI = async () => {
    try {
      const apiKey = '45370c22079c4c5cb7ab5fd76b5711d6';
      console.log("about to make request with ingredients:", ingredientsList)
      let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredientsList}`)
      console.log("got response", response);
      /*Reference below to access data
      console.log("all titles", response.data.results.map(elem => elem.title));*/
      if (response.data.results.length > 0) {
        setRecipe(response.data.results[0].title);
        setRecipePicture(response.data.results[0].image);
      } else {
        setRecipe('No recipes found');
      }
    } catch(e) {
      console.log("there was an ERROR!!!!", e);
    }
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
      <div className="App-header">
        <h1>
          Welcome to the Recipe Finder!
        </h1>
      </div>
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
      </div>

      {/* Right Panel for ingredients */}
      <div className="right-panel">
        <p className="current-ingredients-label">
          Current Ingredients:
        </p>
        <p className="ingredient-list">
          {ingredientsList.map((ingredient, index) => (
            <span key={index}>
              {ingredient}
              <br />
            </span>
          ))}
        </p>
        <button className="clear-ingredients-button" onClick={resetIngredients}>
            Clear Ingredients
        </button>
        <button className="search-button" onClick={searchAPI}>
          Search
        </button>
      </div>
      <div className='recipe-display'>
        <p className='display-label'>
              Your recipe will be displayed below
        </p>
        <p className='recipe'>
          Top Recipe: {currentRecipe}
        </p>
        <img className="recipePicture" src={currentRecipePicture} alt='No recipe chosen yet'>
        </img>
      </div>

      <div className='ingredient-checkboxes'>
        <label>
          <input type="checkbox" value=""/>Eggs
        </label>
        <label>
          <input type="checkbox" value=""/>Chicken
        </label>
        <label>
          <input type="checkbox" value=""/>Jasmine Rice
        </label>
        <label>
          <input type="checkbox" value=""/>Pasta
        </label>
        <label>
          <input type="checkbox" value=""/>Milk
        </label>
        <label>
          <input type="checkbox" value=""/>Bell Pepper
        </label>
        <label>
          <input type="checkbox" value=""/>Potatoes
        </label>
        <label>
          <input type="checkbox" value=""/>Garlic
        </label>
        <label>
          <input type="checkbox" value=""/>Onion
        </label>
      </div>
    </div>
  );
}

export default App;
