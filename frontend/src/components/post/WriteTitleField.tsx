//작은 박스
type WriteTitleFieldProps = {
  value: string;
  onChange: (v: string) => void;
};

export const WriteTitleField = ({ value, onChange }: WriteTitleFieldProps) => {
  return (
    <div
      className="bg-surface rounded-[10px] flex items-center"
      style={{
        width: 1696,
        height: 50,
        padding: 16,
        boxSizing: "border-box",
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
