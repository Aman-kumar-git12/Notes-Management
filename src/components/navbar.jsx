import React from "react";
import { Menu } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext.jsx";

const Navbar = ({ dark, setDark, open, setOpen }) => {
  const { user } = useContext(UserContext);

  return (
    <nav
      className={`w-full shadow-md p-4 flex items-center justify-between ${
        dark ? "bg-gray-900" : "bg-white"
      }`}
    >
      <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }}>
        <Menu className="w-8 h-8 text-pink-600" />
      </button>
      <h1 className="text-2xl font-bold text-pink-600">Hi, {user?.name || 'User'}</h1>
      <label className="flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={dark}
          onChange={() => setDark(!dark)}
        />
        <div className={`w-12 h-6 rounded-full relative transition-colors ${
          dark ? "bg-gray-600" : "bg-pink-300"
        }`}>
          <div
            className={`w-6 h-6 bg-white rounded-full absolute transition-transform ${
              dark ? "translate-x-6" : "translate-x-0"
            }`}
          ></div>
        </div>
      </label>
    </nav>
  );
};

export default Navbar;
