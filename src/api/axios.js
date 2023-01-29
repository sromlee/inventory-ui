import axios from "axios";

const BASE_URL = "http://localhost:8000/";
export default axios.create({
  baseURL: BASE_URL,
});
export const axiosPravate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredential: true,
});
