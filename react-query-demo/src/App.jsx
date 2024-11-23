import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PostsComponent from './PostsComponent';  


const queryClient = new QueryClient();

function App() {
  return (
    
    <QueryClientProvider client={queryClient}>
      {/* The PostsComponent is now wrapped in the QueryClientProvider to enable React Query */}
      <PostsComponent />
    </QueryClientProvider>
  );
}

export default App;
