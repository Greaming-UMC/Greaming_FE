import clsx from "clsx";
import type { UploadImageItem } from "../../model/types";

type Props = {
  images: UploadImageItem[];
  activeId?: string;
  onSelect: (id: string) => void;
  onRemove: (id: string) => void;
};

export function ImagePreviewStrip({
  images,
  activeId,
  onSelect,
  onRemove,
}: Props) {
  return (
    <div className="flex gap-[20px]">
      {images.slice(0, 2).map((img) => {
        const active = img.id === activeId;
        return (
          <div
            key={img.id}
            className={clsx(
              "relative overflow-hidden rounded-[16px] bg-black",
              active ? "ring-2 ring-black/40" : "ring-1 ring-black/10",
            )}
            style={{ width: 420, height: 300 }}
            onClick={() => onSelect(img.id)}
            role="button"
            tabIndex={0}
          >
            <img
              src={img.previewUrl}
              alt={img.file.name}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(img.id);
              }}
              className="absolute right-3 top-3 rounded-full bg-black/50 px-3 py-1 text-white text-xs"
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}
