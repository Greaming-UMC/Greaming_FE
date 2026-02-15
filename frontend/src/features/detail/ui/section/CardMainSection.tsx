import { memo } from "react";
import { Card } from "../../../../components/common/display";
import Icon from "../../../../components/common/Icon";
import { useCarousel } from "../section/useCarousel";

export interface CardMainProps {
  image_list: string[];
  title: string;
  className?: string;
}

const CardMain = ({ image_list, title, className = "" }: CardMainProps) => {
  const images =
    Array.isArray(image_list) && image_list.length > 0
      ? image_list
      : ["/sample.jpg"];
  const { currentIndex: index, prev, next, goTo } = useCarousel(images.length);

  const isFirstSlide = index === 0;
  const isLastSlide = index === images.length - 1;

  return (
    // 1️⃣ 너비를 최대 840px로 제한하고 중앙 정렬
    <div className={`w-full max-w-[51.25rem] mx-auto ${className}`}>
      <Card.Root className="w-full">
        {/* 2️⃣ 높이를 720px로 고정 (부모 상자 크기 확정) */}
        <div className="relative w-full h-[51.25rem] bg-on-surface-variant-low rounded-lg overflow-hidden">
          <Card.Media
            src={images[index] ?? "/sample.jpg"}
            alt={title ?? "image"}
            // 3️⃣ aspect-square 제거 (정사각형 아님)
            // aspectRatio="aspect-square"

            // 4️⃣ w-full h-full로 840x720 영역을 가득 채움 + 이미지는 object-contain
            className="w-full h-full bg-surface-variant [&>img]:w-full [&>img]:h-full [&>img]:object-contain [&>img]:object-center"
          />

          {/* Prev / Next buttons */}
          {images.length > 1 && (
            <>
              {!isFirstSlide && (
                  <Icon
                    name="arrow_left_circle"
                    onClick={prev}
                    size={32}
                    className="absolute left-4 top-1/2 -translate-y-1/2 fill-current cursor-pointer drop-shadow-md transition-transform z-10 text-on-surface-variant-lowest"
                  />
              )}

              {!isLastSlide && (
                <Icon
                    name="arrow_right_circle"
                    onClick={next}
                    size={32}
                    className="absolute right-4 top-1/2 -translate-y-1/2 fill-current cursor-pointer drop-shadow-md transition-transform z-10 text-on-surface-variant-lowest"
                  />
              )}
            </>
          )}
        </div>
      </Card.Root>

      {/* Dots */}
      {images.length > 1 && (
        <div className="mt-4 flex justify-center">
          <div className="flex gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                onClick={() => goTo(i)}
                className={`w-3.25 h-3.25 rounded-full transition-colors cursor-pointer ${
                  i === index ? "bg-surface-variant-lowest" : "bg-surface-variant-low"
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// 최적화: React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 방지합니다.
export default memo(CardMain);