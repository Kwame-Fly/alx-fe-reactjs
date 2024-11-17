import create from 'zustand';

const useRecipeStore = create(set => ({
  recipes: [],  
  searchTerm: '',  
  setSearchTerm: (term) => set({ searchTerm: term }),  
  filteredRecipes: [],  
  filterRecipes: () => set(state => ({
   
    filteredRecipes: state.recipes.filter(recipe =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(state.searchTerm.toLowerCase()))
    )
  })),
}));

export { useRecipeStore };

