import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api/", // your backend URL
  //   withCredentials: true, // if using cookies/auth
});

export default API;
