import axios from "axios";

const API = axios.create({
  baseURL: "https://budget-insight-and-expense-tracker-mern.onrender.com/api",
});

// REQUEST INTERCEPTOR (ADD TOKEN AUTOMATICALLY)
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    console.log(" SENDING TOKEN:", token);

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//  RESPONSE ERROR HANDLING (OPTIONAL BUT GOOD)
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      console.log(" API ERROR:", error.response.data);

      //  Token expired / invalid
      if (error.response.status === 401) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;