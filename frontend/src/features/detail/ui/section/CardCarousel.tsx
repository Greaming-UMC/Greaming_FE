import { useRef, type HTMLAttributes, type ReactNode } from "react";
import Icon from "../../../../components/common/Icon";

interface CardCarouselProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  moreLink?: string;
  onMoreClick?: () => void;
  children: ReactNode;
}

export const CardCarousel = ({
  title,
  moreLink,
  onMoreClick,
  children,
  className = "",
  ...props
}: CardCarouselProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      // 한 번에 이동할 너비 (카드 하나 너비 정도)
      const scrollAmount = 300;

      current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className={`w-full flex flex-col gap-4 py-4 ${className}`}
      {...props}
    >
      {/* 1. 헤더 영역 (제목 + 더보기) - 기존과 동일 */}
      <div className="flex items-center justify-between px-1">
        <h2 className="text-lg font-bold text-[#121315]">{title}</h2>
        <button
          onClick={onMoreClick}
          className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          더보기 <span className="text-lg leading-none">+</span>
        </button>
      </div>

      {/* ⭐ 2. 캐러셀 바디  */}
      {/* 전체를 Flex로 감싸고 items-center로 수직 중앙 정렬 */}
      <div className="flex items-center gap-2 relative group">
        {/* [Left Button] - absolute 제거, static 포지션 */}
        <button
          onClick={() => scroll("left")}
          className="shrink-0 z-10 
                     w-10 h-10 rounded-full bg-surface-variant-lowest shadow-md backdrop-blur-sm
                     flex items-center justify-center 
                     cursor-pointer"
          aria-label="Previous"
        >
          {/* 아이콘 색상을 흰색으로 변경 */}
          <Icon name="arrow-left" size={24} className="text-outline-variant" />
        </button>

        <div
          ref={scrollRef}
          className="
            flex-1 flex gap-4 overflow-x-auto 
            pb-4 -mb-4 /* 스크롤바 숨김 트릭 */
            snap-x snap-mandatory /* 스크롤 스냅 */
            scroll-smooth no-scrollbar
            px-2 /* 버튼과 간격 확보 */
          "
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {children}
        </div>

        {/* [Right Button] - absolute 제거, static 포지션 */}
        <button
          onClick={() => scroll("right")}
          className="shrink-0 z-10 
                     w-10 h-10 rounded-full bg-surface-variant-lowest shadow-md backdrop-blur-sm
                     flex items-center justify-center 
                     cursor-pointer"
          aria-label="Next"
        >
          <Icon name="arrow-right" size={24} className="text-outline-variant" />
        </button>
      </div>
    </section>
  );
};
