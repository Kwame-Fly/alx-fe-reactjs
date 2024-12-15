// src/components/Search.jsx
import React, { useState } from 'react';
import githubService from '../services/githubService';

const Search = () => {
  const [username, setUsername] = useState('');
  const [location, setLocation] = useState('');
  const [minRepos, setMinRepos] = useState(0);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const handleChange = (event) => {
    if (event.target.name === 'username') setUsername(event.target.value);
    if (event.target.name === 'location') setLocation(event.target.value);
    if (event.target.name === 'minRepos') setMinRepos(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username.trim()) return; // Don't submit if username is empty

    setLoading(true);  // Set loading state to true
    setError(null);    // Clear previous errors
    setUserList([]);   // Clear previous user list

    try {
      const userData = await githubService.fetchUsers({
        username,
        location,
        minRepos,
        page
      });
      setUserList(userData.items);  // Set the user list
    } catch (err) {
      setError("Looks like we can't find any users matching your criteria");  // Error handling
    } finally {
      setLoading(false);  // Set loading state to false after the request is complete
    }
  };

  // Load more functionality for pagination
  const loadMore = async () => {
    setPage(page + 1);
    handleSubmit({ preventDefault: () => {} }); // Re-submit with next page
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-lg font-medium">GitHub Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={handleChange}
            placeholder="Enter GitHub username"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-lg font-medium">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={location}
            onChange={handleChange}
            placeholder="Enter location (optional)"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label htmlFor="minRepos" className="block text-lg font-medium">Minimum Repositories</label>
          <input
            type="number"
            id="minRepos"
            name="minRepos"
            value={minRepos}
            onChange={handleChange}
            placeholder="Enter minimum repositories"
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Search</button>
      </form>

      {/* Displaying results */}
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {/* Display user list */}
      {userList.length > 0 && (
        <div className="mt-4">
          <ul className="space-y-4">
            {userList.map((user) => (
              <li key={user.id} className="p-4 border rounded-md flex items-center space-x-4">
                <img src={user.avatar_url} alt={user.login} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold">{user.login}</h3>
                  <p>{user.location || 'No location provided'}</p>
                  <p>Repositories: {user.public_repos}</p>
                  <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-500">View Profile</a>
                </div>
              </li>
            ))}
          </ul>

          {/* Pagination button */}
          <div className="mt-4 text-center">
            <button
              onClick={loadMore}
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Load More
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
