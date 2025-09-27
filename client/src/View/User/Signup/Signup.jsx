import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function Signup() {
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const Signup = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/singup`,
        newUser
      );
      if (!response.data.success) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
      }
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Join StoryGrid
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Create your account and start sharing your stories
        </p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => {
              setNewUser({ ...newUser, name: e.target.value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => {
              setNewUser({ ...newUser, email: e.target.value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) => {
              setNewUser({ ...newUser, password: e.target.value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={Signup}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Register
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
      <Toaster className="position top right" />
    </div>
  );
}
export default Signup;
