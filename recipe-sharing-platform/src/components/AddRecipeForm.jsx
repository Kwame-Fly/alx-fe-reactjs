import React, { useState } from 'react';

const AddRecipeForm = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [steps, setSteps] = useState('');
  const [errors, setErrors] = useState({});

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const validationErrors = {};

    if (!title) validationErrors.title = 'Title is required.';
    if (!ingredients) validationErrors.ingredients = 'Ingredients are required.';
    if (!steps) validationErrors.steps = 'Preparation steps are required.';
    else if (ingredients.split('\n').length < 2)
      validationErrors.ingredients = 'Please add at least two ingredients.';

    if (Object.keys(validationErrors).length === 0) {
      const newRecipe = {
        title,
        ingredients: ingredients.split('\n'),
        steps: steps.split('\n'),
      };
      // In a real application, you would likely send this data to a server.
      console.log('New Recipe Added:', newRecipe);
      alert('Recipe added successfully!');
      // Clear the form
      setTitle('');
      setIngredients('');
      setSteps('');
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="max-w-lg mx-auto px-4 py-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold mb-6 text-center">Add a New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Recipe Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
        </div>

        {/* Ingredients */}
        <div>
          <label htmlFor="ingredients" className="block text-lg font-medium mb-2">Ingredients (one per line)</label>
          <textarea
            id="ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.ingredients && <p className="text-red-500 text-sm">{errors.ingredients}</p>}
        </div>

        {/* Preparation Steps */}
        <div>
          <label htmlFor="steps" className="block text-lg font-medium mb-2">Preparation Steps (one per line)</label>
          <textarea
            id="steps"
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.steps && <p className="text-red-500 text-sm">{errors.steps}</p>}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Recipe
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;
