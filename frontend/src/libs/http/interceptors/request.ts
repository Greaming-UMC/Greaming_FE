import type { AxiosInstance } from "axios";

export const attachRequestInterceptor = (http: AxiosInstance) => {
  http.interceptors.request.use(
    (config) => config,
    async (error) => {
      throw error;
    }
  );
};
