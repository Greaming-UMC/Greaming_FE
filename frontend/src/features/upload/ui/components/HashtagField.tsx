import { useMemo, useState } from "react";
import clsx from "clsx";
import { TagChip } from "../components/TagChip";

type Props = {
  value: string;
  onChange: (v: string) => void;

  tags: string[];
  onAddTag: (tag: string) => void;
  onRemoveTag: (tag: string) => void;
};

const normalizeTag = (raw: string) => {
  const t = raw.trim().replace(/^#/, "");
  if (!t) return "";
  return `#${t}`;
};

export function HashtagField({
  value,
  onChange,
  tags,
  onAddTag,
  onRemoveTag,
}: Props) {
  const canAdd = useMemo(() => normalizeTag(value).length > 1, [value]);

  const onComplete = () => {
    const t = normalizeTag(value);
    if (!t) return;
    if (tags.includes(t)) return;
    onAddTag(t);
    onChange("");
  };

  return (
    <div className="flex flex-col gap-[10px]">
      {/* 라벨 */}
      <div className="sub-title-large-emphasized text-on-surface">해시태그</div>

      {/* 입력줄 */}
      <div
        className={clsx(
          "w-full",
          "flex items-center justify-between",
          "h-[50px] rounded-[10px]",
          "px-[16px]",
          "bg-[var(--Schemes-Surface,#FCFCFC)]",
        )}
        style={{ boxSizing: "border-box" }}
      >
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="작성하기"
          className={clsx(
            "flex-1 bg-transparent outline-none",
            "body-large-emphasized placeholder:text-on-surface-variant-lowest",
          )}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onComplete();
            }
          }}
        />

        {/* 완료 버튼 */}
        <button
          type="button"
          onClick={onComplete}
          disabled={!canAdd}
          className={clsx(
            "w-[66px] h-[32px]",
            "rounded-[28px]",
            "flex items-center justify-center",
            "border",
            "border-[var(--Schemes-Outline-Variant,#B6B6B7)]",
            "bg-[var(--Schemes-Surface-Variant-high,#F3F3F3)]",
            "text-[var(--Schemes-On-Surface,#121315)]",
            "label-large",
            !canAdd && "opacity-40 cursor-not-allowed",
          )}
        >
          완료
        </button>
      </div>

      {/* 태그 목록 */}
      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-[8px]">
          {tags.map((t) => (
            <TagChip key={t} label={t} onDelete={() => onRemoveTag(t)} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
