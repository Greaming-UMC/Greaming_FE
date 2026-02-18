import { useMemo, useRef, useState } from "react";
import { getPresignedUrl, putToS3, postSubmission } from "../api";
import type {
  UploadFieldType,
  UploadSubmissionPayload,
  UploadVisibilityType,
} from "../config/types";

export type UploadImageItem = {
  id: string;
  file: File;
  previewUrl: string;
  signature: string;
};

type SubmitMeta = {
  field: UploadFieldType;
  challengeId?: number | null;
  visibility?: UploadVisibilityType;
};

export type UploadSubmitMeta = SubmitMeta;

const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;
const fileSignature = (f: File) => `${f.name}_${f.size}_${f.lastModified}`;

const MAX_BODY_LEN = 350;

export function useUploadForm() {
  const [images, setImages] = useState<UploadImageItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const setActiveById = (id: string) => setActiveId(id);

  // 업로드 정책: 댓글 허용은 상시 true
  const allowComments = true;
  const setAllowComments = (_checked: boolean) => {};

  const [body, setBody] = useState("");
  const [title, setTitle] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);
  const [hashtagInput, setHashtagInput] = useState("");

  const submitLockRef = useRef(false);

  const canUpload = useMemo(() => {
    const hasImage = images.length > 0;
    const hasTitle = title.trim().length > 0; 
    const hasBody = body.trim().length > 0;
    const hasTags = hashtags.length > 0;
    return hasImage && hasTitle && hasBody && hasTags;
  }, [images.length, title, body, hashtags.length]);

  const addFiles = (files: FileList | File[]) => {
    const arr = Array.from(files).filter((f) => f.type.startsWith("image/"));

    setImages((prev) => {
      const nextItems: UploadImageItem[] = [];

      for (const file of arr) {
        const sig = fileSignature(file);
        nextItems.push({
          id: uid(),
          file,
          previewUrl: URL.createObjectURL(file),
          signature: sig,
        });
      }

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
      if (activeId === id) setActiveId(next[0]?.id ?? null);
      return next;
    });
  };

  const setBodyWithLimit = (next: string) => setBody(next.slice(0, MAX_BODY_LEN));

  const commitHashtags = () => {
    const raw = hashtagInput.trim();
    if (!raw) return;

    const tokens = raw
      .split(/[\s,]+/g)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t.slice(1) : t))
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

  const submit = async ({ field, challengeId = null, visibility = "PUBLIC" }: SubmitMeta) => {
    if (!canUpload) return;
    if (submitLockRef.current) return;
    submitLockRef.current = true;

    try {
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

      const payload: UploadSubmissionPayload = {
        title: title.trim(),
        caption: body,
        visibility,
        field,
        challengeId,
        commentEnabled: allowComments,
        tags: hashtags,
        thumbnailKey: uploadedKeys[0],
        imageList: uploadedKeys,
      };

      const res = await postSubmission(payload);
      return res;
    } finally {
      submitLockRef.current = false;
    }
  };

  return {
    images,
    activeId,
    allowComments,
    body,
    title,
    hashtags,
    hashtagInput,

    canUpload,
    maxBodyLen: MAX_BODY_LEN,

    setActiveById,
    setAllowComments,
    setBody: setBodyWithLimit,
    setTitle,
    setHashtags,
    setHashtagInput,

    addFiles,
    removeImage,
    commitHashtags,
    removeHashtag,

    submit,
  };
}

export type UploadForm = ReturnType<typeof useUploadForm>;
