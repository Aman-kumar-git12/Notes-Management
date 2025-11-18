import React, { useEffect, useState } from "react";
import apiClient from "../auth/apiClient/axios";
import Layout from "./layout.jsx";
import { Link } from "react-router-dom";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [dark, setDark] = useState(false);

  const [page, setPage] = useState(1);
  const notesPerPage = 1;

  // removed inline modal state — we'll navigate to dedicated routes

  // Fetch notes
  useEffect(() => {
    apiClient
      .get("/notes", { withCredentials: true })
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Fetch notes error:", err));
  }, []);

  // Mobile pagination
  const totalPages = Math.ceil(notes.length / notesPerPage);
  const currentNotes = notes.slice((page - 1) * notesPerPage, page * notesPerPage);

  // Delete Note
  const deleteNote = async (id) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await apiClient.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n.id !== id));
      alert("Note deleted!");
    } catch (err) {
      console.error("Delete Error:", err);
      alert("Error deleting note.");
    }
  };

  

  return (
    <Layout dark={dark} setDark={setDark}>
      <div className="max-w-4xl mx-auto p-4 mt-6">

        <h2 className="text-2xl font-bold mb-4">Your Notes</h2>

        {/* Desktop Grid */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {notes.length === 0 && <p className="text-gray-500">No notes yet.</p>}

          {notes.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-xl shadow relative ${
                dark ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <p className="mt-2 text-gray-600 line-clamp-3">{note.content}</p>

              <p className="mt-3 text-sm text-gray-400">
                {new Date(note.createdAt).toLocaleDateString()}
              </p>

              {/* Buttons */}
              <div className="mt-4 flex gap-3">
                <Link
                  to={`/viewnotes/${note.id || note._id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${note.id || note._id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE Pagination with Buttons */}
        <div className="sm:hidden">
          {currentNotes.length > 0 && (
            <div
              className={`p-4 rounded-xl shadow mb-4 ${
                dark ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold">{currentNotes[0].title}</h3>
              <p className="mt-2 text-gray-600">{currentNotes[0].content}</p>

              <p className="mt-3 text-sm text-gray-400">
                {new Date(currentNotes[0].createdAt).toLocaleDateString()}
              </p>

              {/* Buttons */}
                <div className="mt-4 flex justify-between">
                <Link to={`/viewnotes/${currentNotes[0].id || currentNotes[0]._id}`} className="px-3 py-1 bg-blue-500 text-white rounded">View</Link>
                <Link to={`/edit/${currentNotes[0].id || currentNotes[0]._id}`} className="px-3 py-1 bg-yellow-500 text-white rounded">Edit</Link>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteNote(currentNotes[0].id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-between items-center mt-3">
            <button
              disabled={page === 1}
              className="px-3 py-2 bg-pink-500 text-white rounded disabled:bg-gray-300"
              onClick={() => setPage(page - 1)}
            >
              Prev
            </button>

            <span className="text-lg font-semibold">
              {page} / {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              className="px-3 py-2 bg-pink-500 text-white rounded disabled:bg-gray-300"
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SavedNotes;
