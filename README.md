# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

# Recipeify App

Recipeify is a web application that helps users find recipes based on the ingredients they have at hand. This README provides an overview of the main components of the application.

## Components

### IngredientPage Component

The IngredientPage component allows users to select ingredients for recipe search.

### Features

Ingredient Selection: Users can select ingredients from a predefined list or manually add new ones.

Dynamic UI Updates: The UI updates dynamically as ingredients are added or removed.
Search Functionality: Users can search for recipes based on the selected ingredients.

Responsive Design: The component is designed to adapt to various screen sizes.

## RecipesPage Component

The RecipesPage component displays recipes based on the selected ingredients.

### Features
Recipe Search: Utilizes the Spoonacular API to search for recipes based on the selected ingredients.

Dynamic Rendering: Renders recipe information dynamically based on the API response.
Navigation: Users can navigate back to ingredient selection or view detailed recipe information.

## SelectedRecipe Component

The SelectedRecipe component displays detailed information about a selected recipe.

## Features
Recipe Details: Displays the title and list of ingredients for the selected recipe.
Navigation: Provides a button to navigate back to the recipes page.

## Dependencies

React: The application is built using React, a JavaScript library for building user interfaces.

react-router-dom: Used for client-side routing within the React application.

## Installation

Ensure that you have Node.js and npm (or yarn) installed on your system. Then, follow these steps:

Clone the repository.
Navigate to the project directory.
Install dependencies using npm install or yarn install.

## Usage

To use the application, follow these steps:

Start the development server using npm start or yarn start.
Navigate to the application URL in your web browser.
Select ingredients on the Ingredient Page.
View recipes on the Recipes Page.
Click on a recipe to view detailed information on the Selected Recipe Page.

## Styling

The application utilizes CSS for styling. 

Background Color: Sets the background color of the page.
Header Block: Styling for the title and logo header.
Add Ingredients: Styling for the ingredient selection section.
Right Panel: Styling for the panel displaying current ingredients and search button.

Feel free to explore the CSS file for more detailed styling information.

## Contributing

Contributions are welcome! 

## License

This project is licensed under the MIT License.
