import clsx from "clsx";
import arrowIcon from "../../../../assets/icon/arrow_down.svg";

export type SelectOption = { label: string; value: string };

export interface SelectFieldProps {
  value: string;
  onChange: (v: string) => void;

  options: SelectOption[];
  onSelectOption: (opt: SelectOption) => void;

  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;

  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

export const SelectField = ({
  value,
  onChange,
  options,
  onSelectOption,
  isOpen,
  onToggle,
  onClose,
  placeholder = "직접입력",
  disabled = false,
  error = false,
  className,
}: SelectFieldProps) => {
  return (
    <div className={clsx("relative", className)} style={{ width: 494 }}>
      {/* input box */}
      <div
        className={clsx(
          "flex items-center justify-between rounded-[10px]",
          "bg-(--color-surface-variant-high)",
          "state-layer secondary-opacity-8",
          disabled && "opacity-50"
        )}
        style={{
          height: 51,
          padding: 12,
          border: "1px solid",
          borderColor: error ? "var(--color-error)" : "transparent",
          boxSizing: "border-box",
          gap: 10,
        }}
      >
        {/* 직접 입력 가능한 input */}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "flex-1 bg-transparent outline-none",
            "font-medium text-[16px] leading-6",
            "placeholder:text-on-surface-variant-lowest"
          )}
        />

        {/* 화살표 버튼(드롭다운 토글) */}
        <button
          type="button"
          aria-label="옵션 열기"
          disabled={disabled}
          onClick={() => (isOpen ? onClose() : onToggle())}
          className="shrink-0 flex items-center justify-center state-layer secondary-opacity-8 rounded-full"
          style={{ width: 28, height: 28 }}
        >
          <img
            src={arrowIcon}
            alt=""
            aria-hidden="true"
            style={{ width: 13, height: 11, display: "block" }}
          />
        </button>
      </div>

      {/* 드롭다운 (모달 대신 지금은 아래로 펼침) */}
      {isOpen ? (
        <div
          className="absolute left-0 right-0 mt-2 rounded-[10px] bg-[var(--color-surface)]"
          style={{
            border: "1px solid var(--color-outline-variant)",
            boxSizing: "border-box",
            overflow: "hidden",
            zIndex: 50,
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => {
                onSelectOption(opt);
                onClose();
              }}
              className="w-full text-left px-4 py-3 state-layer secondary-opacity-8"
              style={{
                color: "var(--color-on-surface)",
              }}
            >
              <span className="font-medium text-[16px] leading-6">
                {opt.label}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
};
