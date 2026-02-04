import { Card } from "../../../components/common";

const HomeCardSkeleton = () => {
  return (
    <div className="w-[250px] h-[285px]">
      <Card.Root className="h-full flex flex-col animate-pulse">
        {/* 이미지 영역 */}
        <div className="h-[237px] w-full overflow-hidden rounded-t-[10px] bg-surface-variant" />

        {/* 하단 정보 영역 */}
        <Card.Body className="h-[48px] px-3 shrink-0">
          <div className="flex h-full items-center justify-between">
            {/* 좌 : 아바타 + 닉네임 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-surface-variant" />
              <div className="w-16 h-3 rounded bg-surface-variant" />
            </div>

            {/* 우 : 아이콘 카운터 자리 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 rounded bg-surface-variant" />
              <div className="w-6 h-3 rounded bg-surface-variant" />
              <div className="w-6 h-3 rounded bg-surface-variant" />
            </div>
          </div>
        </Card.Body>
      </Card.Root>
    </div>
  );
};

export default HomeCardSkeleton;
