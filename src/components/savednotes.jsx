import React, { useEffect, useState } from "react";
import apiClient from "../auth/apiClient/axios";
import Layout from "./layout.jsx";
import { Link } from "react-router-dom";

const SavedNotes = () => {
  const [notes, setNotes] = useState([]);
  const [dark, setDark] = useState(false);

  const [page, setPage] = useState(1);
  const notesPerPage = 1;

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  // Fetch notes
  useEffect(() => {
    apiClient
      .get("/notes", { withCredentials: true })
      .then((res) => setNotes(res.data))
      .catch((err) => console.error("Fetch notes error:", err));
  }, []);

  const totalPages = Math.ceil(notes.length / notesPerPage);
  const currentNotes = notes.slice(
    (page - 1) * notesPerPage,
    page * notesPerPage
  );

  // Open delete modal
  const confirmDelete = (id) => {
    setSelectedNoteId(id);
    setShowModal(true);
  };

  // Delete note
  const handleDelete = async () => {
    if (!selectedNoteId) return;

    try {
      await apiClient.delete(`/notes/${selectedNoteId}`);

      // Remove from UI without reload:
      setNotes(notes.filter((n) => n.id !== selectedNoteId));

      setShowModal(false);
    } catch (err) {
      console.error("Delete error:", err);
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
                  to={`/notes/${note.id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  View
                </Link>

                <Link
                  to={`/edit/${note.id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => confirmDelete(note.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE VIEW */}
        <div className="sm:hidden">
          {currentNotes.length > 0 && (
            <div
              className={`p-4 rounded-xl shadow mb-4 ${
                dark ? "bg-gray-800 text-white" : "bg-white"
              }`}
            >
              <h3 className="text-xl font-semibold">
                {currentNotes[0].title}
              </h3>
              <p className="mt-2 text-gray-600">{currentNotes[0].content}</p>

              <p className="mt-3 text-sm text-gray-400">
                {new Date(currentNotes[0].createdAt).toLocaleDateString()}
              </p>

              <div className="mt-4 flex justify-between">
                <Link
                  to={`/notes/${currentNotes[0].id}`}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  View
                </Link>

                <Link
                  to={`/edit/${currentNotes[0].id}`}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Edit
                </Link>

                <button
                  onClick={() => confirmDelete(currentNotes[0].id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

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

      {/* DELETE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Delete this note?
            </h2>
            <p className="text-gray-600 mt-2">
              This action cannot be undone.
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default SavedNotes;
