import React, { useEffect } from 'react';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.filteredRecipes);  
  const filterRecipes = useRecipeStore(state => state.filterRecipes);

  useEffect(() => {
    filterRecipes();  
  }, [filterRecipes]);

  return (
    <div>
      {recipes.length === 0 ? (
        <p>No recipes found</p>
      ) : (
        recipes.map(recipe => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            {/* Add additional details like ingredients, preparation time, etc. */}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;


