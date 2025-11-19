import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import apiClient from "../auth/apiClient/axios";
import Layout from "./layout";

const SingleNotePage = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await apiClient.get(`/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || "Error loading note");
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;

  if (errorMsg)
    return (
      <Layout>
        <p className="p-6 text-red-500 text-lg font-medium">{errorMsg}</p>
      </Layout>
    );

  return (
    <Layout>
      <div className="flex justify-center mt-16">
        <div className="max-w-xl w-full bg-white shadow-xl rounded-2xl p-8 border border-pink-200">
          <h1 className="text-3xl font-bold text-pink-600">{note.title}</h1>

          <p className="mt-4 text-gray-700 whitespace-pre-wrap leading-7 text-lg">
            {note.content}
          </p>

          <p className="text-sm text-gray-500 mt-6">
            Created on:{" "}
            <span className="font-medium">
              {new Date(note.createdAt).toLocaleDateString()}
            </span>
          </p>

          <div className="mt-8">
            <Link
              to="/saved-notes"
              className="inline-block px-5 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg shadow transition"
            >
              ← Back to Notes
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SingleNotePage;
