import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  return <div>Welcome to {username}'s profile!</div>;
};

export default UserProfile;