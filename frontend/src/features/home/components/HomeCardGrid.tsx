import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import { useMockInfiniteHomeCards } from "../hooks/useMockInfiniteHomeCards";
import { EmptyState } from "../../../components/common";
import HomeCardItem from "./HomeCardItem";
import HomeCardSkeleton from "./HomeCardSkeleton";

const HomeCardGrid = () => {
  const { cards, hasNextPage, loadMore, isLoading } =
    useMockInfiniteHomeCards();

  const observerRef = useInfiniteScroll(loadMore, {
    hasNextPage,
    isLoading,
  });

  if (cards.length === 0) {
    return (
      <EmptyState
        icon="image"
        title="아직 게시된 작품이 없어요"
        description="첫 작품을 업로드해 보세요."
      />
    );
  }

  return (
    <section className="py-8 w-full">
      <div className="mx-auto max-w-[1366px] px-4"> 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {cards.map((card) => (
            <HomeCardItem
              key={card.submissionId}
              card={card}
            />
          ))}

          {hasNextPage &&
            Array.from({ length: 5 }).map((_, i) => ( 
              // 스켈레톤도 5개씩 로드
              <HomeCardSkeleton key={`skeleton-${i}`} />
            ))}
        </div>
      </div>

      <div ref={observerRef} />
    </section>
  );
};

export default HomeCardGrid;