// src/components/common/post/UploadBox.tsx
import { useRef } from "react";
import ImportIcon from "../../../assets/icon/mono/import2.svg?react";

type UploadBoxProps = {
  /** 여러 장도 받을 수 있게 FileList로 통일 */
  onUpload: (files: FileList) => void;

  /** 필요하면 단일만 받도록 false로 */
  multiple?: boolean;

  className?: string;
};

export const UploadBox = ({
  onUpload,
  multiple = true,
  className,
}: UploadBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => inputRef.current?.click();

  const onDrop: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.length) onUpload(e.dataTransfer.files);
  };

  const onDragOver: React.DragEventHandler<HTMLLabelElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <label
      role="button"
      tabIndex={0}
      onClick={openPicker}
      onKeyDown={(e) => e.key === "Enter" && openPicker()}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`flex items-center justify-center cursor-pointer select-none ${className ?? ""}`}
      style={{
        width: 529,
        height: 395,
        borderRadius: 16,
        background: "var(--Schemes-Surface-Variant-Lowest,#545556)",
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple={multiple}
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onUpload(e.target.files);
          e.target.value = "";
        }}
      />

      {/* ✅ 굵기/모양 원래대로: className 안 주고 그대로 */}
      <ImportIcon width={28} height={28} />
    </label>
  );
};