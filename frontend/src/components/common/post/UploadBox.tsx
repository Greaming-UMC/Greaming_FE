// src/components/common/post/UploadBox.tsx
import ImportIcon from "../../../assets/icon/mono/import2.svg?react";

type UploadBoxProps = {
  onUpload: (file: File) => void;
};

export const UploadBox = ({ onUpload }: UploadBoxProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onUpload(file);
  };

  return (
    <label
      className="flex items-center justify-center cursor-pointer"
      style={{
        width: 529,
        height: 395,
        borderRadius: 16,
        background: "var(--Schemes-Surface-Variant-Lowest,#545556)",
      }}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
      />

      <ImportIcon width={28} height={28} />
    </label>
  );
};
