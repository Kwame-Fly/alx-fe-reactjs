// src/services/githubService.js
import axios from 'axios';

const fetchUsers = async ({ username, location, minRepos, page }) => {
  const query = [
    `in:login ${username}`,  // Basic search by username
    location && `location:${location}`,  // Search by location if provided
    minRepos && `repos:>${minRepos}`  // Search by minimum repos if provided
  ]
    .filter(Boolean)
    .join(' '); // Join non-empty filters into a query string

  const response = await axios.get(`https://api.github.com/search/users`, {
    params: {
      q: query,
      page: page,
      per_page: 10 // Number of results per page
    }
  });

  return response.data;
};

export default { fetchUsers };
