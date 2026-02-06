type WriteTitleFieldProps = {
  value: string;
  onChange: (v: string) => void;
  className?: string;
  style?: React.CSSProperties;
};

export const WriteTitleField = ({
  value,
  onChange,
  className,
  style,
}: WriteTitleFieldProps) => {
  return (
    <div
      className={`bg-surface rounded-[10px] flex items-center w-full ${className ?? ""}`}
      style={{
        height: 50,
        padding: 16,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="작성하기"
        className="w-full bg-transparent outline-none body-large-emphasized placeholder:text-on-surface-variant-lowest"
      />
    </div>
  );
};
