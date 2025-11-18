import React, { useState } from "react";
import Navbar from "./navbar.jsx";
import Sidebar from "./sidebar.jsx";

const Layout = ({ children, dark, setDark }) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        dark ? "bg-gray-950 text-white" : "bg-pink-100 text-black"
      } flex flex-col`}
      onClick={() => open && setOpen(false)}
    >
      {/* Navbar */}
      <Navbar dark={dark} setDark={setDark} open={open} setOpen={setOpen} />

      {/* Sidebar */}
      <Sidebar dark={dark} open={open} setOpen={setOpen} />

      {/* Main Content */}
      {children}
    </div>
  );
};

export default Layout;
