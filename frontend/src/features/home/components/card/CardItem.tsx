import type { HomeCardType } from "../../../../apis/types/common";
import { Avatar, Card } from "../../../../components/common";
import Icon from "../../../../components/common/Icon";

type CardItemContext = "carousel" | "grid";

interface Props {
  card: HomeCardType;
  context?: CardItemContext;
}

const CardItem = ({ card, context = "grid" }: Props) => {
  const textClass =
    context === "carousel" ? "text-on-surface-variant-bright" : "text-on-surface";

  return (
    <div className="w-[250px] h-[285px]">
      <Card.Root
        hoverEffect
        clickable
        className="h-full flex flex-col overflow-hidden rounded-2xl"
      >
        <Card.Media
          src={card.thumbnailUrl}
          alt={card.title}
          aspectRatio="aspect-auto"
          hoverEffect
          className="h-[237px]"
        />

        {/* 하단 정보 영역 */}
        <Card.Body className="h-[48px] px-3 shrink-0 bg-transparent">
          <div className={`flex h-full items-center justify-between ${textClass}`}>
            {/* 좌 : 프로필, 닉네임 */}
            <div className="flex items-center gap-2 min-w-0">
              <Avatar src={card.profileImgUrl} size="xs" />
              <span className="text-xs font-medium truncate max-w-[90px]">
                {card.nickname}
              </span>
            </div>

            {/* 우 : 아이콘 카운터 */}
            <div className="flex items-center gap-2 text-xs shrink-0">
              <span className="flex items-center gap-0.5">
                <Icon name="like" size={12} />
                {card.counters.likesCount}
              </span>

              <span className="flex items-center gap-0.5">
                <Icon name="chat" size={12} />
                {card.counters.commentCount}
              </span>

              <span className="flex items-center gap-0.5">
                <Icon name="save" size={12} />
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
