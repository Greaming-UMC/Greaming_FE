import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { HomeCardType } from "../../../../apis/types/common";
import { Avatar, Card } from "../../../../components/common";
import Icon from "../../../../components/common/Icon";
import { getSubmissionPreview } from "../../../../apis/types/submission/getSubmissionPreview";

type CardItemContext = "carousel" | "grid";

interface Props {
  card: HomeCardType;
  context?: CardItemContext;
}

const CardItem = ({ card, context = "grid" }: Props) => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);

  const textClass =
    context === "carousel" ? "text-on-surface-variant-bright" : "text-on-surface";

  const previewQuery = useQuery({
    queryKey: ["submissionPreview", card.submissionId],
    queryFn: () => getSubmissionPreview(card.submissionId),
    enabled: hovered,
    staleTime: 1000 * 60 * 5,
  });

  const tags = useMemo(
    () => previewQuery.data?.tags ?? [],
    [previewQuery.data?.tags],
  );

  return (
    <div className="w-[250px] h-[285px] rounded-2xl overflow-hidden">
      <Card.Root
        hoverEffect
        clickable
        className="h-full w-full flex flex-col rounded-2xl overflow-hidden"
        onClick={() => navigate(`/detail/${card.submissionId}`)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Card.Media
          src={card.thumbnailUrl}
          alt={card.title ?? ""}
          aspectRatio="aspect-auto"
          hoverEffect
          className="h-[237px] w-full rounded-b-2xl relative"
        >
          {tags.length > 0 && (
            <Card.Overlay className="absolute inset-0 flex flex-col justify-end">
              <div className="absolute bottom-0 left-0 w-full h-[120px] bg-gradient-to-t from-primary/80 via-primary/30 to-transparent pointer-events-none" />
              <div className="relative z-10 w-full p-3 overflow-hidden">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  {tags.map((t) => (
                    <span
                      key={t}
                      className="label-medium-emphasized text-white drop-shadow-md"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Card.Overlay>
          )}
        </Card.Media>

        <Card.Body className="h-[48px] w-full shrink-0 bg-transparent">
          <div className={`flex h-full w-full items-center justify-between ${textClass}`}>
            <div className="flex items-center gap-2 min-w-0">
              <Avatar src={card.profileImgUrl} size="xs" />
              <span className="sub-title-medium-emphasized truncate max-w-[90px]">
                {card.nickname}
              </span>
            </div>

            <div className="flex items-center gap-2 label-xlarge-emphasized shrink-0">
              <span className="flex items-center gap-0.5">
                <Icon name="like" size={19} />
                {card.counters.likesCount}
              </span>

              <span className="flex items-center gap-0.5">
                <Icon name="chat" size={19} />
                {card.counters.commentCount}
              </span>

              <span className="flex items-center gap-0.5">
                <Icon name="save" size={19} />
                {card.counters.bookmarkCount}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default CardItem;
