import { useEffect, useState, useRef, type RefObject } from "react";
import clsx from "clsx";

type Props = {
  scrollerRef: RefObject<HTMLDivElement | null>;
  className?: string;
};

export function ScrollIndicator({ scrollerRef, className }: Props) {
  const [ratio, setRatio] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false); 

  // 1. 스크롤 위치 감지 및 비율 계산
  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      if (max <= 0) {
        setRatio(0);
        return;
      }
      setRatio(el.scrollLeft / max);
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [scrollerRef]);

  // 2. 드래그 로직
  const handleMove = (clientX: number) => {
    const track = trackRef.current;
    const scroller = scrollerRef.current;
    if (!track || !scroller) return;

    const rect = track.getBoundingClientRect();
    // 트랙 내부에서의 상대적 클릭 위치 계산
    const x = clientX - rect.left;
    const newRatio = Math.min(Math.max(x / rect.width, 0), 1);

    const maxScroll = scroller.scrollWidth - scroller.clientWidth;
    scroller.scrollLeft = newRatio * maxScroll;
  };

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMove(e.clientX);

    const onMouseMove = (moveEvent: MouseEvent) => {
      handleMove(moveEvent.clientX);
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.body.style.userSelect = "none"; // 드래그 중 텍스트 선택 방지
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const thumbWidth = 25; 
    return (
    <div
        ref={trackRef}
        onMouseDown={onMouseDown}
        className={clsx(
        "relative w-full h-2 bg-gray-200 rounded-full cursor-pointer touch-none flex items-center",
        className
        )}
    >
        {/* 이미지의 검은색 바 부분 (Thumb) */}
        <div
        className={clsx(
            "absolute h-2 bg-black rounded-full transition-transform", 
            isDragging ? "duration-0" : "duration-150"
        )}
        style={{
            width: `${thumbWidth}%`,
            left: `${ratio * (100 - thumbWidth)}%`,
        }}
        />
    </div>

  );
}