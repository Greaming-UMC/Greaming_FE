import { useMemo, useState } from "react";
import type { UploadImageItem } from "./types";

const uid = () => `${Date.now()}_${Math.random().toString(16).slice(2)}`;

export function useUploadForm() {
  const [images, setImages] = useState<UploadImageItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const [isPrivate, setIsPrivate] = useState(false);
  const [allowComments, setAllowComments] = useState(false);

  const [body, setBody] = useState("");
  const [hashtagInput, setHashtagInput] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  const activeImage = images[activeIndex];

  const canUpload = useMemo(() => {
    const hasBody = body.trim().length > 0;
    const hasTags = hashtags.length > 0;
    const hasImage = images.length > 0;
    return hasBody && hasTags && hasImage;
  }, [images.length, body, hashtags.length]);

  const addFiles = (files: FileList | File[]) => {
    const arr = Array.from(files);
    const items = arr
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({
        id: uid(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

    setImages((prev) => [...prev, ...items]);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const idx = prev.findIndex((p) => p.id === id);
      const next = prev.filter((p) => p.id !== id);

      const removed = prev[idx];
      if (removed) URL.revokeObjectURL(removed.previewUrl);

      if (next.length === 0) setActiveIndex(0);
      else if (activeIndex >= next.length) setActiveIndex(next.length - 1);
      else if (idx <= activeIndex && activeIndex > 0) setActiveIndex(activeIndex - 1);

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
    const normalized = tag.startsWith("#") ? tag.slice(1) : tag;
    setHashtags((prev) => prev.filter((t) => t !== normalized));
  };

  const submit = async () => {
    if (!canUpload) return;

    const fd = new FormData();
    images.forEach((img) => fd.append("images", img.file));
    fd.append("body", body);
    fd.append("isPrivate", String(isPrivate));
    fd.append("allowComments", String(allowComments));
    fd.append("hashtags", JSON.stringify(hashtags));

    await new Promise((r) => setTimeout(r, 800));

    console.log("UPLOAD PAYLOAD", {
      images: images.map((i) => i.file.name),
      body,
      isPrivate,
      allowComments,
      hashtags,
    });
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
    setHashtags, 

    addFiles,
    removeImage,

    commitHashtags,
    removeHashtag,

    submit,
  };
}
