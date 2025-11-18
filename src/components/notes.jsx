import React, { useState } from "react";
import apiClient from "../auth/apiClient/axios.js";
import { UserContext } from "../context/UserContext.jsx";
import Layout from "./layout.jsx";


const NotesPage = () => {

  const [dark, setDark] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const saveNote = async () => {
    try {
      const res = await apiClient.post('/notes', { title, content: text });
      setTitle("");
        setText("");
      console.log('Saved:', res.data);
    } catch (err) {
      console.error('Save error:', err);
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
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 border border-pink-300 rounded-lg focus:outline-pink-400 text-lg"
          placeholder="Enter title..."
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full p-3 mt-4 border border-pink-300 rounded-lg h-64 resize-none focus:outline-pink-400 text-lg"
          placeholder="Write your note here..."
        ></textarea>

        <div className="flex gap-4 mt-4 justify-between">
          <button
            onClick={saveNote}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg shadow"
          >
            Save
          </button>
          <a href="/viewnotes" className="ml-2 inline-block px-4 py-2 border rounded-lg text-pink-600 hover:bg-pink-50">View All</a>
          <button
            onClick={() => {
              setTitle("");
              setText("");
            }}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow ml-auto"
          >
            Clear
          </button>
        </div>
      </div>
    </Layout>
  );
}
export default NotesPage;