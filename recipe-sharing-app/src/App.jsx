import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';
import FavoritesList from './components/FavoritesList';  
import RecommendationsList from './components/RecommendationsList';  

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Recipe Sharing App</h1>

        {/* Search Bar */}
        <SearchBar />

        {/* Add Recipe Form */}
        <AddRecipeForm />

        {/* Favorites and Recommendations Section */}
        <FavoritesList />
        <RecommendationsList />

        {/* Routes for navigating between pages */}
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


