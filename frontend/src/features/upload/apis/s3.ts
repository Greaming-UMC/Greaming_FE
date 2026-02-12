import { http } from "../../../libs/http/client";

export type PresignedUrlResult = {
  url: string;
  key: string;
};

type PresignedUrlResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PresignedUrlResult | null;
};

export async function getPresignedUrl(params: { prefix: string; fileName: string }) {
  const res = await http.get<PresignedUrlResponse>("/api/v1/s3/presigned-url", { params });

  if (!res.data?.isSuccess || !res.data.result) {
    throw new Error(res.data?.message ?? "Presigned URL 발급 실패");
  }

  return res.data.result;
}

export async function putToS3(presignedUrl: string, file: File) {
  const r = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!r.ok) {
    // S3 에러는 body가 비어있는 경우가 많아서 status만으로도 충분
    throw new Error(`S3 업로드 실패: ${r.status}`);
  }
}
