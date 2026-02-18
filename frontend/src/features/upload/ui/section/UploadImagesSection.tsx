// src/features/upload/ui/section/UploadImagesSection.tsx
import { useEffect, useRef, type MouseEventHandler } from "react";
import clsx from "clsx";

import type { UploadForm } from "../../hooks";
import { UploadBox } from "../../../../components/common/post/UploadBox";
import { ScrollIndicator } from "../../../../components/common/display/ScrollIndicator";
import Icon from "../../../../components/common/Icon";

type Props = {
  form: UploadForm;
  pageWidth: number;
};

export function UploadImagesSection({ form, pageWidth }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const isEmpty = form.images.length === 0;
  const canHorizontalScroll = form.images.length >= 2;

  // drag-to-scroll
  const dragRef = useRef({ active: false, startX: 0, startScrollLeft: 0 });

  const onMouseDownScroller: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!canHorizontalScroll) return;
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
      if (!canHorizontalScroll) return;
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
  }, [canHorizontalScroll]);

  return (
    <div className="flex flex-col pt-6 pb-6" style={{ width: pageWidth }}>
      {/* 스크롤 영역 */}
      <div
        ref={scrollerRef}
        className={clsx(
          "overflow-y-hidden hide-scrollbar",
          canHorizontalScroll ? "overflow-x-auto" : "overflow-x-hidden",
        )}
        onMouseDown={onMouseDownScroller}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* webkit scrollbar 숨김 */}
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none;}`}</style>

        <div
          className={clsx("flex items-center gap-6 pb-3")}
          style={{
            width: isEmpty ? "100%" : "max-content",
            paddingRight: isEmpty ? 0 : 8,
            userSelect: "none",
            justifyContent: isEmpty ? "center" : undefined,
          }}
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
                "relative shrink-0 overflow-hidden rounded-2xl",
                "w-130 h-85",
                img.id === (form as any).activeId ? "ring-2 ring-primary" : "ring-0"
              )}
              onClick={() => (form as any).setActiveById?.(img.id)}
              role="button"
              tabIndex={0}
            >
              <img
                src={img.previewUrl}
                alt="upload"
                className="w-full h-full object-cover bg-surface-variant-lowest"
                draggable={false}
              />

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  form.removeImage(img.id);
                }}
                aria-label="삭제"
                className={[
                  "absolute right-3 top-3 z-50",
                  "flex h-8 w-8 items-center justify-center",
                  "rounded-full bg-state-layers-surface-variant-opacity-16 text-on-surface",
                  "hover:bg-state-layers-primary-opacity-8 ease-in-out duration-200",
                ].join(" ")}
              >
                <Icon name="close" size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* 공용 스크롤 인디케이터 */}
      {canHorizontalScroll ? (
        <ScrollIndicator scrollerRef={scrollerRef} className="mt-[8px]" />
      ) : null}
    </div>
  );
}
