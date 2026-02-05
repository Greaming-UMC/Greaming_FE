import clsx from "clsx";

type Props = {
  label: string; // "#태그"
  onDelete?: () => void; // x 클릭
  className?: string;
};

export function TagChip({ label, onDelete, className }: Props) {
  return (
    <div
      className={clsx(
        "inline-flex items-center justify-center",
        "h-[32px] rounded-[28px]",
        "px-[14px] gap-[8px]",
        "bg-surface-variant-lowest",
        "text-on-surface-variant-bright",
        className,
      )}
    >
      <span className="label-medium whitespace-nowrap">{label}</span>

      {onDelete ? (
        <button
          type="button"
          onClick={onDelete}
          className="inline-flex items-center justify-center"
          aria-label={`${label} 삭제`}
        >
          <span className="label-medium leading-none opacity-90">×</span>
        </button>
      ) : null}
    </div>
  );
}
