// src/features/upload/ui/sections/UploadImagesSection.tsx
import { useEffect, useRef, type MouseEventHandler } from "react";
import clsx from "clsx";

import type { useUploadForm } from "../../model/useUploadForm";
import { UploadBox } from "../../../../components/common/post/UploadBox";
import { ScrollIndicator } from "../../../../components/common/display/ScrollIndicator";

type UploadForm = ReturnType<typeof useUploadForm>;

type Props = {
  form: UploadForm;
  pageWidth: number;
};

export function UploadImagesSection({ form, pageWidth }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // drag-to-scroll
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 });

  const onMouseDownScroller: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== 0) return;
    const el = scrollerRef.current;
    if (!el) return;

    dragRef.current.active = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startScrollLeft = el.scrollLeft;

    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;
      const el = scrollerRef.current;
      if (!el) return;

      const dx = e.clientX - dragRef.current.startX;
      el.scrollLeft = dragRef.current.startScrollLeft - dx;
    };

    const onUp = () => {
      dragRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, []);

  return (
    <div className="flex flex-col pt-[22px] pb-[28px]" style={{ width: pageWidth }}>
      {/* 스크롤 영역 */}
      <div
        ref={scrollerRef}
        className="overflow-x-auto overflow-y-hidden hide-scrollbar"
        onMouseDown={onMouseDownScroller}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* webkit scrollbar 숨김 */}
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none;}`}</style>

        <div
          className={clsx("flex items-center gap-[24px] pb-[12px]")}
          style={{ width: "max-content", paddingRight: 8, userSelect: "none" }}
        >
          {/* 업로드 박스 */}
          <div
            className="shrink-0"
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <UploadBox onUpload={(files) => form.addFiles(files)} multiple />
          </div>

          {/* 이미지 리스트 (모두 동일 사이즈) */}
          {form.images.map((img) => (
            <div
              key={img.id}
              className={clsx(
                "relative shrink-0 overflow-hidden rounded-[20px]",
                "w-[520px] h-[340px]",
                img.id === (form as any).activeId ? "ring-2 ring-primary" : "ring-0"
              )}
              onClick={() => (form as any).setActiveById?.(img.id)}
              role="button"
              tabIndex={0}
            >
              <img
                src={img.previewUrl}
                alt="upload"
                className="w-full h-full object-cover"
                draggable={false}
              />

              {/* 삭제 버튼 (X) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  form.removeImage(img.id);
                }}
                className={[
                  "absolute right-[12px] top-[12px]",
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
      </div>

      {/* 공용 스크롤 인디케이터 */}
      <ScrollIndicator scrollerRef={scrollerRef} className="mt-[8px]" />
    </div>
  );
}
