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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error Response:", error.response?.data);
    console.error("API Error Status:", error.response?.status);
    return Promise.reject(error);
  }
);

export default apiClient;
