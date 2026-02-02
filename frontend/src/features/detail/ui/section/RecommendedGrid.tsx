import { useEffect } from "react";
import { useInView } from "react-intersection-observer"; // 스크롤 감지
import { useInfiniteQuery } from "@tanstack/react-query"; // 데이터 관리
import { Card } from "../../../../components/common/display"; // 경로 확인 필요!
import Icon from "../../../../components/common/Icon"; // 아이콘 경로 확인 필요!

/* -------------------------------------------------------------------------- */
/* 1. [Mock API] 백엔드 없이 테스트하기 위한 가짜 함수                           */
/* -------------------------------------------------------------------------- */

// 데이터 타입 정의
interface RecommendArt {
  id: number;
  title: string;
  src: string;
  likes: number;
  comments: number;
}

// 가짜 데이터 가져오는 함수 (1초 딜레이)
const fetchMockRecommended = async ({ pageParam = 1 }) => {
  // 1초 기다림 (로딩 스피너 확인용)
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // 페이지당 8개씩 데이터 생성
  const newItems = Array.from({ length: 8 }).map((_, i) => ({
    id: pageParam * 100 + i, // 고유 ID 생성
    title: `추천 작품 ${pageParam}-${i + 1}`,
    src: `https://picsum.photos/400/400?random=${pageParam * 10 + i}`,
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
  }));

  const isLast = pageParam >= 5;

  return {
    items: newItems,
    nextPage: isLast ? undefined : pageParam + 1, // 다음 페이지 번호
    isLast,
  };
};

/* -------------------------------------------------------------------------- */
/* 2. [Component]                                 */
/* -------------------------------------------------------------------------- */

const RecommendedGrid = () => {
  // A. React Query로 데이터 관리
  const {
    data, // 받아온 데이터들 (pages 배열 안에 들어있음)
    fetchNextPage, // 다음 페이지 부르는 함수
    hasNextPage, // 다음 페이지가 있는지 여부 (true/false)
    isFetchingNextPage, // 지금 다음 페이지 불러오는 중이니? (로딩 상태)
    status, // 전체적인 상태 (pending, error, success)
  } = useInfiniteQuery({
    queryKey: ["recommendedArts"], // 이 쿼리의 고유 키
    queryFn: fetchMockRecommended, // 실행할 API 함수
    initialPageParam: 1, // 첫 페이지 번호
    getNextPageParam: (lastPage) => lastPage.nextPage, // 다음 페이지 번호 결정 로직
  });

  // B. 화면 하단 감지 센서 (ref를 div에 달면 닿았는지 알려줌)
  const { ref, inView } = useInView({
    threshold: 0.5, // 요소가 50% 보이면 감지
  });

  // C. 감지되면 다음 페이지 호출
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      console.log("스크롤 바닥 감지! 다음 페이지 로딩...");
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 로딩 중이거나 에러 처리
  if (status === "pending")
    return <div className="p-10 text-center">초기 데이터 로딩 중...</div>;
  if (status === "error") return <div>에러가 발생했습니다.</div>;

  return (
    <div className="max-w-5xl mx-auto px-6">
      {/* 헤더 */}
      <h3 className="text-lg font-bold text-primary">다른 그림 추천</h3>

      {/* D. 그리드 레이아웃 (모바일 2열, PC 4열) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-8">
        {data.pages.map((page, pageIndex) =>
          // React Query는 데이터를 pages 배열로 관리함 (page 안에 items가 있음)
          page.items.map((art) => (
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
                        <span className="text-xs font-medium">
                          {art.comments}
                        </span>
                      </div>
                    </div>
                  </Card.Overlay>
                </Card.Media>

                {/* 하단 제목 (스크린샷에는 없지만 필요하면 사용) */}
                {/* <div className="mt-2 text-sm font-medium">{art.title}</div> */}
              </Card.Root>
            </div>
          )),
        )}
      </div>

      {/* E. 무한 스크롤 트리거 (감지 센서) */}
      {/* 다음 페이지가 있을 때만 렌더링 */}
      {hasNextPage && (
        <div ref={ref} className="h-20 flex justify-center items-center mt-4">
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
