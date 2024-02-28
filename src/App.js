
import './App.css';

function App() {
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
          <button className="add-ingredient-button">Add Ingredient</button>
        </div>
      </div>
    </div>
  );
}

export default App;
