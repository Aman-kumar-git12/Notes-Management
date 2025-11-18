import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Enable cookies to be sent with requests
});

export default apiClient;   