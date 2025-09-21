import React from "react";

function Blogdetails() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      <div className="w-full max-w-2xl p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-4">
          Blog Title
        </h1>
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-500">By Author Name</span>
          <span className="text-gray-400 text-sm">Published Date</span>
        </div>
        <div className="prose prose-lg max-w-none text-gray-800 mb-8">
          {/* Blog content goes here */}
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque euismod, urna eu tincidunt consectetur, nisi nisl
            aliquam eros, a facilisis enim leo nec dui.
          </p>
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Comments</h2>
          <div className="space-y-4">
            {/* Example comment */}
            <div className="bg-gray-100 rounded-lg p-4">
              <span className="font-semibold text-indigo-600">User Name</span>
              <p className="text-gray-700 mt-1">
                Great story! Really enjoyed reading it.
              </p>
            </div>
            {/* Repeat comments as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blogdetails;
