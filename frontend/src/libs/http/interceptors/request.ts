import type { AxiosInstance } from "axios";
import { getAccessToken } from "../../security/tokenStore";

export const attachRequestInterceptor = (http: AxiosInstance) => {
  http.interceptors.request.use(
    (config) => {
      const token = getAccessToken();
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
