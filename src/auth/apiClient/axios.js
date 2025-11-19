import axios from "axios";

const pro = import.meta.env.VITE_BACKEND_URL;

const apiClient = axios.create({
  baseURL: pro,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,   // VERY IMPORTANT!!
});

export default apiClient;
