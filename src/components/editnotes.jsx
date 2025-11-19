import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../auth/apiClient/axios";
import Layout from "./layout";

const EditNotePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [showModal, setShowModal] = useState(false); // NEW: modal state

  // Fetch existing note
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await apiClient.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || "Error loading note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  // Update API call
  const confirmUpdate = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    if (!title.trim() || !content.trim()) {
      setErrorMsg("Title and content are required.");
      setShowModal(false);
      return;
    }

    try {
      await apiClient.put(`/notes/${id}`, {
        title,
        content,
      });

      setSuccessMsg("Note updated successfully!");
      setShowModal(false);

      setTimeout(() => {
        navigate("/saved-notes");
      }, 800);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Error updating note");
      setShowModal(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <p className="p-6 text-center text-lg">Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white">
        <h2 className="text-2xl font-bold text-pink-600">Edit Note</h2>

        <input
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          className="w-full p-3 mt-3 border border-pink-300 rounded-lg focus:outline-pink-400 text-lg"
          placeholder="Enter title..."
        />

        <textarea
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
            if (errorMsg) setErrorMsg("");
          }}
          className="w-full p-3 mt-4 border border-pink-300 rounded-lg h-64 resize-none focus:outline-pink-400 text-lg"
          placeholder="Write your note..."
        ></textarea>

        {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        {successMsg && (
          <p className="text-green-500 text-sm mt-2">{successMsg}</p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setShowModal(true)} // open modal
            className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow hover:bg-pink-600"
          >
            Update
          </button>

          <button
            onClick={() => navigate("/saved-notes")}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* UPDATE CONFIRMATION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center">
            <h2 className="text-xl font-semibold text-gray-800">
              Update this note?
            </h2>
            <p className="text-gray-600 mt-2">
              Do you really want to apply these changes?
            </p>

            <div className="flex justify-center gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={confirmUpdate}
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
              >
                Yes, Update
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default EditNotePage;
