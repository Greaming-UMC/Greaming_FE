import { ENDPOINTS } from "../endpoints/endpoints";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { clearAccessToken, getAccessToken } from "../../security/tokenStore";
import { useAuthStore } from "../../security/authStore";
import {
  refreshAccessTokenNow,
  stopPreemptiveRefresh,
} from "../../security/refreshManeger";

const REFRESH_PATH = ENDPOINTS.AUTH.REISSUE_TOKEN;
const MY_PROFILE_PATH = ENDPOINTS.USER.GET_MY_PROFILE_HEADER;

const isBrowser = typeof window !== "undefined";
const isRefreshRequest = (url?: string) =>
  Boolean(
    url &&
      (url.includes(REFRESH_PATH) ||
        url.includes(REFRESH_PATH.replace(/^\/api/, ""))),
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
        clearAccessToken();
        stopPreemptiveRefresh();
        const isOnLoginPage = isBrowser && window.location.pathname === "/login";
        if (
          isMyProfileRequest(originalRequest?.url) ||
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

      try {
        await refreshAccessTokenNow("reactive");
      } catch (refreshError) {
        clearAccessToken();
        stopPreemptiveRefresh();
        useAuthStore.getState().setUnauthenticated();
        const isOnLoginPage = isBrowser && window.location.pathname === "/login";
        if (
          !isOnLoginPage &&
          !isMyProfileRequest(originalRequest?.url)
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
