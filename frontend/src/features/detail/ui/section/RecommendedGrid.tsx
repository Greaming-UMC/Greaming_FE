import { Card } from "../../../../components/common/display"; 
import Icon from "../../../../components/common/Icon"; 
import { useRecommendedArts } from "../../hooks/useRecommendedArts";

/* -------------------------------------------------------------------------- */
/* 2. [Component]                                 */
/* -------------------------------------------------------------------------- */

const RecommendedGrid = () => {
  const {
    artworks,
    status,
    error,
    isFetchingNextPage,
    hasNextPage,
    bottomRef,
  } = useRecommendedArts();

  // 로딩 중이거나 에러 처리
  if (status === "pending")
    return <div className="p-10 text-center">초기 데이터 로딩 중...</div>;
  if (status === "error") return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className=" mx-auto">
      {/* 헤더 */}
      <h3 className="text-lg font-bold text-primary">다른 그림 추천</h3>

      {/* D. 그리드 레이아웃 (모바일 2열, PC 4열) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
        {artworks.map((art) => (
          <div key={art.id} className="w-full">
            <Card.Root
              clickable
              hoverEffect
              className="bg-transparent shadow-none border-none group"
            >
              <Card.Media
                src={art.src}
                alt={art.title}
                aspectRatio="aspect-square"
                className="rounded-lg bg-on-surface-variant-lowest"
              >
                {/* 오버레이 (아이콘 정보) */}
                <Card.Overlay className="items-end pb-3 pr-3">
                  <div className="flex items-center justify-end gap-3 text-on-primary">
                    <div className="flex items-center gap-1">
                      <Icon
                        name="heart"
                        size={16}
                        className="fill-on-primary"
                      />
                      <span className="text-xs font-medium">{art.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon
                        name="message"
                        size={16}
                        className="fill-on-primary"
                      />
                      <span className="text-xs font-medium">{art.comments}</span>
                    </div>
                  </div>
                </Card.Overlay>
              </Card.Media>

              {/* 하단 제목 (스크린샷에는 없지만 필요하면 사용) */}
              {/* <div className="mt-2 text-sm font-medium">{art.title}</div> */}
            </Card.Root>
          </div>
        ))}
      </div>

      {/* E. 무한 스크롤 트리거 (감지 센서) */}
      {/* 다음 페이지가 있을 때만 렌더링 */}
      {hasNextPage && (
        <div ref={bottomRef} className="h-20 flex justify-center items-center mt-4">
          {isFetchingNextPage ? (
            // 로딩 스피너 (임시 텍스트)
            <span className="text-gray-400 text-sm">불러오는 중</span>
          ) : (
            <span className="h-10" /> // 투명한 공간 확보
          )}
        </div>
      )}
    </div>
  );
};

export default RecommendedGrid;
