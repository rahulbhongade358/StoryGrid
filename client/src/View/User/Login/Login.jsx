import React, { useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

function Login() {
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const Login = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/login`,
      loginUser
    );
    try {
      if (response.data.success === false) {
        toast.error(response.data.message);
      } else {
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.href = "/bloglist";
        }, 2000);
      }
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );
    }

    if (response?.data?.success) {
      localStorage.setItem("userlogin", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-white to-indigo-100">
      <div className="w-full max-w-md p-8 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login StoryGrid
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Login your account and start sharing your stories
        </p>
        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={loginUser.email}
            onChange={(e) => {
              setLoginUser({ ...loginUser, email: e.target.value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={loginUser.password}
            onChange={(e) => {
              setLoginUser({ ...loginUser, password: e.target.value });
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={Login}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Login
          </button>
        </div>

        <p className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
      <Toaster className="position top right" />
    </div>
  );
}
export default Login;
