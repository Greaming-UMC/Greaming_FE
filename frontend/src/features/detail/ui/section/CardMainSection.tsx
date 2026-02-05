import { Card } from "../../../../components/common/display";
import type { SubmissionDetails } from "../../../../apis/types/submission/checkSubmissionDetails";
import Icon from "../../../../components/common/Icon";
import { useCarousel } from "../section/useCarousel"

export interface CardMainProps {
  submissions?: SubmissionDetails["work"][];
  className?: string;
}

const CardItem = ({
  submission,
}: {
  submission: SubmissionDetails["work"];
}) => {
  const { image_list, title } = submission;
  const images =
    Array.isArray(image_list) && image_list.length > 0
      ? image_list
      : ["/sample.jpg"];
  const { currentIndex: index, prev, next, goTo } = useCarousel(images.length);

  const isFirstSlide = index === 0;
  const isLastSlide = index === images.length - 1;

  return (
    // 1️⃣ 너비를 최대 840px로 제한하고 중앙 정렬
    <div className="w-full max-w-[51.25rem] mx-auto">
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
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant-lowest z-10">
                  <Icon
                    name="arrow_left"
                    onClick={prev}
                    size={32} 
                    className="fill-current cursor-pointer drop-shadow-md transition-transform"
                  />
                </div>
              )}

              {!isLastSlide && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant-lowest z-10">
                  <Icon
                    name="arrow_right"
                    onClick={next}
                    size={32}
                    className="fill-current cursor-pointer drop-shadow-md transition-transform"
                  />
                </div>
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

const CardMain = ({ submissions, className = "" }: CardMainProps) => {
  const list = submissions ?? [];

  return (
    <div className={`flex flex-col gap-6 w-full h-full ${className}`}>
      {list.map((s, i) => (
        <CardItem key={i} submission={s} />
      ))}
    </div>
  );
};

export default CardMain;