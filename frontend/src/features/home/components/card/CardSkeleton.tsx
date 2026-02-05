import { Card } from "../../../../components/common";
import MockFeedJpg from "../../../../assets/background/mock_feed.jpg";

const CardSkeleton = () => {
  return (
    <div className="w-[250px] h-[285px]">
      <Card.Root className="h-full flex flex-col overflow-hidden rounded-2xl">
        <div className="relative h-[237px] w-full bg-surface-variant-high">
          <img
            src={MockFeedJpg}
            alt="mock skeleton"
            className="h-full w-full object-cover opacity-60"
            draggable={false}
          />
          <div className="absolute inset-0 animate-pulse bg-surface-variant-low opacity-40" />
        </div>

        <Card.Body className="h-[48px] px-3 shrink-0 bg-transparent">
          <div className="flex h-full items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-surface-variant-low" />
              <div className="w-16 h-3 rounded bg-surface-variant-low" />
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-3 rounded bg-surface-variant-low" />
              <div className="w-6 h-3 rounded bg-surface-variant-low" />
              <div className="w-6 h-3 rounded bg-surface-variant-low" />
            </div>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default CardSkeleton;
