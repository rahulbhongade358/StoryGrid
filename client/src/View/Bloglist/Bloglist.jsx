import React from "react";
import { useState, useEffect } from "react";
import { getCurrentuser } from "../../utils/utils.js";
import axios from "axios";
import Blogcards from "../../Components/Blogcards.jsx";
import Navbar from "../../Components/Navbar.jsx";

function Bloglist() {
  const [logginUser, setLogginUser] = useState(null);
  const [allblogs, setAllblogs] = useState([]);
  const blogs = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs?author=${logginUser?._id || ""}`
    );
    setAllblogs(response.data.data);
  };
  useEffect(() => {
    setLogginUser(getCurrentuser());
  }, []);

  useEffect(() => {
    blogs();
  }, [logginUser]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      <Navbar />
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
                viewCount,
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
                    viewCount={viewCount}
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
