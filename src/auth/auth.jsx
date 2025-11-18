import React, { useState, useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import apiClient from "./apiClient/axios.js";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext.jsx";

export default function AuthPage() {
  const navigate = useNavigate();
  const { user, loading, setUser } = useContext(UserContext);

  const [isLogin, setIsLogin] = useState(false);
  const [error, setError] = useState(""); // Show API error here
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Redirect to notes if already logged in
  if (!loading && user) {
    navigate('/notes');
    return null;
  }

  // Show loading while checking auth status
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  // ----------------- SIGNUP -----------------
  const Signup = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingSubmit(true);

    const form = new FormData(e.target);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const res = await apiClient.post("/signup", payload);
      console.log("Signup success:", res.data);
      // Update user context with the response
      setUser(res.data.user || res.data);
      setLoadingSubmit(false);
      navigate('/notes');
    } catch (err) {
      setLoadingSubmit(false);
      const errorMsg = err.response?.data?.message || err.message || "Signup failed. Please try again.";
      setError(errorMsg);
      console.error("Signup error:", err);
    }
  };

  // SIMPLE LOGIN
  const Login = async (e) => {
    e.preventDefault();
    setError("");
    setLoadingSubmit(true);
    const form = new FormData(e.target);

    const payload = {
      email: form.get("email"),
      password: form.get("password"),
    };

    try {
      const res = await apiClient.post("/login", payload);
      console.log("Login success:", res.data);
      // Update user context with the response
      setUser(res.data.user || res.data);
      setLoadingSubmit(false);
      navigate('/notes');
    } catch (err) {
      setLoadingSubmit(false);
      const errorMsg = err.response?.data?.message || err.message || "Login failed. Please try again.";
      setError(errorMsg);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Welcome Back" : "Get Started for Free"}
        </h1>

        {/* ---------- ERROR MESSAGE ---------- */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <p className="font-semibold">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* ------------------ SIGNUP FORM ------------------ */}
        {!isLogin && (
          <form onSubmit={Signup} className="space-y-4">
            <input
              name="name"
              placeholder="Name"
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border p-3 rounded-xl"
              required
            />

            <button
              className="w-full bg-red-400 text-white p-3 rounded-xl disabled:opacity-50"
              disabled={loadingSubmit}
            >
              {loadingSubmit ? "Signing up..." : "Get Started"}
            </button>

            <p className="text-center text-sm mt-3">
              Already have an account?{" "}
              <span
                onClick={() => setIsLogin(true)}
                className="text-black font-semibold cursor-pointer"
              >
                Log in
              </span>
            </p>
          </form>
        )}

        {/* ------------------ LOGIN FORM ------------------ */}
        {isLogin && (
          <form onSubmit={Login} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border p-3 rounded-xl"
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full border p-3 rounded-xl"
              required
            />

            <button
              className="w-full bg-red-400 text-white p-3 rounded-xl disabled:opacity-50"
              disabled={loadingSubmit}
            >
              {loadingSubmit ? "Logging in..." : "Log In"}
            </button>

            <p className="text-center text-sm mt-3">
              Don't have an account?{" "}
              <span
                onClick={() => setIsLogin(false)}
                className="text-black font-semibold cursor-pointer"
              >
                Sign up
              </span>
            </p>
          </form>
        )}

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Login */}
        <button className="w-full border p-3 rounded-xl flex justify-center items-center gap-3 hover:bg-gray-50">
          <FcGoogle size={24} /> Sign in with Google
        </button>
      </div>
    </div>
  );
}
