import { Card } from "../../../../components/common/display"; 
import Icon from "../../../../components/common/Icon"; 

// TODO: 아래 타입은 `apis/types/art.ts`의 RecommendedArt와 동기화되어야 합니다.
// 현재 `ArtistArtwork`와 데이터 일관성을 맞추기 위해 임시 정의합니다.
interface RecommendedArt {
  id: number;
  src: string;
  title: string;
  likes_count: number;
  comment_count: number;
  bookmark_count: number;
}
interface RecommendedGridProps {
  /** 추천 작품 목록 데이터 */
  artworks: RecommendedArt[];
}

/* -------------------------------------------------------------------------- */
/* 2. [Component]                                 */
/* -------------------------------------------------------------------------- */

const RecommendedGrid = ({ artworks }: RecommendedGridProps) => {
  // 데이터가 비어있으면 아무것도 렌더링하지 않음
  if (!artworks || artworks.length === 0) {
    return null;
  }

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
                    {/* 좋아요 */}
                    <div className="flex items-center gap-1">
                      <Icon
                        name="like"
                        size={16}
                        className="fill-on-primary"
                      />
                      <span className="text-xs font-medium">{art.likes_count}</span>
                    </div>
                    {/* 댓글 */}
                    <div className="flex items-center gap-1">
                      <Icon
                        name="chat"
                        size={16}
                        className="fill-on-primary"
                      />
                      <span className="text-xs font-medium">{art.comment_count}</span>
                    </div>
                    {/* 저장 */}
                    <div className="flex items-center gap-1">
                      <Icon name="save" size={16} className="fill-on-primary" />
                      <span className="text-xs font-medium">{art.bookmark_count}</span>
                    </div>
                  </div>
                </Card.Overlay>
              </Card.Media>

    
              {/* <div className="mt-2 text-sm font-medium">{art.title}</div> */}
            </Card.Root>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedGrid;
