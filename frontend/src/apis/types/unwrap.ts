import type { ApiResultResponse } from "../types/common";

export const unwrapResult = <T>(res: ApiResultResponse<T>): T => {
  if (!res.isSuccess) {
    throw new Error(res.message);
  }

  if (res.result == null) {
    throw new Error("API result is null");
  }

  return res.result;
};
