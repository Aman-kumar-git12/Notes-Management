import axios from "axios";

const pro = import.meta.env.VITE_BACKEND_URL;  // MUST start with VITE_

const apiClient = axios.create({
  baseURL: pro,                  // http://localhost:3000
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
