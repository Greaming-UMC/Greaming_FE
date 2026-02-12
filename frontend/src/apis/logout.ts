import { http } from "../libs/http/client";
import { ENDPOINTS } from "../libs/http/endpoints/endpoints";
import type { ApiResultResponse } from "./types/common";

export type LogoutResponse = ApiResultResponse<null>;

export const logout = async (): Promise<LogoutResponse> => {
  const { data } = await http.post<LogoutResponse>(ENDPOINTS.AUTH.LOGOUT);
  return data;
};
