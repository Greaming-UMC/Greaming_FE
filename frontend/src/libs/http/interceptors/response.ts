import { httpRefresh } from "../../http/refreshClient";
import { ENDPOINTS } from "../endpoints/endpoints";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "../../security/tokenStore";
import { useAuthStore } from "../../security/authStore";

const REFRESH_PATH = ENDPOINTS.AUTH.REISSUE_TOKEN;
const MY_PROFILE_PATH = ENDPOINTS.USER.GET_MY_PROFILE_HEADER;
const AUTH_TEST_PATH = ENDPOINTS.AUTH.TEST;

const isBrowser = typeof window !== "undefined";
const isRefreshRequest = (url?: string) =>
  Boolean(
    url &&
      (url.includes(REFRESH_PATH) ||
        url.includes(REFRESH_PATH.replace(/^\/api/, ""))),
  );
const isAuthTestRequest = (url?: string) =>
  Boolean(
    url &&
      (url.includes(AUTH_TEST_PATH) ||
        url.includes(AUTH_TEST_PATH.replace(/^\/api/, ""))),
  );
const isMyProfileRequest = (url?: string) =>
  Boolean(
    url &&
      (url.includes(MY_PROFILE_PATH) ||
        url.includes(MY_PROFILE_PATH.replace(/^\/api/, ""))),
  );

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshing: Promise<void> | null = null;
let sessionExpiredHandled = false;

const handleSessionExpired = () => {
  if (!isBrowser || sessionExpiredHandled) {
    return;
  }
  sessionExpiredHandled = true;
  alert("로그인 세션이 만료되었습니다.");
  window.location.href = "/login";
};

export const attachResponseInterceptor = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const originalRequest = error.config as RetryConfig;

      if (status === 403) {
        useAuthStore.getState().setUnauthenticated();
        const isOnLoginPage = isBrowser && window.location.pathname === "/login";
        if (
          isMyProfileRequest(originalRequest?.url) ||
          isAuthTestRequest(originalRequest?.url) ||
          isOnLoginPage
        ) {
          return Promise.reject(error);
        }
        handleSessionExpired();
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

            if (typeof authHeader === "string") {
              const match = authHeader.match(/^Bearer\s+(.+)$/i);
              const nextToken = (match?.[1] ?? authHeader).trim();
              if (nextToken) {
                setAccessToken(nextToken);
              } else {
                clearAccessToken();
              }
            } else {
              // 쿠키 기반 인증 환경에서는 Authorization 헤더 없이 재발급될 수 있습니다.
              clearAccessToken();
            }
            useAuthStore.getState().setAuthenticated();
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
        useAuthStore.getState().setUnauthenticated();
        const isOnLoginPage = isBrowser && window.location.pathname === "/login";
        if (
          !isOnLoginPage &&
          !isMyProfileRequest(originalRequest?.url) &&
          !isAuthTestRequest(originalRequest?.url)
        ) {
          handleSessionExpired();
        }
        return Promise.reject(refreshError);
      }

      originalRequest.headers = originalRequest.headers ?? {};
      const token = getAccessToken();
      if (token) {
        originalRequest.headers.Authorization = `Bearer ${token}`;
      } else if ("Authorization" in originalRequest.headers) {
        delete originalRequest.headers.Authorization;
      }

      return http(originalRequest);
    }
  );
};
