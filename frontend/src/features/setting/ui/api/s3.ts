import { http } from "../../../../libs/http/client";


export async function getPresignedUrl(params: { prefix: string; fileName: string }) {
  // 백엔드 주소: /api/v1/s3/presigned-url
  const res = await http.get("/api/v1/s3/presigned-url", { params });
  return res.data.result; // url과 key가 들어있음
}

export async function putToS3(presignedUrl: string, file: File) {
  const r = await fetch(presignedUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type || "application/octet-stream",
    },
    body: file,
  });

  if (!r.ok) throw new Error(`S3 업로드 실패: ${r.status}`);
}