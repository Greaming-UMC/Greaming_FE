import { httpRefresh } from "../../http/refreshClient";
import { ENDPOINTS } from "../endpoints/endpoints";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "../../security/tokenStore";

const REFRESH_PATH = ENDPOINTS.AUTH.REISSUE_TOKEN.replace(/^\/api/, "");

const isBrowser = typeof window !== "undefined";
const isRefreshRequest = (url?: string) => Boolean(url && url.includes(REFRESH_PATH));

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshing: Promise<void> | null = null;

export const attachResponseInterceptor = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const originalRequest = error.config as RetryConfig;

      if (status === 403) {
        if (isBrowser) {
          alert("세션이 만료되었습니다. 다시 로그인해주세요.");
          window.location.href = "/login";
        }
        return Promise.reject(error);
      }

      if (status !== 401 || !originalRequest) {
        return Promise.reject(error);
      }

      if (isRefreshRequest(originalRequest.url) || originalRequest._retry) {
        return Promise.reject(error);
      }
      originalRequest._retry = true;
      

      if (!refreshing) {
        refreshing = (async () => {
          try {
            const res = await httpRefresh.post(REFRESH_PATH);
            const authHeader =
              res.headers?.authorization ?? res.headers?.Authorization;

            if (typeof authHeader !== "string") {
              throw new Error("authorization header missing");
            }

            const match = authHeader.match(/^Bearer\s+(.+)$/i);
            const nextToken = (match?.[1] ?? authHeader).trim();
            if (!nextToken) {
              throw new Error("access token missing");
            }

            setAccessToken(nextToken);
          } catch {
            clearAccessToken();
            throw error;
          }
        })().finally(() => {
          refreshing = null;
        });
      }

      try {
        await refreshing;
      } catch (refreshError) {
        clearAccessToken();
        if (isBrowser) {
          alert("로그인 세션이 만료되었습니다.");
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
      }

      const token = getAccessToken();
      if (!token) {
        return Promise.reject(error);
      }

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${token}`;

      return http(originalRequest);
    }
  );
};
