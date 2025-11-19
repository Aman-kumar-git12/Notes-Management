import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ToggleContext } from "../context/togggleContext.jsx";

const Sidebar = ({ open, setOpen }) => {
  const { dark } = useContext(ToggleContext);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`fixed top-0 left-0 h-full w-64 ${
        dark ? "bg-gray-900 text-white" : "bg-white"
      } shadow-xl p-6 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "-translate-x-full"
      } z-50`}
    >
      <h2 className="text-xl font-semibold mb-6 text-pink-600">Menu</h2>

      <ul className="space-y-4 text-lg">

        {/* Home */}
        <li onClick={() => setOpen(false)}>
          <Link to="/home" className="text-pink-500 hover:text-pink-700">
            Home
          </Link>
        </li>

        {/* Add Notes (new second item) */}
        <li onClick={() => setOpen(false)}>
          <Link to="/notes" className="text-pink-500 hover:text-pink-700">
            Add Notes
          </Link>
        </li>

        {/* Saved Notes */}
        <li onClick={() => setOpen(false)}>
          <Link to="/saved-notes" className="text-pink-500 hover:text-pink-700">
            Saved Notes
          </Link>
        </li>

        {/* Library */}
        <li onClick={() => setOpen(false)}>
          <Link to="/library" className="text-pink-500 hover:text-pink-700">
            Library
          </Link>
        </li>

        {/* Profile */}
        <li onClick={() => setOpen(false)}>
          <Link to="/profile" className="text-pink-500 hover:text-pink-700">
            Profile
          </Link>
        </li>

      </ul>
    </div>
  );
};

export default Sidebar;

