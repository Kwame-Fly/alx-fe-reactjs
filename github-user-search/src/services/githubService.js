// src/services/githubService.js
import axios from 'axios';

/**
 * Fetch users from GitHub using advanced search criteria.
 * @param {Object} params - The search parameters.
 * @param {string} params.username - GitHub username to search for.
 * @param {string} [params.location] - Location filter for users.
 * @param {number} [params.minRepos] - Minimum number of repositories.
 * @param {number} params.page - The current page of results to fetch.
 * @returns {Promise<Object>} - The search results.
 */
const fetchUsers = async ({ username, location, minRepos, page }) => {
  // Construct the search query based on input parameters
  const query = [
    `in:login ${username}`,  // Search by username in the login field
    location && `location:${location}`,  // Search by location if provided
    minRepos && `repos:>${minRepos}`  // Search by minimum repositories if provided
  ]
    .filter(Boolean)  // Filter out undefined values
    .join(' ');  // Join valid filters into a single query string

  try {
    // Send GET request to the GitHub API's search users endpoint
    const response = await axios.get('https://api.github.com/search/users', {
      params: {
        q: query,  // Pass the constructed query string
        page: page,  // Pagination parameter
        per_page: 10  // Results per page
      }
    });

    // Return the data from the API response
    return response.data;
  } catch (error) {
    // Handle errors (e.g., network issues, API issues)
    throw new Error('Failed to fetch users: ' + error.message);
  }
};

export default { fetchUsers };
