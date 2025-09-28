import React from "react";
import { useState, useEffect } from "react";
import { getCurrentuser } from "../../utils/utils.js";
import { Link } from "react-router";
import axios from "axios";
import Blogcards from "../../Components/Blogcards.jsx";

function Bloglist() {
  const [logginUser, setLogginUser] = useState(null);
  const [allblogs, setAllblogs] = useState([]);
  const blogs = async () => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
    setAllblogs(response.data.data);
    console.log(response.data.data);
  };
  console.log(allblogs);
  useEffect(() => {
    setLogginUser(getCurrentuser());
    blogs();
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      <nav className="bg-indigo-700 text-white px-8 py-4 flex items-center justify-between shadow-md">
        <div className="text-2xl font-bold">StoryGrid</div>
        <ul className="hidden md:flex space-x-6 font-medium">
          <Link to="/bloglist" className="hover:text-gray-200 cursor-pointer">
            Blogs
          </Link>
          <Link to="/blogadd" className="hover:text-gray-200 cursor-pointer">
            Add-Blog
          </Link>
          <Link
            to="/blogedit/:id"
            className="hover:text-gray-200 cursor-pointer"
          >
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
      <div className="flex items-center justify-center min-h-screen mt-5">
        <div className="w-full max-w-5xl p-8 bg-white/70 backdrop-blur-lg rounded-2xl shadow-xl">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
            Blog List
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Explore all published stories from our community.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allblogs.map((blog) => {
              const {
                _id,
                title,
                content,
                status,
                category,
                author,
                slug,
                createdAt,
                updatedAt,
              } = blog;
              return (
                <div
                  key={_id}
                  className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between"
                >
                  <Blogcards
                    _id={_id}
                    title={title}
                    content={content}
                    category={category}
                    status={status}
                    author={author}
                    slug={slug}
                    createdAt={createdAt}
                    updatedAt={updatedAt}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bloglist;
