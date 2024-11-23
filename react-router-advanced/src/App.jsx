import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Profile from "./pages/Profile";
import UserProfile from "./pages/UserProfile";
import BlogPost from "./pages/BlogPost";  
import { AuthProvider } from "./auth";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:username" element={<UserProfile />} />
          <Route path="/profile/*" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/blog/:id" element={<BlogPost />} />  {/* Blog post dynamic route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;


