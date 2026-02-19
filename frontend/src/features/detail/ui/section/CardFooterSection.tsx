import { memo } from "react";
import { Chip } from "../../../../components/common/display";
import { useDateFormatter } from "../../hooks/useDateFormatter";
import Icon from "../../../../components/common/Icon";

export interface CardFooterProps {
  title: string;
  caption: string | null;
  tags: string[];
  upload_at: string;
  field?: string;
  challengeTitle?: string | null;
  className?: string;
}

/** 챌린지 타입 배지 (WEEKLY / DAILY) */
const ChallengeBadge = ({
  field,
  challengeTitle,
}: {
  field: string;
  challengeTitle?: string | null;
}) => {
  if (field === "WEEKLY") {
    return (
      <div className="flex items-center gap-2 py-1">
        <Icon name="check_circle" size={22} className="text-on-surface" />
        <span className="text-body-large font-semibold text-success">
          {challengeTitle}
        </span>
      </div>
    );
  }

  if (field === "DAILY") {
    return (
      <div className="flex items-center gap-2 py-1">
        <Icon name="calender" size={22} className="text-success" />
        <span className="text-body-large font-semibold text-success">
          {challengeTitle}
        </span>
      </div>
    );
  }

  return null;
};

const CardFooter = ({
  title,
  caption,
  tags,
  upload_at,
  field,
  challengeTitle,
  className = "",
}: CardFooterProps) => {
  const { formatKoreanDate } = useDateFormatter();

  return (
    <div
      className={`flex flex-col gap-2 items-start self-stretch ${className}`}
    >
      <div>
        <h2 className="text-sub-title-xlarge font-semibold py-2">{title}</h2>

        {/* WEEKLY / DAILY 챌린지 배지 */}
        {field && field !== "FREE" && (
          <ChallengeBadge field={field} challengeTitle={challengeTitle} />
        )}

        {caption ? (
          <p className="text-body-xlarge text-on-surface-variant mt-1">{caption}</p>
        ) : null}
      </div>
      <div className="flex gap-2 flex-wrap py-4">
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={`#${tag}`}
            variant="filled"
            className="pointer-events-none !bg-on-surface-variant-lowest text-label-large !font-medium"
          />
        ))}
      </div>

      <div className="text-label-large font-medium text-on-surface-variant-lowest">
        {formatKoreanDate(upload_at)}
      </div>
    </div>
  );
};

export default memo(CardFooter);

