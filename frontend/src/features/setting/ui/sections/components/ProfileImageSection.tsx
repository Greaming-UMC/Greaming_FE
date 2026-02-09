import { useRef } from "react";
import { Button } from "../../../../../components/common";
import Icon from "../../../../../components/common/Icon";

interface Props {
  previewUrl: string | null;
  onUpload: (url: string) => void;
}

export const ProfileImageSection = ({ previewUrl, onUpload }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => onUpload(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center justify-center overflow-hidden rounded-full bg-surface-variant-high" style={{ width: 112, height: 112 }}>
        {previewUrl ? <img src={previewUrl} alt="Profile" className="h-full w-full object-cover" /> : <Icon name="avatar_grey" size={112} />}
      </div>
      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
      <Button variant="surface" shape="round" widthMode="fixed" width="168px" className="border py-2 label-medium" onClick={() => fileInputRef.current?.click()}>
        프로필 사진 업로드
      </Button>
    </div>
  );
};