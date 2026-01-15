import httpRefresh from "../../http/refreshClient";
import type { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { getAccessToken, setAccessToken } from "../../security/tokenStore";

let refreshing: Promise<void> | null = null;
interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const attachResponseInterceptor = (http: AxiosInstance) => {
  http.interceptors.response.use(
    (response) => response,
    async (error) => {
      const status = error.response?.status;
      const originalRequest = error.config as RetryConfig;

      if (status === 403) {
        alert("접근 권한이 없습니다! 홈으로 이동합니다.");
        window.location.href = "/";
        return Promise.reject(error);
      }

      if (status !== 401) throw error;
      if (originalRequest.url?.includes("/auth/refresh")) return Promise.reject(error);
      if (originalRequest._retry) return Promise.reject(error);
      originalRequest._retry = true;

      if (!refreshing) {
        refreshing = (async () => {
          try {
            const res = await httpRefresh.post("/auth/refresh");
            setAccessToken(res.data.accessToken);
            
            // http 인스턴스 기본 헤더도 변경
            http.defaults.headers.common['Authorization'] = `Bearer ${res.data.accessToken}`;
            
          } catch (e) {
            // 리프레시 실패 시 로그아웃 처리
            // removeAccessToken(); // 스토어에 삭제 함수가 있다면 호출
            alert("로그인 세션이 만료되었습니다.");
            window.location.href = "/login";
            return Promise.reject(error);
          }
        })().finally(() => {
          refreshing = null;
        });
      }

      await refreshing;
      originalRequest.headers.Authorization = `Bearer ${getAccessToken()}`;
      return http(originalRequest);
    }
  );
};
