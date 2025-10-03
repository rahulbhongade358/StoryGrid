import React from "react";
import { Link } from "react-router";
function Blogcards({
  title,
  content,
  status,
  category,
  author,
  slug,
  createdAt,
  viewCount,
}) {
  return (
    <>
      <h2 className="text-2xl font-bold text-indigo-700 mb-2">{title}</h2>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">By {author.name}</span>
        <span className="text-sm text-gray-400">
          {new Date(createdAt).toLocaleDateString()}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
          {category}
        </span>
        {status != "PUBLISHED" ? (
          <span className="text-xs text-gray-400">{status}</span>
        ) : null}
      </div>

      {status == "PUBLISHED" ? (
        <div className="flex items-center gap-4 mt-4">
          <Link
            className="bg-indigo-600 text-white w-fit px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
            to={`/blogdetails/${slug}`}
          >
            Read More
          </Link>
          <span className="text-gray-600 text-sm">
            👁️ Read By{" "}
            <span className="font-medium text-gray-800">{viewCount}</span>
          </span>
        </div>
      ) : (
        <Link
          className="mt-4 bg-indigo-600 text-white w-fit px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          to={`/blogedit/${slug}`}
        >
          Edit Blog
        </Link>
      )}
    </>
  );
}

export default Blogcards;
