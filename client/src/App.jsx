import React from "react";
import { Link } from "react-router";

function App() {
  return (
    <div>
      <h1>Welcome to StoryGrid</h1>
      <p>Your platform for sharing stories.</p>
      <p>Explore our blog posts and share your own!</p>
      <Link to="/bloglist">Go to Blog List</Link>
      <br />
      <Link to="/blogdetails/:id">Go to Blog Details</Link>
      <br />
      <Link to="/blogedit/:id">Go to Edit Blog</Link>
      <br />
      <Link to="/login">Go to Login</Link>
      <br />
      <Link to="/signup">Go to Signup</Link>
    </div>
  );
}

export default App;
