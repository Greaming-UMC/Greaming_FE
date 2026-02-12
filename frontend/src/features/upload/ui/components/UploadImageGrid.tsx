import type { UploadImageItem } from "../../config/useUploadForm";

export function ImageGrid({
  images,
  onRemove,
}: {
  images: UploadImageItem[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-[16px]">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative overflow-hidden rounded-[16px] bg-surface-variant-lowest"
          style={{ width: 260, height: 180 }}
        >
          <img
            src={img.previewUrl}
            alt="upload"
            className="w-full h-full object-cover"
            draggable={false}
          />

          <button
            type="button"
            onClick={() => onRemove(img.id)}
            className={[
              "absolute right-[10px] top-[10px]",
              "w-[28px] h-[28px]",
              "rounded-full",
              "bg-surface-variant-lowest/70",
              "text-on-surface",
              "flex items-center justify-center",
              "hover:bg-surface-variant-lowest/90",
            ].join(" ")}
            aria-label="삭제"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}