import { useMemo } from "react";
import clsx from "clsx";
import { Chip } from "../../../../components/common/display/Chip";

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
            if (e.key === "Enter") {
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
              label={t}
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