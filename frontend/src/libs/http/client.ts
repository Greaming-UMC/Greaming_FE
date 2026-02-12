// import axios from "axios";
// import { setupInterceptors } from "./interceptors";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "/api";

// /* 추후 리팩토링 시 사용
// const getBaseUrl = () => {
// 	return import.meta.env.VITE_API_BASE_URL ?? "/api";
// }; */

// export const http = axios.create({
//     baseURL: BASE_URL,
//     timeout: 10_000,
//     withCredentials: true,
// });

// console.log("VITE_API_BASE_UR: = ",import.meta.env.VITE_API_BASE_URL)
// setupInterceptors(http);


// src/libs/http/client.ts (예시)
import axios from "axios";
import { getAccessToken } from "../security/tokenStore";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // 서버가 refresh 쿠키 쓰면 필요할 수 있음
});

http.interceptors.request.use((config) => {
  const runtimeToken = getAccessToken(); // 로컬스토리지/메모리 토큰
  const devToken = import.meta.env.VITE_DEV_ACCESS_TOKEN; // env 토큰

  const token = runtimeToken ?? devToken;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});