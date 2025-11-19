import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ToggleContext } from "../context/togggleContext.jsx";
import { UserContext } from "../context/UserContext.jsx";

export default function Home() {
  const navigate = useNavigate();
  const { dark } = useContext(ToggleContext);
  const { user, loading } = useContext(UserContext);

  // ✅ Redirect only after loading is completed
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-200 ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700"
          : "bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-2xl w-full text-center border transition-colors duration-200 ${
          dark
            ? "bg-gray-900/85 border-gray-700 text-white"
            : "bg-white/80 border-white/30 text-gray-800"
        }`}
      >
        <h1
          className={`text-5xl font-bold mb-6 drop-shadow ${
            dark ? "text-white" : "text-pink-600"
          }`}
        >
          {user ? `Welcome, ${user.name || "User"}!` : "Welcome to Aman Notes"}
        </h1>

        <p
          className={`text-lg mb-8 leading-relaxed ${
            dark ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {user
            ? "Start creating and organizing your notes. Stay productive!"
            : "Your personal space to create, edit, and save notes."}
        </p>

        <Link to="/notes" className="inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`px-8 py-4 rounded-2xl shadow-md flex items-center gap-3 text-lg font-semibold transition-all focus:outline-none ${
              dark
                ? "bg-pink-600 text-white hover:bg-pink-700"
                : "bg-white text-pink-600 border hover:bg-gray-50"
            }`}
          >
            Go to Notes
            <ArrowRight size={22} />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}
