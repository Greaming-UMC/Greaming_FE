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


import axios from "axios";
import { setupInterceptors } from "./interceptors";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

setupInterceptors(http);
