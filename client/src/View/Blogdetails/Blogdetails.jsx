import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

function Blogdetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState({});
  const Blogdetail = async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/blogs/${slug}`
    );
    setBlog(response.data.data);
  };
  useEffect(() => {
    Blogdetail();
    document.documentElement.setAttribute("data-color-mode", "light");
  }, []);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100 overflow-y-auto p-4">
      <div className="w-full max-w-3xl p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-4">
          {blog.title}
        </h1>
        <div className="flex flex-row sm:flex-row justify-between items-center mb-6 gap-2">
          <span className="text-gray-500 font-medium">
            Author:{" "}
            <span className="text-indigo-600">{blog?.author?.name}</span>
          </span>
          <span className="text-gray-400 text-sm">
            {new Date(blog.publishedAt || blog.updatedAt).toLocaleString()}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium text-indigo-700 bg-indigo-100 rounded-full shadow-sm">
            👁️ {blog.viewCount}
          </span>
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 mb-8">
          <MarkdownEditor.Markdown source={blog.content} />
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-50 rounded-lg p-4 mb-6 shadow">
          <div>
            <span className="text-gray-500 font-semibold">Category: </span>
            <span className="text-indigo-700 font-medium">{blog.category}</span>
          </div>
          <div className="mt-2 sm:mt-0 text-right">
            <p className="text-gray-600">
              <span className="font-semibold">Author Name:</span>{" "}
              {blog?.author?.name}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Author Email:</span>{" "}
              {blog?.author?.email}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Comments</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4">
              <span className="font-semibold text-indigo-600">User Name</span>
              <p className="text-gray-700 mt-1">
                Great story! Really enjoyed reading it.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogdetails;
