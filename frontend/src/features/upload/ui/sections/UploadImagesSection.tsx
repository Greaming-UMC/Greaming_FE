import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import type { useUploadForm } from "../../model/useUploadForm";
import { UploadBox } from "../../../../components/common/post/UploadBox";

type UploadForm = ReturnType<typeof useUploadForm>;

type Props = {
  form: UploadForm;
};

export function UploadImagesSection({ form }: Props) {
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
    <div className="flex w-full flex-col pt-[22px] pb-[28px]">
      <div
        ref={scrollerRef}
        className={clsx(
          "overflow-x-auto overflow-y-hidden",
          "[&::-webkit-scrollbar]:hidden [scrollbar-width:none] [-ms-overflow-style:none]"
        )}
        onMouseDown={onMouseDownScroller}
      >
        <div className={clsx("flex items-center gap-[24px] pb-[12px]", "w-max pr-[8px] select-none")}>
          <div className="shrink-0">
            <UploadBox onUpload={(files) => form.addFiles(files)} multiple />
          </div>

          {form.images.map((img, idx) => {
            const isFirst = idx === 0;

            return (
              <div
                key={img.id}
                className={clsx(
                  "shrink-0 overflow-hidden rounded-[20px] bg-primary",
                  isFirst ? "w-[220px] h-[340px]" : "w-[520px] h-[340px]"
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

      <ScrollIndicator scrollerRef={scrollerRef} />
    </div>
  );
}

/* ------------------------------ ScrollIndicator ------------------------------ */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function ScrollIndicator({
  scrollerRef,
}: {
  scrollerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const trackRef = useRef<HTMLDivElement | null>(null);

  // thumb 드래그
  const dragRef = useRef({
    active: false,
    startClientX: 0,
    startThumbLeft: 0,
  });

  const [trackW, setTrackW] = useState(0);
  const [thumbLeft, setThumbLeft] = useState(0);


  const thumbW = useMemo(() => {
    if (trackW <= 0) return 0;
    return Math.min(520, Math.floor(trackW * 0.45));
  }, [trackW]);

  const maxLeft = useMemo(() => Math.max(0, trackW - thumbW), [trackW, thumbW]);

  // track width 측정 (부모 w-full에 맞춰 자동)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => setTrackW(el.getBoundingClientRect().width);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const syncThumbFromScroller = () => {
    const el = scrollerRef.current;
    if (!el) return;

    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0 || maxLeft <= 0) {
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
    if (maxScroll <= 0 || maxLeft <= 0) return;

    const ratio = nextLeft / maxLeft;
    el.scrollLeft = ratio * maxScroll;
  };

  // scroller scroll ↔ thumb 동기화
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    syncThumbFromScroller();

    const onScroll = () => syncThumbFromScroller();
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxLeft]);

  const onClickTrack: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if ((e.target as HTMLElement)?.dataset?.thumb === "true") return;

    const track = trackRef.current;
    if (!track) return;

    const rect = track.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const nextLeft = clamp(clickX - thumbW / 2, 0, maxLeft);
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

  // thumb 드래그 이동
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (!dragRef.current.active) return;

      const dx = e.clientX - dragRef.current.startClientX;
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
  }, [maxLeft]);

  const hidden = trackW <= 0 || thumbW <= 0 || maxLeft <= 0;

  return (
    <div
      ref={trackRef}
      className="relative h-[12px] w-full"
      onMouseDown={onClickTrack}
    >
      {/* track */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-on-surface opacity-25 h-[4px] w-full" />

      {/* thumb */}
      <div
        data-thumb="true"
        className={clsx(
          "absolute top-1/2 -translate-y-1/2 rounded-full",
          "bg-on-surface opacity-95 h-[6px]",
          hidden && "opacity-0 pointer-events-none"
        )}
        style={{ left: thumbLeft, width: thumbW }} //이게 피그마에서 원하는 스크롤바를 사용하려면 style로만 해야된다해서.. 일단은 이렇게 뒀습니다!
        onMouseDown={onMouseDownThumb}
      />
    </div>
  );
}
