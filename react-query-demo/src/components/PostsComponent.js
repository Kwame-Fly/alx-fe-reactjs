import React from 'react';
import { useQuery } from 'react-query';

// Function to fetch posts from JSONPlaceholder API
const fetchPosts = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  if (!res.ok) {
    throw new Error('Network error');
  }
  return res.json();
};

function PostsComponent() {
  // Using the useQuery hook to fetch the data
  const { data, error, isLoading, isError, refetch } = useQuery('posts', fetchPosts, {
    cacheTime: 1000 * 60 * 5, // Data stays in cache for 5 minutes
    staleTime: 1000 * 60, // Data will be considered fresh for 1 minute
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts</h1>
      <button onClick={() => refetch()}>Refetch Data</button>
      <ul>
        {data.map(post => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostsComponent;
