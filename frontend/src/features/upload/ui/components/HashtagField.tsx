import clsx from "clsx";
import { useMemo } from "react";
import { Chip } from "../../../../components/common/display/Chip";

type Props = {
  value: string;
  onChange: (v: string) => void;

  tags: string[]; // "tag" (노샵)로 저장한다고 가정하였슴다
  onAddTags: (next: string[]) => void;
  onRemoveTag: (tag: string) => void;
};

const normalizeTokens = (raw: string) => {
  // " #a, b  c" -> ["a","b","c"]
  return raw
    .split(/[\s,]+/g)
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (t.startsWith("#") ? t.slice(1) : t));
};

const normalizeKey = (t: string) => t.trim().replace(/^#/, "").toLowerCase();

export function HashtagField({ value, onChange, tags, onAddTags, onRemoveTag }: Props) {
  const canAdd = useMemo(() => normalizeTokens(value).length > 0, [value]);

  const onComplete = () => {
    const tokens = normalizeTokens(value).map(normalizeKey).filter(Boolean);
    if (tokens.length === 0) return;

    // 기존 tags도 정규화해서 Map으로 합치기 (for 중복방지)
    const map = new Map<string, string>();
    tags.forEach((t) => {
      const key = normalizeKey(t);
      if (key) map.set(key, key);
    });
    tokens.forEach((t) => map.set(t, t));

    onAddTags(Array.from(map.values()));
    onChange("");
  };

  const inputRow =
    "w-full box-border flex items-center justify-between " +
    "h-[50px] px-[16px] " +
    "bg-surface rounded-small";

  const inputBase =
    "flex-1 bg-transparent outline-none body-large-emphasized " +
    "placeholder:text-on-surface-variant-lowest";

  const completeBtn =
    "w-[66px] h-[32px] flex items-center justify-center " +
    "rounded-extra-large border border-outline-variant " +
    "bg-surface-variant-high text-on-surface label-large";

  const chipClass =
    "h-[32px] rounded-[28px] px-[14px] gap-[8px] label-medium whitespace-nowrap";

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="sub-title-large-emphasized text-on-surface">해시태그</div>

      <div className={inputRow}>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="작성하기"
          className={inputBase}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) {
              e.preventDefault();
              onComplete();
            }
          }}
        />

        <button
          type="button"
          onClick={onComplete}
          disabled={!canAdd}
          className={clsx(completeBtn, !canAdd && "opacity-40 cursor-not-allowed")}
        >
          완료
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-[8px]">
          {tags.map((t) => (
            <Chip
              key={t}
              label={`#${t}`}
              onDelete={() => onRemoveTag(t)}
              variant="filled"
              className={chipClass}
            />
          ))}
        </div>
      )}
    </div>
  );
}
