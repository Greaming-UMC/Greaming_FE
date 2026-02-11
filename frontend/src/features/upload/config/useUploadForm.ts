// src/features/upload/config/useUploadForm.ts
import { useMemo, useRef, useState } from "react";
import { getPresignedUrl, putToS3, postSubmission } from "../apis";

export type UploadImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  signature: string;
};

type UploadField = "FREE" | "DAILY" | "WEEKLY";
type UploadVisibility = "PUBLIC" | "CIRCLE";

type CreateSubmissionRequest = {
  title: string;
  caption: string;
  visibility: UploadVisibility;
  field: UploadField;
  thumbnailKey: string;
  commentEnabled: boolean;
  tags: string[];
  imageList: string[];
};

const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;
const fileSignature = (f: File) => `${f.name}_${f.size}_${f.lastModified}`;

const MAX_BODY_LEN = 350;

export function useUploadForm() {
  // 이미지
  const [images, setImages] = useState<UploadImageItem[]>([]);

  // 활성 이미지
  const [activeId, setActiveId] = useState<string | null>(null);
  const setActiveById = (id: string) => setActiveId(id);

  // 옵션
  const [isPrivate, setIsPrivate] = useState(false); // true면 visibility=CIRCLE
  const [allowComments, setAllowComments] = useState(false);

  // 내용
  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");

  // submit 중복 방지
  const submitLockRef = useRef(false);

  const canUpload = useMemo(() => {
    const hasImage = images.length > 0;
    const hasBody = body.trim().length > 0;
    const hasTags = hashtags.length > 0;
    return hasImage && hasBody && hasTags;
  }, [images.length, body, hashtags.length]);

  const addFiles = (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));

    setImages((prev) => {
      const prevSig = new Set(prev.map((p) => p.signature));
      const nextItems: UploadImageItem[] = [];

      for (const file of arr) {
        const sig = fileSignature(file);
        if (prevSig.has(sig)) continue;

        nextItems.push({
          id: uid(),
          file,
          previewUrl: URL.createObjectURL(file),
          signature: sig,
        });
        prevSig.add(sig);
      }

      // 첫 이미지 추가 시 활성 지정
      if (prev.length === 0 && nextItems.length > 0) {
        setActiveId(nextItems[0].id);
      }

      return [...prev, ...nextItems];
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);

      const next = prev.filter((p) => p.id !== id);

      // active가 제거된 경우 next[0]로 이동
      if (activeId === id) setActiveId(next[0]?.id ?? null);

      return next;
    });
  };

  const setBodyWithLimit = (next: string) => {
    setBody(next.slice(0, MAX_BODY_LEN));
  };

  const commitHashtags = () => {
    const raw = hashtagInput.trim();
    if (!raw) return;

    const tokens = raw
      .split(/[\s,]+/g)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t.slice(1) : t))
      .map((t) => t.replace(/[^\p{L}\p{N}_-]/gu, "")) // 한글/영문/숫자/_/-
      .filter(Boolean);

    if (tokens.length === 0) return;

    setHashtags((prev) => {
      const set = new Set(prev);
      tokens.forEach((t) => set.add(t));
      return Array.from(set);
    });

    setHashtagInput("");
  };

  const removeHashtag = (tag: string) => {
    const normalized = tag.startsWith("#") ? tag.slice(1) : tag;
    setHashtags((prev) => prev.filter((t) => t !== normalized));
  };

  
  const submit = async (field: UploadField) => {
    if (!canUpload) return;
    if (submitLockRef.current) return;
    submitLockRef.current = true;

    try {
      // 1) presigned 발급 + S3 PUT
      const uploadedKeys: string[] = [];

      for (const img of images) {
        const presigned = await getPresignedUrl({
          prefix: "submissions",
          fileName: img.file.name,
        });

        await putToS3(presigned.url, img.file);
        uploadedKeys.push(presigned.key);
      }

      if (uploadedKeys.length === 0) return;

      // 2) submissions payload (Swagger 스펙)
      const payload: CreateSubmissionRequest = {
        title: title.trim() || " ",
        caption: body,
        visibility: isPrivate ? "CIRCLE" : "PUBLIC",
        field,
        commentEnabled: allowComments,
        tags: hashtags,
        thumbnailKey: uploadedKeys[0],
        imageList: uploadedKeys,
      };

      const res = await postSubmission(payload);
      console.log("UPLOAD SUCCESS", res);
      return res;
    } catch (e) {
      console.error("UPLOAD FAILED", e);
      throw e;
    } finally {
      submitLockRef.current = false;
    }
  };

  return {
    // data
    images,
    activeId,
    isPrivate,
    allowComments,
    body,
    title,
    hashtags,
    hashtagInput,

    // derived
    canUpload,
    maxBodyLen: MAX_BODY_LEN,

    // setters/actions
    setActiveById,
    setIsPrivate,
    setAllowComments,
    setBody: setBodyWithLimit,
    setTitle,
    setHashtags,
    setHashtagInput,

    addFiles,
    removeImage,
    commitHashtags,
    removeHashtag,

    submit, // submit("DAILY")
  };
}
