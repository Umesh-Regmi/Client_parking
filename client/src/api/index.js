import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/auth", // your backend URL
  //   withCredentials: true, // if using cookies/auth
});

export default API;
