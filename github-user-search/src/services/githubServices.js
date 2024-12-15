// src/services/githubService.js
import axios from 'axios';

const fetchUserData = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data; // return the user data
  } catch (error) {
    throw new Error("User not found");
  }
};

export default { fetchUserData };
