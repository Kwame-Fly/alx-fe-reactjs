// src/components/Search.jsx
import React, { useState } from 'react';
import githubService from '../services/githubService';

const Search = () => {
  // State variables to handle user input and the search results
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState('');
  const [page, setPage] = useState(1); // Initial page is 1
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch user data from GitHub
  const fetchUserData = async () => {
    try {
      setLoading(true); // Show loading spinner/message
      setError(null); // Clear previous errors

      const searchParams = {
        username,
        location,
        minRepos: minRepos ? parseInt(minRepos) : null, // Convert to number if provided
        page,
      };

      const data = await githubService.fetchUsers(searchParams);
      setUsers(data.items); // Update state with fetched users
    } catch (err) {
      setError('Looks like we cant find the user'); // Set error message
    } finally {
      setLoading(false); // Hide loading spinner/message
    }
  };

  // Handle form submit to trigger the API request
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchUserData(); // Call the function to fetch data
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub Username"
          className="p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
          placeholder="Minimum Repositories"
          className="p-2 border border-gray-300 rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Search
        </button>
      </form>

      {/* Display loading message */}
      {loading && <p className="mt-4 text-center">Loading...</p>}

      {/* Display error message */}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}

      {/* Display users if available */}
      {users.length > 0 && (
        <div className="mt-4">
          {users.map((user) => (
            <div key={user.id} className="flex items-center space-x-4 border-b py-4">
              <img src={user.avatar_url} alt={user.login} className="w-12 h-12 rounded-full" />
              <div>
                <h3 className="font-semibold text-lg">{user.login}</h3>
                <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                  View Profile
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
