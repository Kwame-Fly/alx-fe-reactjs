import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import AddRecipeForm from './components/AddRecipeForm';
import RecipeDetails from './components/RecipeDetails';
import SearchBar from './components/SearchBar';  

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Recipe Sharing App</h1>

        {/* Add SearchBar to filter recipes */}
        <SearchBar />

        {/* Add Recipe Form */}
        <AddRecipeForm />

        {/* Define Routes */}
        <Routes>
          <Route path="/" element={<RecipeList />} />  {/* This will display the filtered recipes */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


