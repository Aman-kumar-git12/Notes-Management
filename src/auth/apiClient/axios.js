import axios from "axios";

const pro = import.meta.env.VITE_BACKEND_URL;

if (!pro) {
  console.error("VITE_BACKEND_URL is not defined! Please check your environment variables.");
}

const apiClient = axios.create({
  baseURL: pro,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
