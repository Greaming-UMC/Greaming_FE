import type { Hashtag } from "../../model/types";

export function HashtagChip({
  tag,
  selected,
  onClick,
}: {
  tag: Hashtag;
  selected: boolean;
  onClick: (tag: Hashtag) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(tag)}
      className={[
        "h-8 px-3 rounded-full border text-sm",
        selected ? "bg-black text-lime-300 border-black" : "bg-white text-black/70 border-black/10",
      ].join(" ")}
    >
      #{tag}
    </button>
  );
}
