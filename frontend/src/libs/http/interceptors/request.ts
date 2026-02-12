import type { AxiosInstance } from "axios";
import { getAccessToken } from "../../security/tokenStore";

export const attachRequestInterceptor = (http: AxiosInstance) => {
  http.interceptors.request.use(
    (config) => {
      const runtimeToken = getAccessToken();
      const devToken =
        import.meta.env.DEV &&
        typeof import.meta.env.VITE_DEV_ACCESS_TOKEN === "string" &&
        import.meta.env.VITE_DEV_ACCESS_TOKEN.trim().length > 0
          ? import.meta.env.VITE_DEV_ACCESS_TOKEN.trim()
          : null;
      const token = runtimeToken ?? devToken;
      if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    async (error) => {
      throw error;
    }
  );
};
