import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  //Update recipe list
  const [ingredientsList, setIngredientsList] = useState([]);
  const currentIngredients = ingredientsList.join(', ');

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

  const addIngredient = () => {
    const ingredientInput = document.querySelector('.add-ingredients-input');
    const newIngredient = ingredientInput.value.trim();

    if (newIngredient !== '') {
      setIngredientsList((prevList) => [...prevList, newIngredient]);
      ingredientInput.value = ''; // Clear the input field after adding the ingredient
    }
    // when ingredients are updated then make an API Call
    searchAPI();  // RONG  :(
  };

  //Search for recipes
  async function searchAPI() {
    try {
      const apiKey = '45370c22079c4c5cb7ab5fd76b5711d6';
      console.log("about to make request with ingredients:", ingredientsList)
      let response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&includeIngredients=${ingredientsList}`)
      console.log("got response", response);
      console.log("all titles", response.data.results.map(elem => elem.title));
      // setRecipe(response.data.results[1].title)
    } catch(e) {
      console.log("there was an ERROR!!!!", e);
    }
  }
  // useEffect(() => {
  //   searchAPI();
  // }, []);

  return (
    <div className="App">
      <div className="App-header">
        <h1>
          Welcome to the recipe finder!
        </h1>
      </div>
      <div className="App-content">
        <p>
          Input ingredients here: 
        </p>
        <div className="add-ingredients">
          <input
            type="text"
            placeholder="Type ingredients here"
            className="add-ingredients-input"
          />
          <p className="add-ingredients-instructions">
            Please add one ingredient at a time
          </p>
          <button className="add-ingredient-button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>
        <p>
          Your recipes will be displayed below
        </p>
        {/* Displaying the ingredient list */}
        <div className="show-ingredients">
          <p>
            Your current ingredients are: {currentIngredients}
          </p>
        </div>
        
      </div>
    </div>
  );
}

export default App;
