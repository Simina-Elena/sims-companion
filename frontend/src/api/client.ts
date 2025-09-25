import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000/api", // adjust if backend runs elsewhere
  withCredentials: true, // so we keep session_id cookies
});

export default client;
