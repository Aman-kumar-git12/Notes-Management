import { useState, useEffect } from "react";
import { ToggleContext } from "../context/togggleContext.jsx";

export const ToggleProvider = ({ children }) => {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("darkMode");
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(dark));

    // Also update the class on the body for automatic theme change
    if (dark) {
      document.documentElement.classList.add("dark"); // Tailwind support
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <ToggleContext.Provider value={{ dark, setDark }}>
      {children}
    </ToggleContext.Provider>
  );
};

export default ToggleProvider;