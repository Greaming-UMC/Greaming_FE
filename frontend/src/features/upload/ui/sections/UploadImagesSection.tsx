import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

import type { useUploadForm } from "../../model/useUploadForm";
import { UploadBox } from "../../../../components/common/post/UploadBox";

type UploadForm = ReturnType<typeof useUploadForm>;

type Props = {
  form: UploadForm;
  pageWidth: number; // 1372
};

export function UploadImagesSection({ form, pageWidth }: Props) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  // 드래그 스크롤
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScrollLeft: 0,
  });

  const onMouseDownScroller: React.MouseEventHandler<HTMLDivElement> = (e) => {
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
    <div
      className="flex flex-col pt-[22px] pb-[28px]"
      style={{ width: pageWidth }}
    >
      <div
        ref={scrollerRef}
        className={clsx(
          "overflow-x-auto overflow-y-hidden",
          "scrollbar-none",     
        )}
        onMouseDown={onMouseDownScroller}
      >
        {/* plugin이 없으면 이 한 줄만 남겨도 됨 */}
        <style>{`.hide-scrollbar::-webkit-scrollbar{display:none;}`}</style>

        <div
          className={clsx(
            "hide-scrollbar flex items-center gap-[24px] pb-[12px]",
            "w-max pr-[8px] select-none", 
          )}
        >
          {/* 업로드 박스 */}
          <div className="shrink-0">
            <UploadBox onUpload={(files) => form.addFiles(files)} multiple />
          </div>

          {/* 프리뷰들 */}
          {form.images.map((img, idx) => {
            const isFirst = idx === 0;

            return (
              <div
                key={img.id}
                className={clsx(
                  "shrink-0 overflow-hidden rounded-[20px] bg-primary",
                  isFirst ? "w-[220px] h-[340px]" : "w-[520px] h-[340px]",
                )}
              >
                <img
                  src={img.previewUrl}
                  alt={`upload-${idx}`}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>

      <ScrollIndicator width={pageWidth} scrollerRef={scrollerRef} />
    </div>
  );
}

/* ------------------------------ ScrollIndicator ------------------------------ */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function ScrollIndicator({
  width,
  scrollerRef,
}: {
  width: number;
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const TRACK_W = width;
  const THUMB_W = Math.min(520, Math.floor(TRACK_W * 0.45));

  const trackRef = useRef<HTMLDivElement | null>(null);
  const dragRef = useRef({
    active: false,
    startClientX: 0,
    startThumbLeft: 0,
  });

  const [thumbLeft, setThumbLeft] = useState(0);

  const syncThumbFromScroller = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const maxLeft = TRACK_W - THUMB_W;

    if (maxScroll <= 0) {
      setThumbLeft(0);
      return;
    }
    const ratio = el.scrollLeft / maxScroll;
    setThumbLeft(clamp(maxLeft * ratio, 0, maxLeft));
  };

  const syncScrollerFromThumb = (nextLeft: number) => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    const maxLeft = TRACK_W - THUMB_W;

    if (maxLeft <= 0 || maxScroll <= 0) return;

    const ratio = nextLeft / maxLeft;
    el.scrollLeft = ratio * maxScroll;
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncThumbFromScroller();

    const onScroll = () => syncThumbFromScroller();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  const onClickTrack: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement)?.dataset?.thumb === "true") return;

    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const maxLeft = TRACK_W - THUMB_W;
    const nextLeft = clamp(clickX - THUMB_W / 2, 0, maxLeft);

    setThumbLeft(nextLeft);
    syncScrollerFromThumb(nextLeft);
  };

  const onMouseDownThumb: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.button !== 0) return;

    dragRef.current.active = true;
    dragRef.current.startClientX = e.clientX;
    dragRef.current.startThumbLeft = thumbLeft;

    e.preventDefault();
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;

      const dx = e.clientX - dragRef.current.startClientX;
      const maxLeft = TRACK_W - THUMB_W;

      const nextLeft = clamp(dragRef.current.startThumbLeft + dx, 0, maxLeft);
      setThumbLeft(nextLeft);
      syncScrollerFromThumb(nextLeft);
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
  }, [thumbLeft, TRACK_W, THUMB_W]);

  return (
    <div
      ref={trackRef}
      className="relative h-[12px]"
      style={{ width: TRACK_W }}    
      onMouseDown={onClickTrack}
    >
      {/* track */}
      <div
        className={clsx(
          "absolute left-0 top-1/2 -translate-y-1/2 rounded-full",
          "bg-on-surface opacity-25",
          "h-[4px] w-full",
        )}
      />

      {/* thumb */}
      <div
        data-thumb="true"
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 rounded-full",
          "bg-on-surface opacity-95",
          "h-[6px]",
        )}
        style={{ left: thumbLeft, width: THUMB_W }} 
        onMouseDown={onMouseDownThumb}
      />
    </div>
  );
}
