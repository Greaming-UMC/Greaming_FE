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
  tags: string[];
  dateTimeIso: string;
}

const SKELETON_COUNT = 10;

const CardGrid = ({ view, type, sort, tags, dateTimeIso }: Props) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage, isFetched } =
    useInfiniteHomeCards({ view, type, sort, tags, dateTimeIso });

  const items = data?.pages.flatMap((p) => p.items) ?? [];

  const observerRef = useInfiniteScroll(() => fetchNextPage(), {
    hasNextPage: Boolean(hasNextPage),
    isLoading: isFetchingNextPage,
  });

  if (isLoading) {
    return (
      <section className="w-full py-8 px-2 sm:px-4 lg:px-0">
        <div className="mx-auto grid w-full max-w-[1346px] grid-cols-[repeat(auto-fit,minmax(250px,250px))] justify-center gap-x-6 gap-y-10">
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
    <section className="w-full py-8 px-2 sm:px-4 lg:px-0">
      <div className="mx-auto grid w-full max-w-[1346px] grid-cols-[repeat(auto-fit,minmax(250px,250px))] justify-center gap-x-6 gap-y-10">
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
