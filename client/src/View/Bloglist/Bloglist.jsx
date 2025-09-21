import React from "react";

const blogs = [
  {
    title: "How to Start Blogging",
    excerpt:
      "Learn the basics of starting your own blog and sharing your ideas.",
    author: "Alice",
  },
  {
    title: "React vs Vue",
    excerpt: "A comparison between two popular frontend frameworks.",
    author: "Bob",
  },
  {
    title: "Tailwind CSS Tips",
    excerpt: "Improve your UI with these Tailwind CSS tricks.",
    author: "Charlie",
  },
  {
    title: "Writing Engaging Content",
    excerpt: "Tips for keeping your readers hooked.",
    author: "Dana",
  },
];

function Bloglist() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      <div className="w-full max-w-5xl p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Blog List
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Explore all published stories from our community.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                  {blog.title}
                </h2>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm text-gray-400">{blog.author}</span>
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200">
                  Read More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Bloglist;
