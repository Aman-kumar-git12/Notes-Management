import { useState, useEffect } from "react";
import apiClient from "../auth/apiClient/axios";
import { UserContext } from "./UserContext.jsx";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Auto-login on page refresh
  useEffect(() => {
    apiClient
      .get("/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error logging in:", err);
        setUser(null);
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};
