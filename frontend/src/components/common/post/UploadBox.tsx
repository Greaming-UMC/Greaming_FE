import { useRef } from "react";
import Icon from "../../common/Icon";

type UploadBoxProps = {
  onUpload: (files: FileList) => void;
  multiple?: boolean;
  className?: string;
};

export const UploadBox = ({ onUpload, multiple = true, className }: UploadBoxProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const openPicker = () => inputRef.current?.click();

  const onDrop: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files?.length) onUpload(e.dataTransfer.files);
  };

  const onDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={openPicker}
      onKeyDown={(e) => e.key === "Enter" && openPicker()}
      onDragOver={onDragOver}
      onDrop={onDrop}
      className={`flex items-center justify-center cursor-pointer select-none ${className ?? ""}`}
      style={{
        width: 400,
        height: 360,
        borderRadius: 28,
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
          e.currentTarget.value = ""; // 같은 파일 재선택 가능
        }}
      />
      <div className="flex flex-col items-center gap-5">
        <Icon name="import" size={18} className="p-6 w-20 h-20 rounded-full bg-primary text-secondary" />
        <span className="label-xlarge text-on-surface"> 그림을 드래그 또는 업로드해 주세요 </span>
      </div>
    </div>
  );
};