import axios from "axios";

const API = axios.create({
  baseURL:  "https://budget-insight-and-expense-tracker-mern.onrender.com/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  console.log("SENDING TOKEN:", token); // ✅ DEBUG

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;