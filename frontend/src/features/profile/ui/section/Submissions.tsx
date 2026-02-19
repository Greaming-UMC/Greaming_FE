import { Avatar, Card, Counter } from "../../../../components/common";
import charSad from "../../../../assets/icon/multi/char_sad.svg";

import type { SubmissionMetadata } from "../../../../apis/types/common";

type SubmissionsProps = {
  items: SubmissionMetadata[];
  emptyMessage?: string;
  showAuthor?: boolean;
  authorById?: Record<number, { name: string; avatarUrl?: string | null }>;
  onItemClick?: (submissionId: number) => void;
  className?: string;
};

const Submissions = ({
  items,
  emptyMessage = "포스팅한 그림이 없어요",
  showAuthor = false,
  authorById,
  onItemClick,
  className = "",
}: SubmissionsProps) => {
  if (items.length === 0) {
    return (
      <section className={`flex max-w-[1092px] w-full items-center justify-center px-[8px] ${className}`}>
        <div className="flex flex-col items-center gap-[24px]">
          <img
            src={charSad}
            alt="empty"
            className="mt-[128px] w-[148px] h-[148px]"
          />
          <div className="label-xxlarge text-on-surface">
            {emptyMessage}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`flex w-full px-[8px] ${className}`}>
      <div className="submissions-grid">
        {items.map((item) => (
          <div key={item.submissionId} className="flex w-fit flex-col">
            <Card.Root
              className="w-[250px] h-[250px]"
              clickable={Boolean(onItemClick)}
              onClick={() => onItemClick?.(item.submissionId)}
              onKeyDown={(event) => {
                if (!onItemClick) return;
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                onItemClick(item.submissionId);
              }}
              role={onItemClick ? "button" : undefined}
              tabIndex={onItemClick ? 0 : undefined}
            >
              <Card.Media
                src={item.thumbnailUrl}
                alt={`submission-${item.submissionId}`}
                aspectRatio="aspect-square"
                className="h-full  state-layer primary-opacity-8"
              />
            </Card.Root>
            {(() => {
              const counters = (
                <>
                  <Counter
                    variant="icon"
                    size="sm"
                    count={item.counters.likesCount}
                    icon="like"
                  />
                  <Counter
                    variant="icon"
                    size="sm"
                    count={item.counters.commentCount}
                    icon="chat"
                  />
                  <Counter
                    variant="icon"
                    size="sm"
                    count={item.counters.bookmarkCount}
                    icon="save"
                  />
                </>
              );

              if (showAuthor && authorById?.[item.submissionId]) {
                return (
                  <div className="mt-[8px] flex w-full items-center gap-[8px]">
                    <Avatar
                      src={authorById[item.submissionId].avatarUrl}
                      size="xs"
                    />
                    <span className="sub-title-medium-emphasized text-on-surface">
                      {authorById[item.submissionId].name}
                    </span>
                    <div className="ml-auto flex items-center gap-[4px]">
                      {counters}
                    </div>
                  </div>
                );
              }

              return (
                <div className="mt-[8px] flex w-full items-center justify-end gap-[4px] px-2">
                  {counters}
                </div>
              );
            })()}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Submissions;
