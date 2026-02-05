import { useMemo, useState } from "react";
import type { UploadImageItem } from "./types";

const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

export function useUploadForm() {
  const [images, setImages] = useState<UploadImageItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isPrivate, setIsPrivate] = useState(false);
  const [allowComments, setAllowComments] = useState(true);

  const [body, setBody] = useState("");        // 설명/내용 (WriteBodyField)
  const [hashtagInput, setHashtagInput] = useState(""); // 해시태그 입력 (WriteTitleField)
  const [hashtags, setHashtags] = useState<string[]>([]);

  const activeImage = images[activeIndex];

  const canUpload = useMemo(() => {
    // 최소 조건은 "이미지 1장" + "내용(선택)"은 프로젝트 룰에 따라 바꿔도 됨
    return images.length > 0;
  }, [images.length]);

  const addFiles = (files: FileList | File[]) => {
    const arr = Array.from(files);
    const items = arr
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: uid(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

    setImages((prev) => {
      const next = [...prev, ...items];
      // 첫 업로드 시 activeIndex 0 유지
      return next;
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      const next = prev.filter((p) => p.id !== id);

      // URL revoke
      const removed = prev[idx];
      if (removed) URL.revokeObjectURL(removed.previewUrl);

      // activeIndex 보정
      if (next.length === 0) {
        setActiveIndex(0);
      } else if (activeIndex >= next.length) {
        setActiveIndex(next.length - 1);
      } else if (idx <= activeIndex && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }

      return next;
    });
  };

  const setActiveById = (id: string) => {
    const idx = images.findIndex((p) => p.id === id);
    if (idx >= 0) setActiveIndex(idx);
  };

  const commitHashtags = () => {
    const tokens = hashtagInput
      .split(/[\s,]+/g)
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => (t.startsWith("#") ? t.slice(1) : t));

    if (tokens.length === 0) return;

    setHashtags((prev) => {
      const set = new Set(prev);
      tokens.forEach((t) => set.add(t));
      return Array.from(set);
    });

    setHashtagInput("");
  };

  const removeHashtag = (tag: string) => {
    setHashtags((prev) => prev.filter((t) => t !== tag));
  };

  const submit = async () => {
    if (!canUpload) return;

    // TODO: API 연결
    // 예: FormData로 이미지 + body + flags + hashtags 전송
    const fd = new FormData();
    images.forEach((img) => fd.append("images", img.file));
    fd.append("body", body);
    fd.append("isPrivate", String(isPrivate));
    fd.append("allowComments", String(allowComments));
    fd.append("hashtags", JSON.stringify(hashtags));

    console.log("UPLOAD PAYLOAD", {
      images: images.map((i) => i.file.name),
      body,
      isPrivate,
      allowComments,
      hashtags,
    });

    // await api.post("/posts", fd)
  };

  return {
    images,
    activeIndex,
    activeImage,

    isPrivate,
    allowComments,

    body,
    hashtagInput,
    hashtags,

    canUpload,

    setActiveIndex,
    setActiveById,
    setIsPrivate,
    setAllowComments,

    setBody,
    setHashtagInput,

    addFiles,
    removeImage,

    commitHashtags,
    removeHashtag,

    submit,
  };
}
