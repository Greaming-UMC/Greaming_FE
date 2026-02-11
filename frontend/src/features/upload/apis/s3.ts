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
import { http } from "../../../libs/http/client";

export type PresignedUrlResult = { url: string; key: string };

type PresignedUrlResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PresignedUrlResult | null;
};

// GET /api/v1/s3/presigned-url?prefix=submission&fileName=cat.jpg
export async function getPresignedUrl(params: { prefix: string; fileName: string }) {
  const res = await http.get<PresignedUrlResponse>("/api/v1/s3/presigned-url", {
    params,
  });

  if (!res.data?.isSuccess || !res.data.result) {
    throw new Error(res.data?.message ?? "Presigned URL 발급 실패");
  }

  return res.data.result;
}

// S3 presigned url로 PUT 업로드 (axios instance 쓰지 말고 fetch/axios 아무거나 OK)
// ⚠️ presigned는 다른 도메인일 수 있어서 http 인스턴스(Authorization 등) 안 쓰는 게 안전
export async function putToS3(presignedUrl: string, file: File) {
  const r = await fetch(presignedUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
  });

  if (!r.ok) throw new Error(`S3 업로드 실패: ${r.status}`);
}