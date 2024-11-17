import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';  
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
            <h3>
              {/* Use Link to navigate to the RecipeDetails page */}
              <Link to={`/recipe/${recipe.id}`}>{recipe.title}</Link>
            </h3>
            <p>{recipe.description}</p>
            {/* You can also add more details here, like ingredients, etc. */}
          </div>
        ))
      )}
    </div>
  );
};

export default RecipeList;



