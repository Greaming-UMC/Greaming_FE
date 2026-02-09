type WriteBodyFieldProps = {
  value: string;
  onChange: (v: string) => void;
  maxLength?: number;
  className?: string;
  style?: React.CSSProperties;
};

export const WriteBodyField = ({
  value,
  onChange,
  maxLength = 600,
  className,
  style,
}: WriteBodyFieldProps) => {
  return (
    <div
      className={`bg-surface rounded-[10px] flex flex-col gap-[12px] w-full ${className ?? ""}`}
      style={{
        minHeight: 183,
        padding: 12,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="작성하기"
        maxLength={maxLength}
        className="w-full flex-1 resize-none bg-transparent outline-none body-large-emphasized placeholder:text-on-surface-variant-lowest overflow-y-auto"
      />

      <div className="flex justify-end label-medium text-on-surface-variant-lowest">
        {value.length}/{maxLength}
      </div>
    </div>
  );
};
