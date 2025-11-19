import React, { useState, useContext } from "react";
import Navbar from "./navbar.jsx";
import Sidebar from "./sidebar.jsx";
import { ToggleContext } from "../context/togggleContext.jsx";

const Layout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { dark } = useContext(ToggleContext);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        dark ? "bg-gray-950 text-white" : "bg-pink-100 text-black"
      } flex flex-col`}
      onClick={() => open && setOpen(false)}
    >
      {/* Navbar */}
      <Navbar open={open} setOpen={setOpen} />

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Main Content */}
      {children}
    </div>
  );
};

export default Layout;
