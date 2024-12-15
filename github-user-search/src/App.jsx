// src/App.jsx
import React, { useState } from 'react';
import './App.css';
import Search from './components/Search';
import githubService from './services/githubService';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async (username) => {
    setLoading(true);  // Set loading state to true
    setError(null);    // Clear any previous errors
    try {
      const userData = await githubService.fetchUserData(username);
      setUser(userData);  // Set the user data
    } catch (err) {
      setError("Looks like we can't find the user"); // Handle error if user not found
    } finally {
      setLoading(false);  // Set loading state to false after the request is complete
    }
  };

  return (
    <div className="App">
      <Search onSearch={handleSearch} />

      {/* Conditional Rendering */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {user && !loading && !error && (
        <div>
          <img src={user.avatar_url} alt="Avatar" width="100" />
          <h2>{user.name}</h2>
          <p>{user.bio}</p>
          <p>Username: <strong>{user.login}</strong></p>
          <p>
            <a href={user.html_url} target="_blank" rel="noopener noreferrer">
              Visit Profile
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
