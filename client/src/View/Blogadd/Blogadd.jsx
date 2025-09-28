import React from "react";
import axios from "axios";
import MarkdownEditor from "@uiw/react-markdown-editor";
import { useEffect, useState } from "react";
import { BLOG_CATEGORIES } from "./../../Constants/constants.js";
import { getCurrentuser } from "../../utils/utils.js";
import toast, { Toaster } from "react-hot-toast";
function Blogadd() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(BLOG_CATEGORIES[0]);
  const saveBlog = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/addblogs`,
      {
        title,
        content,
        category,
        author: user?._id,
      }
    );
    if (response?.data?.success) {
      toast.success(response.data.message);
    }
    setTimeout(() => {
      window.location.href = "/bloglist";
    }, 2000);
  };
  useEffect(() => {
    document.documentElement.setAttribute("data-color-mode", "light");
    setUser(getCurrentuser());
  }, []);
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-white to-indigo-100 p-6">
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-6">
          Add Blog
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Write your blog content below and share your thoughts with the
          community.
        </p>
        <input
          type="text"
          placeholder="Blog Title"
          className="border p-2 w-full my-4 rounded-md"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <select
          className="border p-2 my-4 "
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        >
          {BLOG_CATEGORIES.map((cate) => {
            return (
              <option value={cate} key={cate}>
                {" "}
                {cate}
              </option>
            );
          })}
        </select>
        <MarkdownEditor
          value={content}
          onChange={(value) => {
            setContent(value);
          }}
          height="350px"
        />
        <div className="flex justify-end mt-6">
          <button
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            onClick={saveBlog}
          >
            Publish Blog
          </button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Blogadd;
