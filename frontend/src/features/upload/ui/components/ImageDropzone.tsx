import { useRef } from "react";
import clsx from "clsx";

import ImportIcon from "../../../../../assets/icon/mono/import2.svg?react";

type Props = {
  onPickFiles: (files: FileList) => void;
  className?: string;
};

export function ImageDropzone({ onPickFiles, className }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => inputRef.current?.click();

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.length) {
      onPickFiles(e.dataTransfer.files);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => e.key === "Enter" && onClick()}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
      aria-label="이미지 업로드"
      className={clsx(
        "rounded-large bg-surface-variant-lowest",
        "flex items-center justify-center",
        "cursor-pointer select-none",
        className,
      )}
    >
      <ImportIcon
        width={28}
        height={28}
        className="text-on-surface-variant-bright fill-current"
        aria-hidden
      />

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          if (e.target.files) onPickFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
