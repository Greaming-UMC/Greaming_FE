// import { http } from "../../../libs/http/client";
// import { normalizeApiPath } from "./normalizePath";

// // swagger 예시: GET /api/v1/s3/presigned-url?prefix=submission&fileName=cat.jpg
// export type PresignedUrlResult = {
//   url: string; // presigned PUT URL (쿼리 포함)
//   key: string; // 서버가 저장하라는 key
// };

// type PresignedUrlResponse = {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: PresignedUrlResult | null;
// };

// export async function getPresignedUrl(params: { prefix: string; fileName: string }) {
//   const path = normalizeApiPath("/api/v1/s3/presigned-url");

//   const res = await http.get<PresignedUrlResponse>(path, { params });

//   if (!res.data?.result) {
//     throw new Error(res.data?.message ?? "presigned-url response missing result");
//   }
//   return res.data.result;
// }

// /**
//  * presigned-url로 S3에 실제 업로드(PUT)
//  * - presigned url은 보통 5분 만료
//  * - PUT body는 file binary 그대로
//  */
// export async function putToS3(presignedUrl: string, file: File) {
//   const r = await fetch(presignedUrl, {
//     method: "PUT",
//     body: file,
//     headers: {
//       "Content-Type": file.type || "application/octet-stream",
//     },
//   });

//   if (!r.ok) {
//     throw new Error(`S3 upload failed (${r.status})`);
//   }
// }

// /** presignedUrl에서 "쿼리 제거한 실제 오브젝트 URL" 뽑기 */
// export function toPublicUrl(presignedUrl: string) {
//   return presignedUrl.split("?")[0];
// }

// src/features/upload/apis/s3.ts
// import { http } from "../../../libs/http/client";

// export type PresignedUrlResult = { url: string; key: string };

// type PresignedUrlResponse = {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: PresignedUrlResult | null;
// };

// // GET /api/v1/s3/presigned-url?prefix=submission&fileName=cat.jpg
// export async function getPresignedUrl(params: { prefix: string; fileName: string }) {
//   const res = await http.get<PresignedUrlResponse>("/api/v1/s3/presigned-url", {
//     params,
//   });

//   if (!res.data?.isSuccess || !res.data.result) {
//     throw new Error(res.data?.message ?? "Presigned URL 발급 실패");
//   }

//   return res.data.result;
// }

// // S3 presigned url로 PUT 업로드 (axios instance 쓰지 말고 fetch/axios 아무거나 OK)
// // ⚠️ presigned는 다른 도메인일 수 있어서 http 인스턴스(Authorization 등) 안 쓰는 게 안전
// export async function putToS3(presignedUrl: string, file: File) {
//   const r = await fetch(presignedUrl, {
//     method: "PUT",
//     body: file,
//     headers: {
//       "Content-Type": file.type || "application/octet-stream",
//     },
//   });

//   if (!r.ok) throw new Error(`S3 업로드 실패: ${r.status}`);
// }


// import { http } from "../../../libs/http/client";

// /**
//  * swagger: GET /api/v1/s3/presigned-url?prefix=submission&fileName=cat.jpg
//  * 응답: { isSuccess, code, message, result: { url, key } }
//  */
// export type PresignedUrlResult = {
//   url: string; // presigned PUT URL (쿼리 포함)
//   key: string; // S3에 저장될 key (백엔드에 넘길 값)
// };

// type PresignedUrlResponse = {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   result: PresignedUrlResult | null;
// };

// export async function getPresignedUrl(params: { prefix: string; fileName: string }) {
//   const res = await http.get<PresignedUrlResponse>("/api/v1/s3/presigned-url", {
//     params,
//   });

//   const result = res.data?.result ?? null;
//   if (!result) throw new Error("presigned-url result is null");
//   return result;
// }

// /**
//  * presignedUrl은 S3로 직접 PUT 해야 하므로 baseURL이 붙지 않게 fetch 권장
//  */
// export async function putToS3(presignedUrl: string, file: File) {
//   const res = await fetch(presignedUrl, {
//     method: "PUT",
//     headers: {
//       "Content-Type": file.type || "application/octet-stream",
//     },
//     body: file,
//   });

//   if (!res.ok) {
//     const text = await res.text().catch(() => "");
//     throw new Error(`S3 PUT failed: ${res.status} ${text}`);
//   }
// }

import { http } from "../../../libs/http/client";
import { normalizeApiPath } from "./normalizePath";

export type PresignedUrlResult = {
  url: string; // S3 PUT 할 presigned url (쿼리 포함)
  key: string; // 백엔드에 넘길 S3 key (URL 아님)
};

type PresignedUrlResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PresignedUrlResult | null;
};

// export async function getPresignedUrl(params: { prefix: string; fileName: string }) {
//   const res = await http.get<PresignedUrlResponse>(
//     normalizeApiPath(`/api/v1/s3/presigned-url`),
//     { params },
//   );

//   if (!res.data.isSuccess || !res.data.result) {
//     throw new Error(res.data.message || "Presigned URL 발급 실패");
//   }

//   return res.data.result;
// }



export async function getPresignedUrl(params: { prefix: string; fileName: string }) {
  // 로컬 스토리지에서 저장한 토큰 읽어오기
  const token = localStorage.getItem('accessToken'); 

  const res = await http.get<PresignedUrlResponse>(
    normalizeApiPath(`/api/v1/s3/presigned-url`),
    { 
      params,
      headers: {
        // Bearer 다음에 한 칸 띄우는 것 잊지 마세요!
        Authorization: `Bearer ${token}` 
      }
    },
  );

  if (!res.data.isSuccess || !res.data.result) {
    throw new Error(res.data.message || "Presigned URL 발급 실패");
  }

  return res.data.result;
}
/**
 * presigned URL은 "S3로 직접" PUT 요청해야 해서,
 * 우리 서버(http client) 말고 fetch를 쓰는 게 안정적임.
 */
export async function putToS3(presignedUrl: string, file: File) {
  const r = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });

  if (!r.ok) {
    throw new Error(`S3 업로드 실패: ${r.status}`);
  }
}