import { http } from "../../../libs/http/client";
import { ENDPOINTS } from "../../../libs/http/endpoints/endpoints";
import type { ApiResultResponse } from "../common";
import { unwrapResult } from "../unwrap";
import type { CheckHomeHeaderResult } from "./checkHomeHeader";

export const getHome = async (): Promise<CheckHomeHeaderResult> => {
  const { data } = await http.get<ApiResultResponse<CheckHomeHeaderResult>>(
    ENDPOINTS.HOME.GET_HOME,
  );
  return unwrapResult(data);
};
