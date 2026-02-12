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
// import axios from "axios";
// import { getAccessToken } from "../security/tokenStore";
// console.log("VITE_API_BASE_URL =", import.meta.env.VITE_API_BASE_URL);

// export const http = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true, // 서버가 refresh 쿠키 쓰면 필요할 수 있음
// });

// http.interceptors.request.use((config) => {
//   const runtimeToken = getAccessToken(); // 로컬스토리지/메모리 토큰
//   const devToken = import.meta.env.VITE_DEV_ACCESS_TOKEN; // env 토큰

//   const token = runtimeToken ?? devToken;

//   if (token) {
//     config.headers = config.headers ?? {};
//     config.headers.Authorization = `Bearer ${token}`;
//   }
  
//   console.log('VITE_API')
//   return config;
// });


// src/libs/http/client.ts 
import axios from "axios";
import { getAccessToken, setAccessToken } from "../security/tokenStore";

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

http.interceptors.request.use((config) => {
  const token = getAccessToken() ?? import.meta.env.VITE_DEV_ACCESS_TOKEN;

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let refreshing = false;
let waiters: Array<(token: string | null) => void> = [];

const wake = (token: string | null) => {
  waiters.forEach((w) => w(token));
  waiters = [];
};
console.log("BASE", import.meta.env.VITE_API_BASE_URL);

http.interceptors.response.use(
  (res) => {
    const auth = res.headers["authorization"];
    if (typeof auth === "string" && auth.startsWith("Bearer ")) {
      setAccessToken(auth.slice("Bearer ".length));
    }
    return res;
  },
  async (err) => {
    const original = err.config;

    if (err.response?.status !== 401 || original?._retry) throw err;
    original._retry = true;

    if (refreshing) {
      return new Promise((resolve, reject) => {
        waiters.push((token) => {
          if (!token) return reject(err);
          original.headers.Authorization = `Bearer ${token}`;
          resolve(http(original));
        });
      });
    }

    refreshing = true;
    try {
      //  재발급
      const r = await http.post("/api/auth/reissue");
      const auth = r.headers["authorization"];
      const token =
        typeof auth === "string" && auth.startsWith("Bearer ")
          ? auth.slice("Bearer ".length)
          : null;

      if (!token) throw err;

      setAccessToken(token);
      wake(token);

      original.headers.Authorization = `Bearer ${token}`;
      return http(original);
    } catch (e) {
      wake(null);
      throw e;
    } finally {
      refreshing = false;
    }
    
  }
);
