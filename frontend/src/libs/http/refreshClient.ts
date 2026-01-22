import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

export const httpRefresh = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
  withCredentials: true,
});
