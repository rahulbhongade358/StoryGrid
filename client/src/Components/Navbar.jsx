import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import { getCurrentuser } from "../utils/utils";

function Navbar() {
  const [logginUser, setLogginUser] = useState(null);
  useEffect(() => {
    setLogginUser(getCurrentuser());
  }, []);
  return (
    <nav className="bg-indigo-700 text-white px-8 py-4 flex items-center justify-between shadow-md">
      <div className="text-2xl font-bold">StoryGrid</div>
      <ul className="hidden md:flex space-x-6 font-medium">
        <Link to="/bloglist" className="hover:text-gray-200 cursor-pointer">
          Blogs
        </Link>
        <Link to="/blogadd" className="hover:text-gray-200 cursor-pointer">
          Add-Blog
        </Link>
        <Link to="/blogedit/:id" className="hover:text-gray-200 cursor-pointer">
          Edit-Blog
        </Link>
        <Link to="/login" className="hover:text-gray-200 cursor-pointer">
          Login
        </Link>
        <Link to="/signup" className="hover:text-gray-200 cursor-pointer">
          Signup
        </Link>
      </ul>
      <div className="flex items-center space-x-4">
        {logginUser ? (
          <>
            <span className="font-semibold">Hi, {logginUser.name}</span>
          </>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
