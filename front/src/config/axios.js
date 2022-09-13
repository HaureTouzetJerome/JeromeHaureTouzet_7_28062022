import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    // Authorization: "Bearer <token_here>",
  },
});

export default instance;
