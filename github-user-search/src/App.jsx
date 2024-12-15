import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Header from './components/Header';
import UserCard from './components/UserCard';

function App() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');

  const handleSearch = () => {
    axios
      .get(`https://api.github.com/users/${username}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  return (
    <div className="App">
      <Header />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
      />
      <button onClick={handleSearch}>Search</button>

      {user && <UserCard user={user} />}
    </div>
  );
}

export default App;
