import type { AxiosInstance } from "axios";
import { attachRequestInterceptor } from "./request";
import { attachResponseInterceptor } from "./response";

export const setupInterceptors = (http: AxiosInstance) => {
    attachRequestInterceptor(http);
    attachResponseInterceptor(http);
};
