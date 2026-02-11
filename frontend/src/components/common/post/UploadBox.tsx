// import { useRef } from "react";
// import ImportIcon from "../../../assets/icon/mono/import2.svg?react";

// type UploadBoxProps = {
//   onUpload: (files: FileList) => void;
//   multiple?: boolean;
//   className?: string;
// };

// export const UploadBox = ({ onUpload, multiple = true, className }: UploadBoxProps) => {
//   const inputRef = useRef<HTMLInputElement | null>(null);

//   const openPicker = () => inputRef.current?.click();

//   const onDrop: React.DragEventHandler<HTMLButtonElement> = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.dataTransfer.files?.length) onUpload(e.dataTransfer.files);
//   };

//   const onDragOver: React.DragEventHandler<HTMLButtonElement> = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   return (
//     <>
//       <button
//         type="button"
//         onClick={openPicker}
//         onDragOver={onDragOver}
//         onDrop={onDrop}
//         className={`flex items-center justify-center cursor-pointer select-none ${className ?? ""}`}
//         style={{
//           width: 529,
//           height: 395,
//           borderRadius: 16,
//           background: "var(--Schemes-Surface-Variant-Lowest,#545556)",
//         }}
//       >
//         <ImportIcon width={28} height={28} />
//       </button>

//       <input
//         ref={inputRef}
//         type="file"
//         accept="image/*"
//         multiple={multiple}
//         className="hidden"
//         onChange={(e) => {
//           if (e.target.files) onUpload(e.target.files);
//           e.target.value = "";
//         }}
//       />
//     </>
//   );
// };

// src/components/common/post/UploadBox.tsx
import { useRef } from "react";
import ImportIcon from "../../../assets/icon/mono/import2.svg?react";

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
          e.currentTarget.value = ""; // 같은 파일 재선택 가능
        }}
      />

      <ImportIcon width={28} height={28} />
    </div>
  );
};