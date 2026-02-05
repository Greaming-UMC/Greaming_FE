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
    <div className="flex gap-5">
      {images.slice(0, 2).map((img) => {
        const active = img.id === activeId;

        return (
          <div
            key={img.id}
            className={clsx(
              "relative overflow-hidden rounded-large bg-primary",
              active ? "ring-2 ring-outline-variant" : "ring-1 ring-outline-variant",
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
              className={clsx(
                "absolute right-3 top-3 rounded-full px-3 py-1 text-xs",
                "bg-surface-variant-lowest text-on-surface-variant-bright",
              )}
            >
              삭제
            </button>
          </div>
        );
      })}
    </div>
  );
}
