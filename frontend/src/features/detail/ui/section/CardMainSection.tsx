import { useState } from "react";
import { Card } from "../../../../components/common/display";
import { Button } from "../../../../components/common/input/Button/Button";
import type { SubmissionDetails } from "../../../../apis/types/submission/checkSubmissionDetails";
import Icon from "../../../../components/common/Icon";

export interface CardMainProps {
  submissions?: SubmissionDetails["submission"][];
  className?: string;
}

const CardItem = ({
  submission,
}: {
  submission: SubmissionDetails["submission"];
}) => {
  const { image_list, title, caption } = submission;
  const images =
    Array.isArray(image_list) && image_list.length > 0
      ? image_list
      : ["/sample.jpg"];
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const next = () => setIndex((i) => (i + 1) % images.length);

  return (
    <div className="max-w-5xl mx-auto">
      {/* force the media to a fixed square and ensure the inner <img> uses object-contain
          without modifying the Card implementation by using Tailwind's arbitrary selector
          to target the direct img child: [&>img]:object-contain */}
      <Card.Root className="w-full h-full">
        <div className="relative w-full h-full bg-on-surface-variant-low">
          <Card.Media
            src={images[index]}
            alt={title ?? "image"}
            aspectRatio="aspect-square"
            className="w-xl h-full [&>img]:object-contain [&>img]:object-center [&>img]:scale-100! bg-surface-variant"
          />

          {/* Prev / Next buttons (hide when at edges) */}
          {images.length > 1 && (
            <>
              {index > 0 && (
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-on-surface-variant-lowest">
                  <Icon
                    name="arrow_left"
                    onClick={prev}
                    size={24}
                    className="fill-current cursor-pointer"
                  />
                </div>
              )}

              {index < images.length - 1 && (
                <div className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant-lowest">
                  <Icon
                    name="arrow_right"
                    onClick={next}
                    size={24}
                    className="fill-current cursor-pointer"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </Card.Root>

      {/* Dots: placed outside the rounded media, centered under the card */}
      {images.length > 1 && (
        <div className="mt-3 flex justify-center">
          <div className="flex gap-2">
            {images.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === index ? "bg-on-surface" : "bg-surface-variant-lowest"}`}
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
