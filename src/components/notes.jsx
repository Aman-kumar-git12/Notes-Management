import React, { useState } from "react";
import { Link } from "react-router-dom";   // ← FIXED (import added)
import apiClient from "../auth/apiClient/axios.js";
import Layout from "./layout.jsx";

const NotesPage = () => {
  const [dark, setDark] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const saveNote = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !text.trim()) {
      setErrorMsg("Title and content are required.");
      return;
    }

    try {
      const res = await apiClient.post("/notes", {
        title,
        content: text,
      });

      setTitle("");
      setText("");

      console.log("Saved:", res.data);

      // Show success message
      setSuccessMsg("Note saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      setErrorMsg(err.response?.data?.message || "Error saving note");
    }
  };


  

  return (
    <Layout dark={dark} setDark={setDark}>
      <div
        className={`p-6 max-w-2xl mx-auto mt-10 shadow-lg rounded-xl ${
          dark ? "bg-gray-800" : "bg-white"
        }`}
      >
        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          className="w-full p-3 border border-pink-300 rounded-lg focus:outline-pink-400 text-lg"
          placeholder="Enter title..."
        />

        <textarea
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          className="w-full p-3 mt-4 border border-pink-300 rounded-lg h-64 resize-none focus:outline-pink-400 text-lg"
          placeholder="Write your note here..."
        ></textarea>

        <div className="mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={saveNote}
              className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow"
            >
              Save
            </button>

            {/* Error Message Between Save & Clear */}
            {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

            <button
              onClick={() => {
                setTitle("");
                setText("");
                setErrorMsg("");
                setSuccessMsg("");
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow ml-auto"
            >
              Clear
            </button>
          </div>

          {/* Success message + Link to Saved Notes */}
          {successMsg && (
            <div className="mt-3">
              <p className="text-green-600 text-sm">{successMsg}</p>
              <Link
                to="/saved-notes"
                className="inline-block mt-1 text-pink-600 underline text-sm"
              >
                Go to saved notes →
              </Link>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default NotesPage;
