import { EmptyState } from "../../../../components/common";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import CardItem from "./CardItem";
import CardSkeleton from "./CardSkeleton";
import { useInfiniteHomeCards } from "../../hooks/useInfiniteHomeCards";
import type { CheckSubmissionType, SortBy } from "../../../../apis/types/common";
import type { HomeView } from "../../components/type";

interface Props {
  view: HomeView;
  type: CheckSubmissionType;
  sort: SortBy;
  dateTimeIso: string;
}

const SKELETON_COUNT = 10;

const CardGrid = ({ view, type, sort, dateTimeIso }: Props) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, isFetched } =
    useInfiniteHomeCards({ view, type, sort, dateTimeIso });

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  const observerRef = useInfiniteScroll(() => fetchNextPage(), {
    hasNextPage: Boolean(hasNextPage),
    isLoading: isFetchingNextPage,
  });

  if (isLoading) {
    return (
      <section className="w-full py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <CardSkeleton key={`init-skeleton-${i}`} />
          ))}
        </div>
      </section>
    );
  }

  if (isFetched && items.length === 0) {
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
        {items.map((card) => (
          <CardItem key={card.submissionId} card={card} />
        ))}

        {isFetchingNextPage &&
          Array.from({ length: 5 }).map((_, i) => (
            <CardSkeleton key={`next-skeleton-${i}`} />
          ))}
      </div>

      <div ref={observerRef} />
    </section>
  );
};

export default CardGrid;
