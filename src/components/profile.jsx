import React from "react";
import apiClient from "../auth/apiClient/axios.js";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";
import { ToggleContext } from "../context/togggleContext.jsx";
import Layout from "./layout.jsx";

export default function ProfilePage() {
  const { user } = useContext(UserContext);
  const { dark } = useContext(ToggleContext);

  // LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      await apiClient.post("/logout", {}, { withCredentials: true });
      window.location.href = "/"; // redirect to login
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return (
    <Layout>
      <div className="flex justify-center items-center p-6 flex-1">
        <div className={`shadow-lg rounded-2xl p-8 w-full max-w-sm text-center ${
          dark ? "bg-gray-800 text-white" : "bg-white text-gray-700"
        }`}>
          
          <img
            src="https://cdn.vectorstock.com/i/500p/43/98/default-avatar-photo-placeholder-icon-grey-vector-38594398.jpg"
            alt="profile"
            className="w-28 h-28 rounded-full mx-auto shadow-md"
          />

          <h2 className="text-2xl font-bold mt-4">
            {user?.name}
          </h2>

          <p className={`text-sm mt-1 ${dark ? "text-gray-400" : "text-gray-500"}`}>
            {user?.email}
          </p>

          {/* LOGOUT BUTTON */}
          <button
            onClick={handleLogout}
            className="mt-5 w-full bg-red-400 text-white py-2 rounded-xl hover:bg-red-500 shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </Layout>
  );
}
