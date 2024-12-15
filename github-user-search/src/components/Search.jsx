// src/components/Search.jsx
import React, { useState } from 'react';
import githubService from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim()) return; // Don't submit if input is empty

    setLoading(true);  // Set loading state to true
    setError(null);    // Clear any previous errors
    setUser(null);     // Clear any previously displayed user data

    try {
      const userData = await githubService.fetchUserData(username);
      setUser(userData);  // Set the user data if successful
    } catch (err) {
      setError("Looks like we can't find the user");  // Show error if user is not found
    } finally {
      setLoading(false);  // Set loading state to false after the request is complete
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={handleChange}
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditional Rendering for Loading, Error, and User Data */}
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>} {/* Show error message here */}
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

export default Search;
