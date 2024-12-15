import axios from 'axios';

const apiKey = process.env.REACT_APP_GITHUB_API_KEY;

const api = axios.create({
  baseURL: 'https://api.github.com/',
  headers: {
    'Authorization': `Bearer ${apiKey}` 
  }
});
export const getUser = (username) => {
  return api.get(`users/${username}`);
};
