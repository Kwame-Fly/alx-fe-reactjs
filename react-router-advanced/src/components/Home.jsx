import React from 'react';
import { useAuth } from '../auth';

const Home = () => {
  const { login } = useAuth();
  
  return (
    <div>
      Welcome to the Home Page
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Home;







