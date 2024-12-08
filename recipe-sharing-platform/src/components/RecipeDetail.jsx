import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import data from '../data.json';

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate(); // To navigate back to the homepage

  useEffect(() => {
    // Find the recipe by ID
    const selectedRecipe = data.find((recipe) => recipe.id === parseInt(id));
    setRecipe(selectedRecipe);
  }, [id]);

  if (!recipe) {
    return <div>Recipe not found...</div>; // Loading or not found message
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        className="text-blue-500 mb-4"
        onClick={() => navigate('/')} // Go back to the homepage
      >
        Back to Home
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        <div>
          <h1 className="text-4xl font-bold mb-4">{recipe.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{recipe.summary}</p>
          <h2 className="text-2xl font-semibold mb-2">Ingredients:</h2>
          <ul className="list-disc pl-5 mb-4">
            {/* Replace with actual ingredients from the recipe */}
            <li>{recipe.ingredients[0]}</li>
            <li>{recipe.ingredients[1]}</li>
            <li>{recipe.ingredients[2]}</li>
          </ul>
          <h2 className="text-2xl font-semibold mb-2">Cooking Instructions:</h2>
          <ol className="list-decimal pl-5">
            {/* Replace with actual steps from the recipe */}
            <li>{recipe.steps[0]}</li>
            <li>{recipe.steps[1]}</li>
            <li>{recipe.steps[2]}</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
