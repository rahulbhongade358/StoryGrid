import React from "react";

function Blogedit() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      <div className="w-full max-w-lg p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Edit Blog
        </h1>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Blog Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <textarea
            placeholder="Blog Content"
            rows={8}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Category"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default Blogedit;
