import { memo } from "react";
import { Chip } from "../../../../components/common/display";
import { useDateFormatter } from "../../hooks/useDateFormatter";

export interface CardFooterProps {
  title: string;
  caption: string | null; // caption은 null일 수 있습니다.
  tags: string[];
  upload_at: string;
  className?: string;
}

const CardFooter = ({
  title,
  caption,
  tags,
  upload_at,
  className = "",
}: CardFooterProps) => {
  const { formatKoreanDate } = useDateFormatter();

  return (
    <div
      className={`flex flex-col gap-2 items-start self-stretch ${className}`}
    >
      <div>
        <h2 className="text-sub-title-xlarge font-semibold py-2">{title}</h2>
        {caption ? (
          <p className="text-body-xlarge text-on-surface-variant mt-1">{caption}</p>
        ) : null}
      </div>

      <div className="flex gap-2 flex-wrap py-4">
        {Array.isArray(tags) && tags.length > 0
          ? tags.map((t) => (
              <Chip
                key={t}
                label={`#${t}`}
                variant="filled"
                className="pointer-events-none !bg-on-surface-variant-lowest"
              />
            ))
          : null}
      </div>

      <div className="text-label-large font-medium text-on-surface-variant-lowest">
        {formatKoreanDate(upload_at)}
      </div>
    </div>
  );
};

// 최적화: React.memo를 사용하여 props가 변경되지 않으면 리렌더링을 방지합니다.
export default memo(CardFooter);
