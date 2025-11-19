import React, { useState, useContext } from "react";
import docs from "../utils/docs.js";
import { ToggleContext } from "../context/togggleContext.jsx";
import Layout from "./layout.jsx";

export default function Library() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { dark } = useContext(ToggleContext);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = docs.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(docs.length / itemsPerPage);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-6 w-full">
        <h2 className={`text-3xl font-bold mb-6 ${dark ? "text-pink-400" : "text-pink-600"}`}>Documentation Library</h2>
        <ul className="space-y-6">
          {currentItems.map((doc) => (
            <li
              key={doc.id}
              className={`border rounded-2xl p-5 flex justify-between items-center shadow-md transition-colors duration-200 ${
                dark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
              }`}
            >
              <div>
                <h3 className="text-xl font-semibold mb-1">{doc.title}</h3>
                <p className={`text-sm ${dark ? "text-gray-400" : "text-gray-500"}`}>{doc.category}</p>
              </div>
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`px-5 py-2 rounded-lg font-semibold shadow transition-all duration-150 text-base flex items-center gap-2 ${
                  dark
                    ? "bg-pink-600 text-white hover:bg-pink-700"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
              >
                Let’s Study
              </a>
            </li>
          ))}
        </ul>
        <div className="flex justify-center mt-8 space-x-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded font-medium transition disabled:opacity-50 ${
              dark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded font-medium transition border ${
                currentPage === page
                  ? dark
                    ? "bg-pink-600 text-white border-pink-700"
                    : "bg-indigo-600 text-white border-indigo-700"
                  : dark
                  ? "bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700"
                  : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded font-medium transition disabled:opacity-50 ${
              dark
                ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </Layout>
  );
}
