import { EmptyState } from "../../../../components/common";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { useMockInfiniteHomeCards } from "../../hooks/useMockInfiniteHomeCards";
import CardItem from "./CardItem";
import CardSkeleton from "./CardSkeleton";

const CardGrid = () => {
  const { cards, hasNextPage, loadMore, isLoading } = useMockInfiniteHomeCards();

  const observerRef = useInfiniteScroll(loadMore, {
    hasNextPage,
    isLoading,
  });

  if (cards.length === 0) {
    return (
      <section className="w-full py-16">
        <EmptyState
          icon="image"
          title="아직 게시된 작품이 없어요"
          description="첫 작품을 업로드해 보세요."
        />
      </section>
    );
  }

  return (
    <section className="w-full py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
        {cards.map((card) => (
          <CardItem key={card.submissionId} card={card} />
        ))}

        {hasNextPage &&
          Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={`skeleton-${i}`} />)}
      </div>

      <div ref={observerRef} />
    </section>
  );
};

export default CardGrid;
