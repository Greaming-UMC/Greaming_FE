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
  
  const cardBase =
    "relative overflow-hidden rounded-large bg-primary " +
    "w-[420px] h-[300px] cursor-pointer select-none";

  const cardActive = "ring-2 ring-outline-variant";
  const cardInactive = "ring-1 ring-outline-variant";

  const removeBtn =
    "absolute right-3 top-3 rounded-full px-3 py-1 text-xs " +
    "bg-surface-variant-lowest text-on-surface-variant-bright";

  return (
    <div className="flex gap-5">
      {images.slice(0, 2).map((img) => {
        const active = img.id === activeId;

        return (
          <div
            key={img.id}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(img.id)}
            className={clsx(cardBase, active ? cardActive : cardInactive)}
          >
            {/* 이미지 */}
            <img
              src={img.previewUrl}
              alt={img.file.name}
              className="w-full h-full object-cover"
              draggable={false}
            />

            {/* 삭제 버튼 */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(img.id);
              }}
              className={removeBtn}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}
